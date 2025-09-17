"use client";

import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import Prism from "../ui/prism";
import RotatingText from "../ui/rotating-text";

const Hero: React.FC = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Prism Overlay */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <div className="w-full h-full filter brightness-125 sm:brightness-100">
          <Prism />
        </div>
      </div>

      {/* Fullscreen Centered Bot */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Loading State */}
        {!isSplineLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className={`w-full h-full transition-opacity duration-700 ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Spline 
            scene="https://prod.spline.design/CNJqjxyqbjfoh5dQ/scene.splinecode"
            onLoad={handleSplineLoad}
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center md:text-left">
        <div className="space-y-6 max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg leading-tight tracking-tight" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text text-transparent">
              Vedant Shinde
            </span>
          </h1>

          {/* Rotating Text */}
          <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 drop-shadow-md font-medium" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
            I'm a{" "}
            <RotatingText
              texts={[
                "Full Stack Developer",
                "AI Engineer",
                "ML Enthusiast", 
                "Open Source Contributor",
                "Problem Solver",
              ]}
              rotationInterval={2500}
              mainClassName="inline-block text-indigo-400 transition-all duration-500 font-semibold"
              splitLevelClassName="inline-block"
              elementLevelClassName="inline-block"
            />
          </h2>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-indigo-500/25" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
              View My Work
            </button>
            <button className="px-8 py-3 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
              Get In Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center md:justify-start space-x-10 mt-10 text-gray-400">
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>50+</div>
              <div className="text-sm font-medium" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>Projects</div>
            </div>
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>3+</div>
              <div className="text-sm font-medium" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>Years Exp</div>
            </div>
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>∞</div>
              <div className="text-sm font-medium" style={{ fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>Ideas</div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-5 mt-8">
            <a href="#" className="w-11 h-11 bg-gray-800/60 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="w-11 h-11 bg-gray-800/60 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="w-11 h-11 bg-gray-800/60 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50 group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Simple Scroll Indicator */}
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce hover:animate-none transition-all duration-300"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 border-2 border-indigo-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-indigo-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;