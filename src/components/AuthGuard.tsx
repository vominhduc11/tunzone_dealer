'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, showLoginModal, setShowLoginModal, login, user } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-100 mb-2">TuneZone Distributors</div>
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  // Show login modal if not authenticated
  if (!isAuthenticated || showLoginModal) {
    return (
      <>
        {/* Blurred background content */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Login Modal */}
        <LoginModal
          isOpen={true}
          onClose={() => {
            // Don't allow closing without authentication
            if (isAuthenticated) {
              setShowLoginModal(false);
            }
          }}
          onLogin={login}
        />
      </>
    );
  }

  // Show guest access banner for guest users
  if (user?.isGuest) {
    return (
      <>
        {/* Guest Access Banner */}
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-yellow-600 mr-2">⚠️</div>
              <span className="text-sm text-yellow-800">
                You are browsing as a guest with limited access.
              </span>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
            >
              Sign In as Dealer
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }

  // Authenticated user - show full content
  return <>{children}</>;
}
