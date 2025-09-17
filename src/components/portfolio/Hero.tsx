"use client";

import React from "react";
import Spline from "@splinetool/react-spline";
import Prism from "../ui/prism";
import RotatingText from "../ui/rotating-text";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Prism Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <div className="w-full h-full filter brightness-125 sm:brightness-100">
          <Prism />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        
        {/* Left Content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg leading-tight">
            Hi, I'm <span className="text-indigo-400">Vedant Shinde</span>
          </h1>

          <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-300 drop-shadow-md">
            I’m a{" "}
            <RotatingText
              texts={[
                "Full Stack Developer",
                "AI Engineer",
                "ML Enthusiast",
                "Open Source Contributor",
                "Problem Solver",
              ]}
              rotationInterval={2500}
              mainClassName="inline-block text-indigo-400 transition-all duration-500"
              splitLevelClassName="inline-block"
              elementLevelClassName="inline-block"
            />
          </h2>
        </div>

        {/* Right Spline Model */}
        <div className="mt-12 md:mt-0 md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <Spline scene="https://prod.spline.design/CNJqjxyqbjfoh5dQ/scene.splinecode" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
