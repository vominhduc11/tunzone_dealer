'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name?: string;
  role: 'dealer' | 'guest' | 'admin';
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem('tunezone_user');
        const sessionExpiry = localStorage.getItem('tunezone_session_expiry');
        
        if (savedUser && sessionExpiry) {
          const now = new Date().getTime();
          const expiry = parseInt(sessionExpiry);
          
          if (now < expiry) {
            setUser(JSON.parse(savedUser));
          } else {
            // Session expired, clear storage
            localStorage.removeItem('tunezone_user');
            localStorage.removeItem('tunezone_session_expiry');
            setShowLoginModal(true);
          }
        } else {
          // No existing session, show login modal
          setShowLoginModal(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setShowLoginModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to prevent flash
    const timer = setTimeout(checkExistingSession, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = (credentials: { email: string; password: string }) => {
    let newUser: User;
    
    if (credentials.email === 'guest@tunezone.com') {
      newUser = {
        email: 'guest@tunezone.com',
        name: 'Guest User',
        role: 'guest',
        isGuest: true
      };
    } else {
      newUser = {
        email: credentials.email,
        name: 'Authorized Dealer',
        role: 'dealer',
        isGuest: false
      };
    }

    setUser(newUser);
    
    // Save to localStorage with expiry (24 hours for dealers, 1 hour for guests)
    const expiryHours = newUser.isGuest ? 1 : 24;
    const expiryTime = new Date().getTime() + (expiryHours * 60 * 60 * 1000);
    
    localStorage.setItem('tunezone_user', JSON.stringify(newUser));
    localStorage.setItem('tunezone_session_expiry', expiryTime.toString());
    
    setShowLoginModal(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tunezone_user');
    localStorage.removeItem('tunezone_session_expiry');
    setShowLoginModal(true);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    showLoginModal,
    setShowLoginModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
