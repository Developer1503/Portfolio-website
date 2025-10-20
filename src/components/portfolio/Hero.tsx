"use client";
import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import Prism from "../ui/prism";
import RotatingText from "../ui/rotating-text";

const Hero: React.FC = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  const handleSplineLoad = () => setIsSplineLoaded(true);
  const handleSplineError = () => setSplineError(true);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const socialLinks = [
  { href: "https://github.com/Developer1503", icon: <GitHubIcon />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/vedant-shinde-119866242/", icon: <LinkedInIcon />, label: "LinkedIn" },
  { href: "#", icon: <TwitterIcon />, label: "Twitter" }, // Replace # with your Twitter link if available
];


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
        {!isSplineLoaded && !splineError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {splineError ? (
          <div className="text-red-500">
            Failed to load 3D model. Please refresh the page.
          </div>
        ) : (
          <div
            className={`w-full h-full transition-opacity duration-700 ${
              isSplineLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline
              scene="https://prod.spline.design/CNJqjxyqbjfoh5dQ/scene.splinecode"
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          </div>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 text-left">
        <div className="space-y-6 max-w-4xl">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin drop-shadow-lg leading-tight tracking-tight roboto-thin"
              style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 100 }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600 bg-clip-text text-transparent">
                Vedant Shinde
              </span>
            </h1>
            <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-300 drop-shadow-md font-medium roboto-regular">
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
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden space-y-6 text-center px-4">
            <div className="inline-block px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm mb-4">
              <span className="text-indigo-400 font-medium text-xs tracking-wide">
                👋 Welcome to my world
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Hi, I'm
              </h1>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vedant Shinde
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-gray-400 text-sm font-light">I'm a</p>
                <RotatingText
                  texts={[
                    "Full Stack Developer",
                    "AI Engineer",
                    "ML Enthusiast",
                    "Open Source Contributor",
                    "Problem Solver",
                  ]}
                  rotationInterval={2500}
                  mainClassName="block text-lg font-semibold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text"
                />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 mt-8 justify-start">
            <div className="hidden md:flex md:flex-row md:gap-4">
              <button
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-indigo-500/25 roboto-medium"
                onClick={scrollToNextSection}
              >
                View My Work
              </button>
              <button className="px-8 py-3 border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 roboto-medium">
                Get In Touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            <div className="flex md:hidden flex-col gap-3 px-4">
              <button
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={scrollToNextSection}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                View My Work
              </button>
              <button className="w-full py-4 border-2 border-indigo-400/60 text-indigo-400 rounded-xl font-semibold backdrop-blur-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Get In Touch
              </button>
            </div>
          </div>

          {/* Stats - Left-aligned */}
          <div className="hidden md:flex md:justify-start md:space-x-10 mt-10 text-gray-400">
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors roboto-medium">
                50+
              </div>
              <div className="text-sm font-medium roboto-regular">Projects</div>
            </div>
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors roboto-medium">
                3+
              </div>
              <div className="text-sm font-medium roboto-regular">Years Exp</div>
            </div>
            <div className="text-center cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors roboto-medium">
                ∞
              </div>
              <div className="text-sm font-medium roboto-regular">Ideas</div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden mx-4 mt-8">
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
              <div className="flex justify-start gap-6">
                {[
                  { number: "50+", label: "Projects", icon: "📂" },
                  { number: "3+", label: "Years", icon: "⏳" },
                  { number: "∞", label: "Ideas", icon: "💡" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-indigo-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Social Links - Left-aligned */}
          <div className="hidden md:flex md:justify-start md:space-x-5 mt-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className="w-11 h-11 flex items-center justify-center bg-gray-800/60 hover:bg-indigo-600 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-700/50 hover:border-indigo-500/50"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Mobile Social Links - Left-aligned */}
          <div className="md:hidden mx-4 mt-6">
            <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-4">
              <div className="flex justify-start gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200 active:scale-95"
                  >
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      {link.icon}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="md:hidden flex justify-start mt-8">
            <button
              onClick={scrollToNextSection}
              className="flex flex-col items-center gap-2 text-gray-400 active:scale-95 transition-all duration-200"
            >
              <span className="text-xs font-medium">Scroll to explore</span>
              <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center animate-bounce">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icons
const GitHubIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743C11.65 6.58 7.31 3.87 3.87 3.87a8.17 8.17 0 0 1-2.27-.646A4.13 4.13 0 0 0 1.61 6.777c-.37.2-.64.476-.804.798A8.19 8.19 0 0 1 0 5.92a8.35 8.35 0 0 1 2.605-.996 4.107 4.107 0 0 0 6.993 3.743c7.74-4.81 11.078-2.97 11.078 2.475v.059c0 2.22-1.56 4.465-3.743 5.958C18.555 15.89 15.81 17.48 12.21 17.73a12.18 12.18 0 0 1-6.712 1.557c-.5 0-.99-.06-.99-.06A4.1 4.1 0 0 0 7.28 19.1a8.21 8.21 0 0 1-6.172 1.925A8.19 8.19 0 0 1 0 19.545a12.22 12.22 0 0 0 7.954 2.608c9.06 0 13.59-7.5 13.59-13.59 0-.2-.005-.4-.013-.6z" />
  </svg>
);

export default Hero;
