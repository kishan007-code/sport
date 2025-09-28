
import { useState, useEffect } from "react";
import HighlightCarousel from "@/components/HighlightCarousel";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.style.background = dark ? "#fff" : "#111";
    document.body.style.color = dark ? "#111" : "#fff";
  };

  return (
    <>
     {/* ================= HEADER ================= */}
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

    {/* CENTER - Desktop Links */}
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
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </div>
  </div>
</header>

{/* ================= MOBILE MENU ================= */}
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


      {/* ================= MAIN ================= */}
      <main style={{ marginTop: "70px" }}>
        <HighlightCarousel />

        <section className="category-section">
  <Link href="/category/cricket" className="category-card">
    <Image src="/icc.png" alt="Cricket" width={300} height={180} />
    <div className="category-title">🏏 Cricket</div>
  </Link>

  <Link href="/category/football" className="category-card">
    <Image src="/fut.jpg" alt="Football" width={300} height={180} />
    <div className="category-title">⚽ Football</div>
  </Link>

  <Link href="/category/other-live" className="category-card">
    <Image src="/globe.svg" alt="Other Live" width={300} height={180} />
    <div className="category-title">📺 Other Live</div>
  </Link>
</section>


        {/* Footer */}
        <footer className="footer">
          <div className="footer-columns">
            <div>
              <strong>Quick Link</strong>
              <br /> facebook
              <br /> Instagram </div>
            <div>
              <strong>Get in Touch</strong>
              <br /> +977-xxxxxxx
              <br /> info@gmail.com
              <br /> Brussels, Belgium
            </div>
            <div>
              <strong>Chief Executive Officer</strong>
              <br /> Kai_7
              <br /> 9876543210
              <br /> 
            </div>
          </div>
          <div className="footer-bottom">
            ©2026 kaisenberg
          </div>
        </footer>
      </main>
    </>
  );
}
