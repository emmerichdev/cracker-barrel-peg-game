import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import Instructions from './Instructions';
import ThemeToggle from './ThemeToggle';

const App: React.FC = () => {
  // Use localStorage and system preference for initial theme
  const getInitialTheme = (): 'dark' | 'light' => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to dark theme
    return 'dark';
  };

  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  // Apply theme immediately when component mounts and whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col items-center justify-center py-4 px-4 relative">
      <ThemeToggle currentTheme={theme} toggleTheme={toggleTheme} />
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <GameBoard />
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <Instructions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 