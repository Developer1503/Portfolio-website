// src/components/portfolio/Hero.tsx
import React from "react";
import Prism from "../ui/prism"; 
import RotatingText from "../ui/rotating-text";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white text-center">
      {/* Background Prism */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Use brightness adjustment for mobile */}
        <div className="w-full h-full filter brightness-125 sm:brightness-100">
          <Prism />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold">
          Hi, I'm Vedant Shinde
        </h1>

        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl text-gray-300">
          I’m a{" "}
          <RotatingText
            texts={[
              "Full Stack Developer",
              "AI Engineer",
              "ML Enthusiast",
              "Open Source Contributor",
              "Problem Solver"
            ]}
            rotationInterval={2500}
            mainClassName="inline-block text-indigo-400 transition-all duration-500"
            splitLevelClassName="inline-block"
            elementLevelClassName="inline-block"
          />
        </h2>
      </div>
    </section>
  );
};

export default Hero;
