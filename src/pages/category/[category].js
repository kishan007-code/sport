import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState, useMemo, useCallback } from "react";
import Layout from "@/components/Layout";
import MatchRow from "@/components/MatchRow";
import BannerAd from "@/components/BannerAd";
import Footer from "@/components/Footer";
import videoData from "@/pages/video/[videoId]"

const categoryMatches = {
  cricket: [
    {
      id: "video9",
      title: "Afghanistan vs Bangladesh",
      subtitle: "World T20 Qualifier",
      time: "2025-10-08T20:45:00+05:45",
      durationMinutes: 300,
    },
     {
      id: "video10",
      title: "Nepal vs Kuwait",
      subtitle: "3rd T20I",
      time: "2025-10-05T20:15:00+05:45",
      durationMinutes: 300,
    },
  ],
  football: [
    {
      id: "video11",
      title: "Dortmund vs RB Leipzig",
      subtitle: "Bundesliga",
      time: "2025-10-04T19:15:00+05:45",
      durationMinutes: 300,
    },
     {
      id: "video3",
      title: "Bayer Leverkushen vs Union Berlin",
      subtitle: "Bundesliga",
      time: "2025-10-04T19:15:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video1",
      title: "Inter vs Cremonese",
      subtitle: "Serie A",
      time: "2025-10-04T23:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video2",
      title: "Bayern vs Frankfurt",
      subtitle: "Bundesliga",
      time: "2025-10-04T24:00:00+05:45",
      durationMinutes: 120,
    },
    
     {
      id: "video4",
      title: "Real Madrid vs Villarreal",
      subtitle: "Laliga",
      time: "2025-10-05T00:45:00+05:45",
      durationMinutes: 120,
    },
     {
      id: "video5",
      title: "Barcelona vs Sevilla",
      subtitle: "Laliga",
      time: "2025-10-05T20:00:00+05:45",
      durationMinutes: 120,
    },
     {
      id: "video6",
      title: "Arsenal vs Westham",
      subtitle: "Premier League",
      time: "2025-10-04T19:45:00+05:45",
      durationMinutes: 120,
    },
     {
      id: "video7",
      title: "Man United vs Sunderland",
      subtitle: "Premier League",
      time: "2025-10-04T19:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video8",
      title: "Liverpool vs Chelsea",
      subtitle: "Premier League",
      time: "2025-10-04T19:45:00+05:45",
      durationMinutes: 120,
    },
     
  {
      id: "video12",
      title: "Newcastle vs Nottm Forest",
      subtitle: "Premier League",
      time: "2025-10-05T18:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video13",
      title: "Brighton vs Wolves",
      subtitle: "Premier League",
      time: "2025-10-05T18:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video14",
      title: "Brentford vs Man city",
      subtitle: "Premier League",
      time: "2025-10-05T21:15:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video15",
      title: "Aston Villa vs Burnley",
      subtitle: "Premier League",
      time: "2025-10-05T18:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video16",
      title: "Everton vs Crystal Palace",
      subtitle: "Premier League",
      time: "2025-10-05T18:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video17",
      title: "Napoli vs Genoa",
      subtitle: "Serie A",
      time: "2025-10-05T21:45:00+05:45",
      durationMinutes: 120,
    },
    {
      id: "video18",
      title: "Inter Miami vs New England",
      subtitle: "MLS",
      time: "2025-10-05T05:15:00+05:45",
      durationMinutes: 120,
    },
  ],
};

const STATUS = {
  UPCOMING: "UPCOMING",
  LIVE: "LIVE",
  ENDED: "ENDED",
};

function computeStatus(match, now) {
  const start = new Date(match.time);
  const end = new Date(start.getTime() + (match.durationMinutes || 150) * 60 * 1000);
  if (now < start) return { status: STATUS.UPCOMING, start, end };
  if (now >= start && now < end) return { status: STATUS.LIVE, start, end };
  return { status: STATUS.ENDED, start, end };
}

function formatStartsIn(start, now) {
  const diffMs = start - now;
  if (diffMs <= 0) return "Starts now";
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);
  if (diffD >= 1) return diffD === 1 ? "Starts in 1 day" : `Starts in ${diffD} days`;
  if (diffH >= 1) return diffH === 1 ? "Starts in 1 hour" : `Starts in ${diffH} hours`;
  if (diffMin >= 1) return diffMin === 1 ? "Starts in 1 min" : `Starts in ${diffMin} mins`;
  return "Starts in seconds";
}

