import { useRef, useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // 👇 Scroll smoothly to the contact section
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // also close mobile menu
    }
  };

  // 👇 Theme toggler
  const toggleTheme = () => {
    setDark(prev => !prev);
    const isDark = !dark;
    document.body.style.background = isDark
      ? "linear-gradient(115deg,#0d1218,#141b24 55%,#0f161d)"
      : "#f5f7fb";
    document.body.style.color = isDark ? "#e6ecf2" : "#1a222b";
  };

  // 👇 Scroll effect for sticky header styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 👇 Close mobile menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-container">
        {/* ---------- Left: Logo ---------- */}
        <div className="header-left">
          <Link href="/" legacyBehavior>
            <a className="logo-link" aria-label="KaiSportsLive Home">
              <Image
                src="/kbergwhite2.png"
                alt="Logo"
                className="logo"
                width={170}
                height={32}
                priority
              />
            </a>
          </Link>
        </div>

        {/* ---------- Center: Navigation ---------- */}
        <nav className="header-center">
          <button className="nav-link">Sign In</button>
          <button className="nav-link">About Us</button>
          <Link href="/contact" legacyBehavior>
  <a className="nav-link">Contact</a>
</Link>

        </nav>

        {/* ---------- Right: Theme, Donate, Hamburger ---------- */}
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {dark ? "🌙" : "☀️"}
          </button>
          <button className="donate-btn">Donate</button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ---------- Mobile Menu ---------- */}
      {menuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <button className="mobile-link">Sign In</button>
          <button className="mobile-link">About Us</button>
         <Link href="/contact" legacyBehavior>
  <a className="mobile-link">Contact</a>
</Link>
        </div>
      )}
  
      <style jsx>{`
        .site-header {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 1000;
          padding: 0px clamp(14px, 4vw, 38px);
          display: flex;
          align-items: center;
          backdrop-filter: blur(16px) saturate(150%);
          background: rgba(20, 24, 32, 0);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background .5s, box-shadow .4s, border-color .5s;
        }
        .site-header.scrolled {
          background: linear-gradient(90deg,#22021a 0%,#414728 52%,#003616 100%);
          box-shadow: 0 4px 18px -6px rgba(0,0,0,.55);
          border-color: rgba(255,255,255,0.1);
        }
        .header-container {
          width: 100%;
          max-width: 1280px;
          margin: 7 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
          .logo-link {
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.46));
}

        .logo-link { display: inline-flex; align-items: center; height: auto; width: auto; max-height: 40px; }
.logo-link:hover{
    transform: scale(1.2);
transition: 0.2s ease-in;}

        .header-center {
          display: flex;
          gap: 26px;
          align-items: center;
          font-family: "Cambria", Georgia, serif;
        }
        .nav-link {
          background: none;
          border: none;
          font-size: .95rem;
          font-weight: 700;
          letter-spacing: .6px;
          color: #ff5757;
          cursor: pointer;
          position: relative;
          padding: 4px 2px;
          transition: color .35s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg,#ff5757,#27d507);
          transition: width .4s;
        }
        .nav-link:hover {
          color: #2dd10b;
        }
        .nav-link:hover::after { width: 100%; }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .theme-toggle {
          background: none;
          border: 1px solid rgba(120, 88, 88, 0.74);
          width: 38px;
          height: 38px;
          border-radius: 12px;
          font-size: 1.1rem;
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .3s, transform .3s, border-color .4s;
        }
        .theme-toggle:hover {
          background: rgba(255,255,255,0.12);
          transform: rotate(25deg);
          border-color: rgba(255,255,255,0.4);
        }
        .donate-btn {
          background: linear-gradient(135deg,#329a0a,#ff7a00);
          color: #fff;
          border: none;
          padding: 9px 18px;
          font-size: .8rem;
          border-radius: 11px;
          font-weight: 700;
          letter-spacing: .5px;
          cursor: pointer;
          box-shadow: 0 4px 14px -4px rgba(255,120,0,0.55);
          transition: transform .28s, box-shadow .35s;
        }
        .donate-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 22px -6px rgba(255,120,0,0.65);
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #ff4545;
          padding: 2px 8px;
          line-height: 1;
          transition: color .35s;
        }
        .hamburger:hover { color: #2be60f; }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: min(58vw, 320px);
          height: 100vh;
          background: linear-gradient(165deg,#121820,#1a212b 60%,#10161d);
          box-shadow: -4px 0 18px -6px rgba(0,0,0,.55);
          display: flex;
          flex-direction: column;
          padding: 70px 28px 18px;
          gap: 18px;
          animation: slideIn .45s cubic-bezier(.16,.8,.24,1);
          backdrop-filter: blur(14px) saturate(160%);
          border-left: 1px solid rgba(255,255,255,0.07);
        }
        @keyframes slideIn {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .close-menu {
          position: absolute;
          top: 14px;
          right: 80px;
          background: none;
          border: none;
          font-size: 2.2rem;
          color: #fff;
          cursor: pointer;
          line-height: .8;
        }
        .mobile-link {
          background: none;
          border: 1px solid rgba(255,255,255,0.14);
          color: #ff5858;
          font-size: .95rem;
          padding: 12px 14px;
          border-radius: 10px;
          text-align: left;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: .4px;
          transition: background .35s, color .35s, border-color .4s;
        }
        .mobile-link:hover {
          background: rgba(255,255,255,0.09);
          color: #3ff218;
          border-color: rgba(255,255,255,0.3);
        }

        @media (max-width: 900px) {
          .header-center { display: none; }
          .hamburger { display: inline-flex; }
          .donate-btn { padding: 8px 14px; font-size: .72rem; }
          .theme-toggle { width: 34px; height: 34px; font-size: 1rem; }
        }
        @media (max-width: 520px) {
          .donate-btn { display: none; }
          .site-header { padding: 8px 16px; }
        }
      `}</style>
    </header>
  );
}