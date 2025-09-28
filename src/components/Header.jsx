// src/components/Header.js
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.style.background = dark ? "#fff" : "#111";
    document.body.style.color = dark ? "#111" : "#fff";
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* LEFT - Logo */}
        <div className="header-left">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src="/sample1.png" alt="Logo" className="logo" />
          </a>
        </div>

        {/* RIGHT - Menu */}
        <nav className="header-right">
          <button className="nav-link">Sign In</button>
          <button className="nav-link">About Us</button>
          <button className="nav-link">Contact</button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? "🌙" : "☀️"}
          </button>
          <button className="donate-btn">Donate</button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
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
          background: linear-gradient(90deg, #111, #333);
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          padding: 10px 20px;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-link,
        .theme-toggle,
        .donate-btn,
        .hamburger {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1rem;
        }
        .donate-btn {
          background: linear-gradient(45deg, #ff416c, #ff4b2b);
          padding: 6px 14px;
          border-radius: 20px;
        }
        .mobile-menu {
          background: #111;
          position: absolute;
          top: 60px;
          right: 10px;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }
        .mobile-link {
          background: none;
          border: none;
          color: white;
          margin: 5px 0;
          text-align: left;
        }
        @media (max-width: 768px) {
          .nav-link {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
