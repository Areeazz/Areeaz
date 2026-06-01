import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { fadeUp, stagger } from "../lib/motion";

const SplineScene = lazy(() => import("./SplineScene"));
const DESKTOP_SCENE_URL = "https://prod.spline.design/LRc0rTyPoGpqJWMy/scene.splinecode";
const MOBILE_SCENE_URL = "https://prod.spline.design/n6DEqOr6bVrKACY3/scene.splinecode";
const MOBILE_SCENE_QUERY = "(max-width: 767px)";
const SPLINE_LOAD_DELAY_MS = 1800;

function getResponsiveSceneUrl() {
  if (typeof window === "undefined") return DESKTOP_SCENE_URL;

  return window.matchMedia(MOBILE_SCENE_QUERY).matches
    ? MOBILE_SCENE_URL
    : DESKTOP_SCENE_URL;
}

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#080505]">
      <div className="depth-grid opacity-45" />
      <div className="absolute left-[8%] top-[22%] h-28 w-36 rounded-[45%] bg-[radial-gradient(circle_at_30%_35%,rgba(255,150,126,0.58),rgba(156,16,18,0.48)_36%,rgba(42,8,8,0.08)_72%,transparent)] blur-[1px]" />
      <div className="absolute right-[9%] top-[46%] h-28 w-40 rounded-[44%] bg-[radial-gradient(circle_at_70%_42%,rgba(255,127,100,0.54),rgba(154,16,18,0.43)_38%,rgba(42,8,8,0.08)_74%,transparent)] blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(44%_46%_at_50%_50%,rgba(4,3,3,0.9),rgba(8,5,5,0.46)_58%,transparent_84%)]" />
    </div>
  );
}

export default function Hero() {
  const [sceneUrl, setSceneUrl] = useState(getResponsiveSceneUrl);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_SCENE_QUERY);
    const updateScene = () => {
      setSceneUrl(mediaQuery.matches ? MOBILE_SCENE_URL : DESKTOP_SCENE_URL);
    };

    updateScene();
    mediaQuery.addEventListener("change", updateScene);

    return () => mediaQuery.removeEventListener("change", updateScene);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let deferTimer = 0;
    let idleId = 0;

    const loadSpline = () => {
      if (!cancelled) setShouldLoadSpline(true);
    };

    const scheduleIdleLoad = () => {
      deferTimer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(loadSpline, { timeout: 1500 });
          return;
        }

        loadSpline();
      }, SPLINE_LOAD_DELAY_MS);
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scheduleIdleLoad);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(deferTimer);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <header
      id="top"
      className="pointer-events-auto relative h-svh min-h-[680px] w-full overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      {/* 3D centerpiece - fixed cinematic background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 translate-y-10 sm:translate-y-12 md:translate-y-0"
        style={{ touchAction: "pan-y" }}
      >
        <Suspense fallback={<HeroSceneFallback />}>
          {shouldLoadSpline ? <SplineScene scene={sceneUrl} /> : <HeroSceneFallback />}
        </Suspense>
      </motion.div>

      {/* integration layers — must not capture touch (pointer-events is not inherited) */}
      <div className="hero-readability pointer-events-none z-10" />
      <div className="vignette pointer-events-none z-20" />
      <div className="grain pointer-events-none z-30" />

      {/* copy - centered so the scene can frame it cinematically */}
      <div className="pointer-events-none [&_*]:pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6 py-20 text-center md:px-14 md:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex w-full max-w-[20rem] flex-col items-center text-center [text-shadow:0_2px_34px_rgba(0,0,0,0.62)] sm:max-w-[24rem] md:max-w-[58rem]"
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-[15ch] text-center font-serif text-[2.1rem] font-semibold leading-[0.95] sm:text-4xl md:text-[clamp(2.65rem,7vw,6.6rem)] md:leading-[0.98]"
          >
            <span className="block">Systems Built for</span>
            <span className="block">Those Ready to</span>
            <span className="block text-gradient">Upgrade.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-[20rem] text-center text-sm leading-[1.45] [color:rgba(247,243,241,0.74)] md:mt-7 md:max-w-[36rem] md:text-[16px] md:leading-relaxed"
          >
            Websites, platforms, and business systems built around how your
            business actually operates.
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
}
