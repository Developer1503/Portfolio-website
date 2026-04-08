import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaggeredMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const staggerVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(24px at calc(100% - 40px) 40px)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export const StaggeredMenu = ({ darkMode, toggleDarkMode }: StaggeredMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={typeof window !== "undefined" ? window.innerHeight : 1000}
      className={`fixed top-0 right-0 z-[100] ${isOpen ? "w-full h-full" : "w-10 h-10 w-auto"} pointer-events-none`}
    >
      <motion.div
        className="absolute top-0 right-0 w-full md:w-96 bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl pointer-events-auto"
        variants={sidebarVariants}
      >
        <motion.ul variants={staggerVariants} className="flex flex-col gap-6 p-8 pt-32 h-full">
          {navItems.map((item) => (
            <motion.li
              variants={itemVariants}
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`text-4xl md:text-5xl font-black uppercase tracking-tighter transition-colors ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent"
                    : "text-gray-800 dark:text-gray-100 hover:text-purple-500 dark:hover:text-cyan-400"
                }`}
              >
                {item.label}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full border border-white/20 backdrop-blur-md shadow-xl pointer-events-auto transition-all duration-300 ${
          isOpen 
            ? "bg-white/20 dark:bg-gray-800/40 text-black dark:text-white" 
            : "bg-black/10 dark:bg-white/10 text-black dark:text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Logo Container with Glassmorphism */}
      <div className="fixed top-4 left-4 sm:left-6 z-40 pointer-events-auto">
         <button
            onClick={() => scrollToSection('home')}
            className="px-5 py-2.5 rounded-2xl border border-white/20 backdrop-blur-md bg-white/10 dark:bg-black/10 shadow-lg flex items-center justify-center group hover:scale-105 hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-2xl font-black bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
              VS.
            </span>
          </button>
      </div>
    </motion.nav>
  );
};

export default StaggeredMenu;
