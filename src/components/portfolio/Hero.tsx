// src/components/portfolio/Hero.tsx
import React from "react";
import Prism from "../ui/prism"; // ✅ Adjusted import

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Prism */}
      <div className="absolute inset-0 z-0">
        <Prism />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold">
          Hi, I’m <span className="text-purple-400">Vedant</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          AI/ML Developer | Building InsightCopilot+ | Exploring Web3 & Future Tech
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-purple-400 hover:bg-purple-400/20 rounded-lg font-medium transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
