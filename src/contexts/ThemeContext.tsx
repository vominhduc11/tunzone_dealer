'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize dark theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Always apply dark theme
        applyTheme();
        setMounted(true);
      } catch (error) {
        console.warn('Error initializing theme:', error);
        applyTheme();
        setMounted(true);
      }
    };

    initializeTheme();
  }, []);

  // Apply dark theme to DOM
  const applyTheme = () => {
    const root = document.documentElement;
    
    // Remove light theme class if it exists
    root.classList.remove('light');
    
    // Add dark theme class
    root.classList.add('dark');
    
    // Set data attribute for CSS
    root.setAttribute('data-theme', 'dark');
    
    // Update color-scheme for better browser integration
    root.style.colorScheme = 'dark';
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner w-8 h-8 border-blue-400"></div>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
