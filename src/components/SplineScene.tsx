import { useEffect, useRef, useState } from "react";
import type { Application } from "@splinetool/runtime";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

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

function prepareScrollSafeCanvas(canvas: HTMLCanvasElement) {
  canvas.style.pointerEvents = "none";
  canvas.style.touchAction = "pan-y";
  canvas.tabIndex = -1;
  canvas.setAttribute("aria-hidden", "true");
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    let cancelled = false;
    let app: Application | undefined;

    async function loadScene() {
      setLoaded(false);

      const { Application } = await import("@splinetool/runtime");
      if (cancelled) return;

      app = new Application(canvasElement, { renderMode: "auto" });
      await app.load(scene);
      if (cancelled) return;

      prepareScrollSafeCanvas(canvasElement);
      app.requestRender();
      setLoaded(true);
    }

    loadScene().catch(() => {
      if (!cancelled) setLoaded(false);
    });

    return () => {
      cancelled = true;
      app?.dispose();
    };
  }, [scene]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 900ms ease-out" }}
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
