import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  Sun,
  Moon,
  Home,
  UserPlus,
  Phone,
  Menu,
  X,
  User
} from "lucide-react";
import "../stylesheets/Navbar.css";

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync with system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const navLinks = [
    { path: "/", label: "Inicio", icon: <Home size={16} /> },
    { path: "/signup", label: "Registrarse", icon: <UserPlus size={16} /> },
    { path: "/contact", label: "Contacto", icon: <Phone size={16} /> },
    { path: "/admin", label: "Admin", icon: <User size={16} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNav = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={handleNav}>
            <div className="logo-icon">
              <Shield size={20} />
            </div>
            <span className="logo-text">
              Secure<span className="logo-highlight">Com</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? "navbar-link-active" : ""}`}
                onClick={handleNav}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Theme toggle - desktop */}
            <button
              className="navbar-theme-btn"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              <Sun size={16} className="theme-sun" />
              <Moon size={16} className="theme-moon" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "mobile-overlay-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="flex items-center gap-2">
            <div className="logo-icon" style={{ width: 32, height: 32 }}>
              <Shield size={16} />
            </div>
            <span className="logo-text" style={{ fontSize: "1rem" }}>
              Secure<span className="logo-highlight">Com</span>
            </span>
          </div>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Theme toggle inside mobile menu */}
        <div className="mobile-theme-toggle">
          <button className="mobile-theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Modo claro" : "Modo oscuro"}
          </button>
        </div>

        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? "mobile-nav-link-active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
