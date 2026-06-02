import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Projects = lazy(() => import("./components/Projects"));
const Pricing = lazy(() => import("./components/Pricing"));
const Security = lazy(() => import("./components/Security"));
const About = lazy(() => import("./components/About"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <>
      {/* global film grain ties the whole page to the cinematic 3D scene */}
      <div className="fixed-grain" />
      <Navbar />
      <main className="relative">
          <Hero />
          <Suspense fallback={null}>
            <Projects />
            <Pricing />
            <Security />
            <About />
          </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
