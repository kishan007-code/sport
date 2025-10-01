import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HighlightCarousel from "@/components/HighlightCarousel";

export default function Home() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.style.background = dark ? "#fff" : "#111";
    document.body.style.color = dark ? "#111" : "#fff";
  };

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>KaiSportsLive | Watch Live Football & Cricket HD</title>
        <meta
          name="description"
          content="KaiSportsLive brings you live sports matches, HD streams, previews, and updates. Watch football, cricket & more — fast & free."
        />
      </Head>

      <Header toggleTheme={toggleTheme} dark={dark} />

      <main style={{ marginTop: "70px" }}>
        {/* Social Join Buttons */}
        <div className="social-join-container">
          <a href="https://t.me/kai_se7en" target="_blank" rel="noopener noreferrer" className="social-btn telegram">
            <Image src="/telegram.png" alt="Telegram" className="social-icon" width={30} height={30} />
            <span>Telegram</span>
          </a>

          <a href="https://discord.gg/YOUR_INVITE" target="_blank" rel="noopener noreferrer" className="social-btn discord">
            <Image src="/discord.png" alt="Discord" className="social-icon" width={40} height={40} />
            <span>Discord</span>
          </a>

          <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
            <Image src="/whasap.png" alt="WhatsApp" className="social-icon" width={30} height={30} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Kai_shports Live Section */}
        <div className="hot">
          <h1>Kai_shports Live</h1>
        </div>

        <HighlightCarousel />

        {/* Category Section */}
        <div className="liveev">
          <u><h1>Live Events</h1></u>
        </div>

        <section className="category-section">
          <Link href="/category/cricket" className="category-card">
            <Image src="/iccc.png" alt="Cricket" width={300} height={180} />
            <div className="category-title">🏏 <br />Cricket</div>
          </Link>

          <Link href="/category/football" className="category-card">
            <Image src="/fut.png" alt="Football" width={300} height={180} />
            <div className="category-title">⚽ <br />Football</div>
          </Link>

          <Link href="/category/other-live" className="category-card">
            <Image src="/POPULAR.png" alt="Other Live" width={300} height={180} />
            <div className="category-title">📺 <br />Other Popular Live</div>
          </Link>
        </section>

        {/* About Section */}
        <p className="about-title"><strong>ABOUT</strong></p>
        <p>
          Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live
          scores, and match highlights — powered by <b style={{ color: "red" }}>Kaishenborg</b>.
        </p>
      </main>

      <Footer />
    </>
  );
}
