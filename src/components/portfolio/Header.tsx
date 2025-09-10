import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="container flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          VS
        </button>

        {/* Desktop Pill Nav */}
        <div className="hidden md:flex items-center bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-full px-2 py-1 shadow-lg">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="ml-1 rounded-full hover:bg-gray-800 transition"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="hover:bg-muted transition"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:bg-muted transition"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="mt-3 md:hidden bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg py-3 px-4 flex flex-col space-y-2 border border-gray-700">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-2 rounded-full font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
