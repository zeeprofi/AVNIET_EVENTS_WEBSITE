
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { MotionBox, fadeIn } from './ui/motion';
import { useAuthStore } from '@/store/authStore';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="sticky top-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="text-2xl font-bold text-primary">
              <span className="text-event-700">AVN</span>
              <span className="text-event-500">Events</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Admin Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link to="/admin" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">Dashboard</Button>
                  </Link>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    logout();
                    closeMenu();
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu}>
                  <Button className="w-full">Admin Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </MotionBox>
  );
};
