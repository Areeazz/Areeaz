import Spline from "@splinetool/react-spline";
import type { Application, SPEObject } from "@splinetool/runtime";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

interface SplineSceneProps {
  scene: string;
  trackingRef?: RefObject<HTMLElement | null>;
  className?: string;
}

type FollowObject = {
  object: SPEObject;
  origin: { x: number; y: number; z: number };
  depth: number;
};

const FOLLOW_OBJECT_NAME = "Follow";
const FOLLOW_X_RANGE = 120;
const FOLLOW_Y_RANGE = 80;
const FOLLOW_LERP = 0.12;

function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080505]">
      <div className="depth-grid opacity-55" />
      <div className="absolute left-[9%] top-[20%] h-32 w-40 rounded-[45%] bg-[radial-gradient(circle_at_30%_35%,rgba(255,150,126,0.72),rgba(156,16,18,0.58)_34%,rgba(42,8,8,0.12)_70%,transparent)] blur-[1px]" />
      <div className="absolute right-[10%] top-[43%] h-32 w-44 rounded-[44%] bg-[radial-gradient(circle_at_70%_42%,rgba(255,127,100,0.62),rgba(154,16,18,0.52)_36%,rgba(42,8,8,0.1)_72%,transparent)] blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(42%_44%_at_50%_50%,rgba(4,3,3,0.88),rgba(8,5,5,0.44)_58%,transparent_82%)]" />
    </div>
  );
}

function isSplineObject(value: unknown): value is SPEObject {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<SPEObject>;
  return (
    candidate.name === FOLLOW_OBJECT_NAME &&
    !!candidate.position &&
    typeof candidate.position.x === "number" &&
    typeof candidate.position.y === "number" &&
    typeof candidate.position.z === "number"
  );
}

function addUniqueFollowObject(
  object: SPEObject | undefined,
  objects: SPEObject[],
  seen: Set<string>,
) {
  if (!object || object.name !== FOLLOW_OBJECT_NAME) return;

  const id = object.uuid || `${object.name}-${objects.length}`;
  if (seen.has(id)) return;

  seen.add(id);
  objects.push(object);
}

function collectFollowObjects(app: Application) {
  const objects: SPEObject[] = [];
  const seen = new Set<string>();

  addUniqueFollowObject(app.findObjectByName(FOLLOW_OBJECT_NAME), objects, seen);

  for (const object of app.getAllObjects?.() ?? []) {
    addUniqueFollowObject(object, objects, seen);
  }

  const searchChildren = (node: unknown) => {
    if (!node || typeof node !== "object") return;

    if (isSplineObject(node)) {
      addUniqueFollowObject(node, objects, seen);
    }

    const children = (node as { children?: unknown }).children;
    if (!Array.isArray(children)) return;

    for (const child of children) {
      searchChildren(child);
    }
  };

  searchChildren(app.data?.scene);
  searchChildren(app.data);

  return objects.map<FollowObject>((object, index) => ({
    object,
    origin: { ...object.position },
    depth: index === 0 ? 1 : 0.72,
  }));
}

export default function SplineScene({
  scene,
  trackingRef,
  className,
}: SplineSceneProps) {
  const appRef = useRef<Application | null>(null);
  const followObjectsRef = useRef<FollowObject[]>([]);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  const stopFrame = useCallback(() => {
    if (frameRef.current === null) return;

    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const animateFollowObjects = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * FOLLOW_LERP;
    current.y += (target.y - current.y) * FOLLOW_LERP;

    for (const follow of followObjectsRef.current) {
      follow.object.position.x =
        follow.origin.x + current.x * FOLLOW_X_RANGE * follow.depth;
      follow.object.position.y =
        follow.origin.y - current.y * FOLLOW_Y_RANGE * follow.depth;
      follow.object.position.z = follow.origin.z;
    }

    appRef.current?.requestRender();

    const isSettled =
      Math.abs(target.x - current.x) < 0.001 &&
      Math.abs(target.y - current.y) < 0.001;

    if (isSettled) {
      frameRef.current = null;
      return;
    }

    frameRef.current = window.requestAnimationFrame(animateFollowObjects);
  }, []);

  const scheduleFollowFrame = useCallback(() => {
    if (frameRef.current !== null || followObjectsRef.current.length === 0) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(animateFollowObjects);
  }, [animateFollowObjects]);

  const handleLoad = useCallback((app: Application) => {
    appRef.current = app;
    followObjectsRef.current = collectFollowObjects(app);
    currentRef.current = { x: 0, y: 0 };
    targetRef.current = { x: 0, y: 0 };

    app.canvas.style.pointerEvents = "none";
    app.canvas.style.touchAction = "pan-y";
    app.canvas.tabIndex = -1;
    app.canvas.setAttribute("aria-hidden", "true");

    setLoaded(true);
  }, []);

  useEffect(() => {
    const trackingElement = trackingRef?.current;
    if (!trackingElement) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = trackingElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      targetRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      scheduleFollowFrame();
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 };
      scheduleFollowFrame();
    };

    trackingElement.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    trackingElement.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    return () => {
      trackingElement.removeEventListener("pointermove", handlePointerMove);
      trackingElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [scheduleFollowFrame, trackingRef]);

  useEffect(() => {
    setLoaded(false);
    appRef.current = null;
    followObjectsRef.current = [];
    currentRef.current = { x: 0, y: 0 };
    targetRef.current = { x: 0, y: 0 };
    stopFrame();

    return () => {
      stopFrame();
      appRef.current = null;
      followObjectsRef.current = [];
    };
  }, [scene, stopFrame]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <Spline
        scene={scene}
        onLoad={handleLoad}
        className="block h-full w-full"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 900ms ease-out",
          pointerEvents: "none",
          touchAction: "pan-y",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
          transition: "opacity 500ms ease-out",
        }}
      >
        <SceneFallback />
      </div>

      <div className="spline-mask" />
    </div>
  );
}
