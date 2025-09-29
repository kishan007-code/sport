// src/components/Header.js
import { useRef, useEffect, useState } from 'react';
import Link from "next/link";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null); // Moved here

  const toggleTheme = () => {
    setDark(!dark);
    document.body.style.background = dark ? "#fff" : "#111";
    document.body.style.color = dark ? "#111" : "#fff";
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-container">
        {/* LEFT - Logo */}
        <div className="header-left">
          <Link href="/" legacyBehavior>
            <a>
              <img src="/kbergwhite2.png" alt="Logo" className="logo" />
            </a>
          </Link>
        </div>

        {/* CENTER - Desktop Nav */}
        <nav className="header-center">
          <button className="nav-link">Sign In</button>
          <button className="nav-link">About Us</button>
          <button className="nav-link">Contact</button>
        </nav>

        {/* RIGHT - Theme, Donate, Hamburger */}
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
          </button>
          <button className="donate-btn">Donate</button>
           <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div ref={menuRef} className="menu-panel">
          {/* Your menu content */}
        </div>
      )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            ×
          </button>
          <button className="mobile-link">Sign In</button>
          <button className="mobile-link">About Us</button>
          <button className="mobile-link">Contact</button>
        </div>
      )}

      <style jsx>{`
        .site-header {
          background: rgba(86, 18, 203, 0);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 10px 20px;
          transition: background 0.6s ease-in-out;
          backdrop-filter: blur(20px);
        }
        .site-header.scrolled {
          background: linear-gradient(
            90deg,
            #33010aff 0%,
            #656939ff 50%,
            #002f11ff 100%
          );
          box-shadow: 0 2px 16px rgba(16, 15, 15, 0.79);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }

        .logo {
          height: 42px;
          width: auto;
          cursor: pointer;
        }

        .header-center {
          display: flex;
          gap: 20px;
          align-items: center;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          font-weight: bold;
        }

        .nav-link {
          background: none;
          border: none;
          color: rgb(255, 48, 48);
          cursor: pointer;
          font-size: 1rem;
          font-weight: bolder;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #28cf06;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-right: 20px;
        }

        .theme-toggle {
          background: none;
          border: none;
          font-size: 1.4rem;
          cursor: pointer;
          color: white;
          transition: transform 0.2s;
        }
        .theme-toggle:hover {
          transform: rotate(60deg);
        }

        .donate-btn {
          background: linear-gradient(135deg, #429200a6, #ff7a00);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .donate-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(204, 255, 0, 0.5);
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: rgb(202, 0, 0);
        }

        /* MOBILE MENU */
        .mobile-menu {
          width: 40vw;
          height: 100vh;
          background: rgba(13, 5, 17, 0.95);
          display: flex;
          backdrop-filter: blur(10px);
          animation: slideIn 0.4s ease forwards;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .close-menu {
          align-self: flex-end;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          margin-right: 30px;
          cursor: pointer;
        }

        .mobile-link {
          background: none;
          border: none;
          color: rgb(246, 68, 68);
          font-size: 1.2rem;
          margin: 10px 0;
          cursor: pointer;
          text-align: left;
        }
        .mobile-link:hover {
          color: #ff4d88;
        }

        @media (max-width: 900px) {
          .header-center {
            display: none;
          }
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </header>
  );
  }

