import { create } from 'zustand';

interface User {
  email: string;
  name: string;
  role: 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  resetEmailSent: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
}

// Mock admin credentials
const ADMIN_EMAIL = 'admin@avniet.edu';
const ADMIN_PASSWORD = 'admin123';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  resetEmailSent: false,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple mock authentication logic
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const user = {
          email: ADMIN_EMAIL,
          name: 'Admin User',
          role: 'admin' as const,
        };
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false,
          error: null
        });
      } else {
        set({ 
          isLoading: false, 
          error: 'Invalid email or password' 
        });
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'An error occurred during login' 
      });
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  requestPasswordReset: async (email) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock password reset logic - in a real app, this would send an email
      if (email === ADMIN_EMAIL) {
        set({ 
          isLoading: false,
          resetEmailSent: true,
          error: null
        });
      } else {
        set({ 
          isLoading: false, 
          error: 'No account found with this email'
        });
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'An error occurred while processing your request' 
      });
    }
  },
}));
