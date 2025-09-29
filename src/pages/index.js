
import { useState, useEffect } from "react";
import HighlightCarousel from "@/components/HighlightCarousel";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import { Bold } from "lucide-react";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
     {/* ================= HEADER ================= */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
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
        <img src="/kbergwhite2.png" alt="Logo" className="logo" />
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

  {/* Social Join Buttons Section */}
<div className="social-join-container">
  <a
    href="https://t.me/kai_se7en"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn telegram"
    aria-label="Join us on Telegram"
  >
    <img src="/telegram.png" alt="Telegram" className="social-icon" />
    <span>Telegram</span>
  </a>

  <a
    href="https://discord.gg/YOUR_INVITE"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn discord"
    aria-label="Join us on Discord"
  >
    <img src="/discord.png" alt="Discord" className="social-icon" />
    <span>Discord</span>
  </a>

  <a
    href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn whatsapp"
    aria-label="Join us on WhatsApp"
  >
    <img src="/whasap.png" alt="WhatsApp" className="social-icon" />
    <span>WhatsApp</span>
  </a>
</div>

{/* Kai_shports Live Section */}
<div className="hot" style={{ textAlign: "center", fontSize: 20 }}>
  <h1 style={{ fontWeight: "bold" }}>Kai_shports Live</h1>
</div>
<HighlightCarousel/>

<div className= "liveev" style={{alignContent:"center", textAlign:"center", fontSize:30}}><u><h1>Live Events</h1></u></div>
        <section className="category-section">
  <Link href="/category/cricket" className="category-card">
    <Image src="/iccc.png" alt="Cricket" width={300} height={180} />
    <div className="category-title">🏏 <br/>Cricket</div>
  </Link>

  <Link href="/category/football" className="category-card">
    <Image src="/futt.jpg" alt="Football" width={300} height={180} />
    <div className="category-title">⚽ <br/>Football</div>
  </Link>

  <Link href="/category/other-live" className="category-card">
    <Image src="/POPULAR.png" alt="Other Live" width={300} height={180} />
    <div className="category-title">📺 Other Popular Live</div>
  </Link>
</section>


<p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold'}}><strong >ABOUT</strong><br/></p><p>Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live scores, and match highlights — powered by <a href="https://www.facebook.com/profile.php?id=61577032744088">Kaishenborg</a>. Watch your favorite teams in action now!</p>
<p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold'}}><strong >Keywords</strong><br/></p>
<p>
  <meta name="keywords" content="Live sports streaming, Watch cricket live, Football live stream, XYZ Live sports, Free sports streaming, ESPN live matches, Live scores and highlights, HD sports stream, Cricket match today, Football fixtures live, Stream IPL, Stream Premier League, XYZ Live cricket and football"></meta>
 
Live sports streaming, Watch cricket live, Football live stream, crichd Live sports, Free sports streaming, ESPN live matches, Live scores and highlights, HD sports stream, Cricket match today, Football fixtures live, Stream EPL, Stream Premier League, Kaishen Live cricket and football"

</p>

<p style={{textAlign:"center", fontFamily:'Segoe UI'}}><strong>Note:</strong> We don't host any of the streams. They are from 3rd party sites. <br/> Contact us for any takedowns.</p>


        {/* Footer */}
        <footer className="footer">
          <div className="footer-columns">
            <div className="quick-links">
  <strong className="quick-title">Social Media Links</strong>
  <div className="social-icons">
    <a
      href="https://www.facebook.com/profile.php?id=61577032744088"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
    >
      <img src="/fb.png" alt="Facebook" />
    </a>

    <a
      href="https://www.instagram.com/kai.se7en/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <img src="/insta.png" alt="Instagram" />
    </a>

    <a
      href="https://www.tiktok.com/@kai7berg"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
    >
      <img src="/tktk.png" alt="TikTok" />
    </a>
  </div>
</div>

            <div>
              <strong>Get in Touch</strong>
              <br />xxxxxxx
              <br /> joshijona119@gmail.com
              <br /> Brussels, Belgium
            </div>
            <div>
              <strong>Chief Executive Officer</strong>
              <br /> Kai_7
              <br/> <br/>
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
