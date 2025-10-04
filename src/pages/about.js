import Link from "next/link";
import Image from "next/image";
export default function AboutPage() {
return(
    <section className="about-section">
  <div className="top-nav">
    <Link href="/" legacyBehavior>
      <a className="home-logo">
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
    <h1 className="page-title">⚽ About Us</h1>
  </div>

  <div className="about-container">
    {/* ---------- Hero / Mission ---------- */}
    <div className="about-block">
      <h2>Our Mission 🎯</h2>
      <p>
        We built this platform with one simple goal: to bring <strong>live sports action</strong> and 
        <strong>authentic analysis</strong> together under one roof. No endless searching, no spammy pop-ups — 
        just the game, the vibe, and the story behind every match.
      </p>
    </div>

    {/* ---------- Our Story ---------- */}
    <div className="about-block">
      <h2>Our Journey 🚀</h2>
      <p>
        What started as a small experiment by a few passionate fans is slowly evolving into a hub 
        for sports lovers across the globe. We noticed how fragmented the sports streaming scene is — 
        so we decided to do something about it.  
      </p>
      <p>
        Here, we curate reliable live match links 🖥, deliver fresh previews 📝, and soon, 
        we will bring in sharp post-match analysis that goes beyond the scoreline. 
        Because sport is not just about who wins; it is about <em>why</em> they won.
      </p>
    </div>

    {/* ---------- What We Do ---------- */}
    <div className="about-block">
      <h2>What We Offer 📰</h2>
      <ul>
        <li>✅ <strong>Live Streaming Match Previews</strong> — Fast, clean, and easily accessible links for major matches.</li>
        <li>🗞 <strong>Match Previews & Analysis</strong> — Tactical breakdowns, predictions, storylines that matter.</li>
        <li>🧠 <strong>News & Updates</strong> — A new section coming soon to keep fans in the loop.</li>
        <li>🌍 <strong>Community Vibes</strong> — A space for fans to share thoughts, memes, and raw passion.</li>
      </ul>
    </div>

    {/* ---------- Road Ahead ---------- */}
    <div className="about-block">
      <h2>Looking Ahead 🌠</h2>
      <p>
        This is just the beginning. In the coming weeks, we are rolling out a full-fledged 
        <strong>News & Blog</strong> section to bring fans daily stories, quick analyses, and match insights.  
        We are not just building a website — we are building a <em>sports universe</em>. 
        And if you are here, you are already part of it.
      </p>
      <p>
        ✨ Stay tuned. Share it with your squad. Lets change how sports fans experience the game — together.
      </p>
    </div>
  </div>

  <style jsx>{`
    .about-section {
      background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
      color: #f8fafc;
      min-height: 100vh;
      padding: 30px 20px 60px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .top-nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      margin-bottom: 30px;
    }

    .home-logo img {
      width: 160px;
      transition: transform .25s;
    }
    .home-logo:hover img {
      transform: scale(1.08);
    }

    .page-title {
      font-size: 2rem;
      color: #00b4d8;
      font-weight: bold;
    }

    .about-container {
      max-width: 900px;
      margin: 0 auto;
    }

    .about-block {
      background: rgba(255,255,255,0.05);
      padding: 20px;
      border-radius: 14px;
      box-shadow: 0 8px 24px -10px rgba(0,0,0,0.5);
      margin-bottom: 20px;
    }

    .about-block h2 {
      color: #38bdf8;
      margin-bottom: 10px;
    }

    ul {
      padding-left: 20px;
      line-height: 1.5;
    }

    @media (max-width: 640px) {
      .page-title { font-size: 1.6rem; }
    }
  `}</style>
</section>

);

}