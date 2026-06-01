import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplineScene from "./SplineScene";
import { fadeUp, stagger } from "../lib/motion";
import TypewriterHeading from "./TypewriterHeading";

const DESKTOP_SCENE_URL = "https://prod.spline.design/LRc0rTyPoGpqJWMy/scene.splinecode";
const MOBILE_SCENE_URL = "https://prod.spline.design/n6DEqOr6bVrKACY3/scene.splinecode";
const MOBILE_SCENE_QUERY = "(max-width: 767px)";

function getResponsiveSceneUrl() {
  if (typeof window === "undefined") return DESKTOP_SCENE_URL;

  return window.matchMedia(MOBILE_SCENE_QUERY).matches
    ? MOBILE_SCENE_URL
    : DESKTOP_SCENE_URL;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [sceneUrl, setSceneUrl] = useState(getResponsiveSceneUrl);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_SCENE_QUERY);
    const updateScene = () => {
      setSceneUrl(mediaQuery.matches ? MOBILE_SCENE_URL : DESKTOP_SCENE_URL);
    };

    updateScene();
    mediaQuery.addEventListener("change", updateScene);

    return () => mediaQuery.removeEventListener("change", updateScene);
  }, []);

  return (
    <header
      ref={heroRef}
      id="top"
      className="pointer-events-auto relative h-svh min-h-[680px] w-full overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      {/* 3D centerpiece - fixed cinematic background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 translate-y-10 sm:translate-y-12 md:translate-y-0"
        style={{ touchAction: "pan-y" }}
      >
        <SplineScene
          scene={sceneUrl}
          interactionTargetRef={heroRef}
        />
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
            <TypewriterHeading
              delayMs={320}
              speedMs={32}
              lines={[
                [{ text: "Systems Built for" }],
                [{ text: "Those Ready to" }],
                [{ text: "Upgrade.", className: "text-gradient" }],
              ]}
            />
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
