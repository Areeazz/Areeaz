import { useEffect, useRef, useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const VIEWER_SRC = "https://unpkg.com/@splinetool/viewer@1.12.96/build/spline-viewer.js";
let viewerScriptPromise: Promise<void> | null = null;

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

function loadViewerScript() {
  if (viewerScriptPromise) return viewerScriptPromise;

  viewerScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${VIEWER_SRC}"]`,
    );

    if (existing) {
      if (customElements.get("spline-viewer")) {
        resolve();
        return;
      }

      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = VIEWER_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });

  return viewerScriptPromise;
}

function createViewer(scene: string) {
  const viewer = document.createElement("spline-viewer");
  viewer.setAttribute("url", scene);
  viewer.setAttribute("loading-anim-type", "none");
  viewer.setAttribute("aria-hidden", "true");
  viewer.tabIndex = -1;
  viewer.style.display = "block";
  viewer.style.width = "100%";
  viewer.style.height = "100%";
  viewer.style.pointerEvents = "none";
  viewer.style.touchAction = "pan-y";
  return viewer;
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const hostElement = host;

    let cancelled = false;
    let viewer: HTMLElement | undefined;

    async function loadScene() {
      setLoaded(false);

      await loadViewerScript();
      if (cancelled) return;

      viewer = createViewer(scene);
      viewer.addEventListener("load", () => {
        if (!cancelled) setLoaded(true);
      }, { once: true });

      hostElement.replaceChildren(viewer);
    }

    loadScene().catch(() => {
      if (!cancelled) setLoaded(false);
    });

    return () => {
      cancelled = true;
      viewer?.remove();
    };
  }, [scene]);

  return (
    <div
      className={`pointer-events-none relative h-full w-full ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={hostRef}
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