function countdownUnder24Hours(start, now) {
  const diff = start - now;
  if (diff <= 0 || diff > 24 * 60 * 60 * 1000) return null;
  const totalSec = Math.floor(diff / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const hh = h.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
}

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const [now, setNow] = useState(() => new Date());
  const [clickCounts, setClickCounts] = useState({});
  const [, setIncrementing] = useState({});

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/clicks")
      .then(r => r.json())
      .then(d => d.counts && setClickCounts(d.counts))
      .catch(() => {});
  }, []);

  const matches = useMemo(() => {
    if (!category) return [];
    return categoryMatches[category.toLowerCase()] || [];
  }, [category]);

  const categoryTitle = useMemo(() => {
    if (!category) return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  }, [category]);

  const handleClick = useCallback((id) => {
    setClickCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setIncrementing(p => ({ ...p, [id]: true }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId: id }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.videoId) {
          setClickCounts(prev => ({ ...prev, [data.videoId]: data.count }));
        }
      })
      .finally(() => {
        setIncrementing(p => {
          const copy = { ...p };
            delete copy[id];
          return copy;
        });
      });
  }, []);

  if (!category) return null;

  if (!matches.length) {
    return (
      <Layout>
        <Head>
          <title>{categoryTitle} | Streams</title>
        </Head>
        <div style={{ padding: "60px 24px", textAlign: "center" }}>
          <h2 style={{ marginBottom: 12 }}>No matches found in {categoryTitle}</h2>
          <p style={{ opacity: 0.7 }}>Check back later. New fixtures will appear automatically.</p>
        </div>
      </Layout>
    );
  }

  const sorted = [...matches].sort((a, b) => new Date(a.time) - new Date(b.time));

  function getEmoji(cat) {
    const map = { cricket: "🏏", football: "⚽" };
    return map[cat?.toLowerCase()] || "🏆";
  }

  return (
    <Layout>
      <Head>
        <title>{categoryTitle} Streams | KaiSportsLive</title>
        <meta name="description" content={`Watch and track ${categoryTitle} streams, live status, countdown & results.`} />
      </Head>

      <main className="category-shell">
        <section className="hero">
          <div className="icon-wrap">
            <span className="hero-icon">{getEmoji(category)}</span>
          </div>
          <h1 className="page-title">
            {categoryTitle} <span className="dim">Streams</span>
          </h1>
          <p className="tagline">Watch sports stream in HD</p>
        </section>

<BannerAd
  href="mailto:advertising@kaisportslive.com"
  imgSrc="/banner.png"
  alt="Advertise here"
  label="Contact for Ad Space"
  height={90}
/>     
           <section className="list-section">
          <header className="list-header">
            <h2>Upcoming & Live</h2>
          </header>
          <ul className="match-list">
            {sorted.map(m => {
              const { status, start } = computeStatus(m, now);
              const startLocal = start;
              const displayTimeRaw = formatStartsIn(startLocal, now);
              const countdown =
                status === STATUS.UPCOMING ? countdownUnder24Hours(startLocal, now) : null;
              const elapsedMinutes =
                status === STATUS.LIVE
                  ? Math.max(1, Math.floor((now.getTime() - startLocal.getTime()) / 60000))
                  : null;
              return (
                <MatchRow
                  key={m.id}
                  match={m}
                  status={status}
                  countdown={countdown}
                  displayTime={displayTimeRaw}
                  elapsedMinutes={elapsedMinutes}
                  clickCount={clickCounts[m.id]}
                  onClick={handleClick}
                />
              );
            })}
          </ul>
        </section>

<BannerAd
  href="mailto:advertising@kaisportslive.com"
  imgSrc="/banner.png"
  alt="Advertise here"
  label="Contact for Ad Space"
  height={90}
/>
        <section className="about centered">
          <h3>About</h3>
          <p>
           Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live scores, and match highlights — Powered by <b style={{color: "red" }}>Kai7borg</b>. Watch your favorite teams in action now!
          </p>
          <p className="note">
            <strong>Note:</strong>  Kaishports live does not host any media content on it own Site. Our site visitors might use external or third parties services to show content, We Notify all copyright owners, to discover that the links and media shared by visitors and contained within this site are hosted somewhere else on the web or embedded from other various sites like above.
Contact us for any takedowns.
          </p>
        </section>
      </main>

      <style jsx>{`
        .category-shell {
          position: relative;
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          padding: 52px 22px 90px;
        }
       
      
        .hero {
          text-align: center;
          margin-bottom: 34px;
        }
        .icon-wrap {
          display: inline-flex;
          width: 76px;
          height: 76px;
          border: 2px solid rgba(232, 226, 226, 0.8);
          border-radius: 30px;
          align-items: center;
          justify-content: center;
                    margin-top: 30px;
          box-shadow: 0 10px 28px -10px rgba(0,0,0,.65),
            0 2px 4px rgba(0,0,0,.4);
          animation: float 4.8s ease-in-out infinite;
        }
        .hero-icon {
          font-size: 44px;
          animation: gentle-pulse 1.6s infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gentle-pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: .92; }
        }
        .page-title {
          font-size: clamp(2rem,4.8vw,3rem);
          font-weight: 600;
          letter-spacing: -.5px;
          margin: 0 0 6px;
          background: linear-gradient(90deg,#f0f3f8,#d5dde6);
          -webkit-background-clip: text;
          
        }
        .page-title .dim { font-weight: 300; opacity: .82; }
        .tagline {
          margin: 0;
          font-size: .92rem;
          font-weight: 400;
          letter-spacing: .5px;
          opacity: .96;
        }
        .list-section { margin-top: 12px; }
        .list-header {
          margin: 0 0 18px;
          text-align: center;
        }
        .list-header h2 {
        font-family: times new roman;
          margin: 0;
          font-size: clamp(1.45rem,2.6vw,1.65rem);
          font-weight: 600;
          letter-spacing: .8px;
          background: linear-gradient(90deg,#ffffff,#cdd5de);
          -webkit-background-clip: text;
          position: relative;
        }
        .list-header h2::after {
          content:'';
          display: block;
          width: 70px;
          height: 3px;
          margin: 10px auto 0;
          background: linear-gradient(90deg,#4860ff,#ff7a1e);
          border-radius: 2px;
          opacity: .85;
        }
        .match-list {
          margin: 0;
          padding: 0;
font-family: Rockwell;
        }
        .about.centered {
        font-family: Calisto MT;
          margin-top: 70px;
          text-align: center;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.55;
        }
        .about.centered h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 14px;
          letter-spacing: .6px;
        }
        .about.centered p {
          margin: 0 0 14px;
          font-size: .85rem;
        }
        .about.centered .note {
          opacity: .7;
          font-size: .78rem;
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .category-shell { padding: 46px 16px 80px; }
          .icon-wrap { width: 74px; height: 74px; border-radius: 24px; margin-bottom: 16px; }
          .hero-icon { font-size: 38px; }
          .about.centered { font-size: .8rem; }
        }
      `}</style>
    </Layout>
  );
}