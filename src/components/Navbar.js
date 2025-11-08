'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-green-600 text-white">
      {/* Main Navbar */}
      <div className="flex justify-between items-center p-4">
        {/* Logo / Brand */}
        <Link href="/" className="font-bold text-lg">
          CleanAlert
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex gap-4 items-center">
          {user?.role === 'admin' && (
            <Link href="/admin/reports" className="bg-white text-green-700 px-3 py-1 rounded-md">
              Admin Dashboard
            </Link>
          )}
          <Link href="/report" className="hover:underline">Report Issue</Link>
          <Link href="/reports" className="hover:underline">View Reports</Link>
          <Link href="/donate" className="hover:underline">Donate</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link 
                href="/auth/login" 
                className="text-white hover:underline px-3 py-1 rounded transition"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition font-medium"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button - visible only on mobile */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </button>
      </div>

      {/* Mobile Menu - slides in from top */}
      <div className={`md:hidden bg-green-700 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 space-y-4">
          {/* Admin Link */}
          {user?.role === 'admin' && (
            <Link 
              href="/admin/reports" 
              className="block bg-white text-green-700 px-4 py-2 rounded-md text-center font-medium"
              onClick={closeMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {/* Main Links */}
          <Link 
            href="/report" 
            className="block text-white hover:bg-green-600 px-4 py-2 rounded-md transition"
            onClick={closeMenu}
          >
            Report Issue
          </Link>
          <Link 
            href="/reports" 
            className="block text-white hover:bg-green-600 px-4 py-2 rounded-md transition"
            onClick={closeMenu}
          >
            View Reports
          </Link>
          <Link 
            href="/donate" 
            className="block text-white hover:bg-green-600 px-4 py-2 rounded-md transition"
            onClick={closeMenu}
          >
            Donate
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="space-y-3 pt-2 border-t border-green-500">
              <div className="text-center text-sm text-green-200">
                Welcome, {user.username}
              </div>
              <button 
                onClick={handleLogout}
                className="w-full bg-white text-green-700 px-4 py-2 rounded-md font-medium hover:bg-green-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t border-green-500">
              <Link 
                href="/auth/login" 
                className="block text-white hover:bg-green-600 px-4 py-2 rounded-md text-center transition"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="block bg-amber-500 text-white px-4 py-2 rounded-md text-center font-medium hover:bg-amber-600 transition"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}