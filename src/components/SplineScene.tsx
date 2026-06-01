import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Application, SPEObject } from "@splinetool/runtime";

interface SplineSceneProps {
  scene: string;
  className?: string;
  interactionTargetRef?: RefObject<HTMLElement | null>;
}

const FOLLOW_OBJECT_NAME = "Follow";
const FOLLOW_OBJECT_NAME_FALLBACKS = ["follow-sphere"];
const LERP = 0.1;
const OFFSET = { x: 70, y: -50, z: 40 };

type Vec3 = { x: number; y: number; z: number };

/** Animated placeholder shown while the runtime + scene download. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <div className="depth-grid" />
      <div className="relative grid place-items-center">
        <motion.div
          className="absolute h-64 w-64 rounded-full border border-[rgba(255,90,74,0.35)]"
          style={{ boxShadow: "inset 0 0 80px rgba(255,90,74,0.25)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-44 w-44 rounded-full border border-[rgba(255,163,154,0.4)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="h-20 w-20 rounded-full bg-accent/30 blur-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute -bottom-16 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
          Rendering scene
        </span>
      </div>
    </div>
  );
}

function prepareScrollSafeCanvas(canvas: HTMLCanvasElement) {
  canvas.style.pointerEvents = "none";
  canvas.style.touchAction = "pan-y";
  canvas.tabIndex = -1;
  canvas.setAttribute("aria-hidden", "true");
}

function findFollowObjects(app: Application) {
  const matchedName = [FOLLOW_OBJECT_NAME, ...FOLLOW_OBJECT_NAME_FALLBACKS].find(
    (name) => app.findObjectByName(name),
  );
  if (!matchedName) return [];

  return app
    .getAllObjects()
    .filter((object) => object.name === matchedName);
}

function snapshotPosition({ x, y, z }: Vec3): Vec3 {
  return { x, y, z };
}

export default function SplineScene({
  scene,
  className,
  interactionTargetRef,
}: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineAppRef = useRef<Application | null>(null);
  const followObjectsRef = useRef<SPEObject[]>([]);
  const originsRef = useRef<Vec3[]>([]);
  const targetRef = useRef<Vec3>({ x: 0, y: 0, z: 0 });
  const currentRef = useRef<Vec3>({ x: 0, y: 0, z: 0 });
  const rafRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    let cancelled = false;
    let app: Application | undefined;
    let interactionTarget: HTMLElement | null = null;
    let removePointerListeners: (() => void) | undefined;

    const resetTarget = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
      targetRef.current.z = 0;
    };

    const updateTargetFromClientPoint = (clientX: number, clientY: number) => {
      if (!interactionTarget) return;

      const rect = interactionTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = (clientX - rect.left) / rect.width - 0.5;
      const ny = (clientY - rect.top) / rect.height - 0.5;

      targetRef.current.x = nx * OFFSET.x;
      targetRef.current.y = ny * OFFSET.y;
      targetRef.current.z = ny * OFFSET.z;
    };

    const isInsideInteractionTarget = (clientX: number, clientY: number) => {
      if (!interactionTarget) return false;

      const rect = interactionTarget.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const updateFromClient = (clientX: number, clientY: number) => {
      if (!isInsideInteractionTarget(clientX, clientY)) {
        resetTarget();
        return;
      }

      updateTargetFromClientPoint(clientX, clientY);
    };

    const handlePointer = (event: PointerEvent) => {
      if (!event.isPrimary && event.pointerType !== "mouse") return;

      updateFromClient(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      resetTarget();
    };

    const bindInteractionTarget = () => {
      removePointerListeners?.();
      removePointerListeners = undefined;

      interactionTarget = interactionTargetRef?.current ?? null;
      if (!interactionTarget) return;

      const listenerOptions: AddEventListenerOptions = { passive: true, capture: true };

      interactionTarget.addEventListener("pointerdown", handlePointer, listenerOptions);
      interactionTarget.addEventListener("pointermove", handlePointer, listenerOptions);
      interactionTarget.addEventListener("pointerleave", handlePointerLeave, listenerOptions);
      interactionTarget.addEventListener("pointercancel", handlePointerLeave, listenerOptions);

      removePointerListeners = () => {
        interactionTarget?.removeEventListener("pointerdown", handlePointer, listenerOptions);
        interactionTarget?.removeEventListener("pointermove", handlePointer, listenerOptions);
        interactionTarget?.removeEventListener("pointerleave", handlePointerLeave, listenerOptions);
        interactionTarget?.removeEventListener("pointercancel", handlePointerLeave, listenerOptions);
      };
    };

    const applyFollowOffset = () => {
      const followObjects = followObjectsRef.current;
      const origins = originsRef.current;
      const current = currentRef.current;

      followObjects.forEach((object, index) => {
        const origin = origins[index];
        if (!origin) return;

        object.position.x = origin.x + current.x;
        object.position.y = origin.y + current.y;
        object.position.z = origin.z + current.z;
      });
    };

    const tick = () => {
      const splineApp = splineAppRef.current;
      const followObjects = followObjectsRef.current;

      if (splineApp && followObjects.length > 0) {
        const target = targetRef.current;
        const current = currentRef.current;

        current.x += (target.x - current.x) * LERP;
        current.y += (target.y - current.y) * LERP;
        current.z += (target.z - current.z) * LERP;

        applyFollowOffset();
        splineApp.requestRender();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    function onLoad(splineApp: Application) {
      splineAppRef.current = splineApp;

      const followObjects = findFollowObjects(splineApp);
      followObjectsRef.current = followObjects;

      if (followObjects.length === 0) {
        return;
      }

      originsRef.current = followObjects.map((object) =>
        snapshotPosition(object.position),
      );
      targetRef.current = { x: 0, y: 0, z: 0 };
      currentRef.current = { x: 0, y: 0, z: 0 };
    }

    bindInteractionTarget();

    async function loadScene() {
      setLoaded(false);
      splineAppRef.current = null;
      followObjectsRef.current = [];
      originsRef.current = [];

      const { Application } = await import("@splinetool/runtime");
      if (cancelled) return;

      app = new Application(canvas, { renderMode: "continuous" });
      await app.load(scene);
      if (cancelled) return;

      prepareScrollSafeCanvas(canvas);
      onLoad(app);

      if (!cancelled) {
        setLoaded(true);
      }
    }

    rafRef.current = window.requestAnimationFrame(tick);
    loadScene().catch(() => {
      if (!cancelled) {
        setLoaded(true);
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafRef.current);
      removePointerListeners?.();

      const followObjects = followObjectsRef.current;
      const origins = originsRef.current;
      followObjects.forEach((object, index) => {
        const origin = origins[index];
        if (!origin) return;
        object.position.x = origin.x;
        object.position.y = origin.y;
        object.position.z = origin.z;
      });

      splineAppRef.current?.requestRender();
      splineAppRef.current = null;
      followObjectsRef.current = [];
      originsRef.current = [];
      app?.dispose();
    };
  }, [interactionTargetRef, scene]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.3s ease-out" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: loaded ? 0 : 1,
          visibility: loaded ? "hidden" : "visible",
          transition: "opacity 0.8s ease-out",
        }}
      >
        <SceneFallback />
      </div>

      <div className="spline-mask" />
    </div>
  );
}
