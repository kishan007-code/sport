import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";


// 📝 Enhanced dummy data with more details
const categoryVideos = {
  cricket: [
    {
      id: "video1",
      title: "Nepal vs WIndies, 3rd T20I",
      subtitle: "Unity Cup 2025",
      thumb: "/nepwin2.svg",
      time: "2025-09-30T20:15:00+05:45",
      isLive: false,
    },
    
    
  ],
  football: [
    {
  id: "video2",
  title: "Kairat Almaty vs Real Madrid",
  subtitle: "UCL Group Stage",
  thumb: "/madrid.png",
  time: "2025-09-30T22:30:00+05:45",  // ✅ Nepal time
  isLive: false,
},

    {
      id: "video3",
      title: "Atletico Madrid vs Frankfurt",
      subtitle: "UCL Group Stage",
      thumb: "/atleti.png",
      time: "2025-10-01T00:45:00+05:45",
      isLive: false,
    },
{
      id: "video4",
      title: "Chelsea vs Benfica",
      subtitle: "UCL Group Stage",
      thumb: "/chelsea.png",
      time: "2025-10-01T00:45:00+05:45",
      isLive: false,
    },
{
      id: "video5",
      title: "Liverpool vs Galatasaray",
      subtitle: "UCL Group Stage",
      thumb: "/livpool.png",
      time: "2025-10-01T00:45:00+05:45",
      isLive: false,
    },
{
      id: "video6",
      title: "Inter Milan vs Slavia Prague",
      subtitle: "UCL Group Stage",
      thumb: "/inter.png",
      time: "2025-10-01T00:45:00+05:45",
      isLive: false,
    },

{
      id: "video6",
      title: "Bayern Munchen vs Pafos FC",
      subtitle: "UCL Group Stage",
      thumb: "/bayern.png",
      time: "2025-10-01T00:45:00+05:45",
      isLive: false,
    },

  ],
};

export default function CategoryPage() {

  const router = useRouter();
  const { category } = router.query;

    const [clickCounts, setClickCounts] = useState({});

 // Load click counts from localStorage
  useEffect(() => {
        if (!category) return;
    const storedCounts = localStorage.getItem(`clickCounts_${category}`);
    if (storedCounts) setClickCounts(JSON.parse(storedCounts));
  }, [category]);

 if (!category) return null;
   const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);


 const videos = categoryVideos[category.toLowerCase()];

  // Handler to track video clicks
  const handleVideoClick = (videoId) => {
    setClickCounts(prev => {
      const newCounts = { ...prev, [videoId]: (prev[videoId] || 0) + 1 };
      localStorage.setItem(`clickCounts_${category}`, JSON.stringify(newCounts));
      return newCounts;
    });
  };



  if (!videos) {
    return (
    
      <Layout>
        <div className="not-found">
          <div className="error-icon">⚠️</div>
          <h2>Category not found</h2>
          <p>The sports category you are looking for does not exist.</p>
          <Link href="/">
            <button className="back-btn">Go Back Home</button>
          </Link>
        </div>
        <style jsx>{`
          .not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 70vh;
            text-align: center;
            padding: 20px;
          }
          .error-icon {
            font-size: 4rem;
            margin-bottom: 20px;
          }
          .not-found h2 {
            color: #333;
            margin-bottom: 10px;
          }
          .not-found p {
            color: #666;
            margin-bottom: 30px;
          }
          .back-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .back-btn:hover {
            transform: translateY(-2px);
          }
        `}</style>
      </Layout>
    );
  }

  const formatLocalTime = (utcString) => {
    try {
      const date = new Date(utcString);
      const now = new Date();
      const diffInHours = (date - now) / (1000 * 60 * 60);
      
      // If within 24 hours, show relative time
      if (diffInHours > 0 && diffInHours < 24) {
        if (diffInHours < 1) {
          return `Starts in ${Math.floor(diffInHours * 60)} minutes`;
        }
        return `Starts in ${Math.floor(diffInHours)} hours`;
      }
      
      return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      return "TBA";
    }
  };

  const getCategoryEmoji = (cat) => {
    const emojis = {
      cricket: "🏏",
      football: "⚽",
      basketball: "🏀",
      tennis: "🎾",
    };
    return emojis[cat.toLowerCase()] || "🏆";
  };

  return (
<>
 <Head>
    <title>{`${categoryTitle} Live | KaiSportsLive`}</title>
    <meta
      name="description"
      content={`Watch ${categoryTitle} live streams in HD. KaiSportsLive brings you fast & free sports streaming, previews & highlights.`}
    />
    <meta
      name="keywords"
      content={`${categoryTitle} live, ${categoryTitle} streaming, ${categoryTitle} matches HD, KaiSportsLive, watch sports online`}
    />
    <meta property="og:title" content={`${categoryTitle} Live | KaiSportsLive`} />
    <meta
      property="og:description"
      content={`Watch ${categoryTitle} matches live in HD. Join KaiSportsLive for free sports streaming & updates.`}
    />
    <meta
      property="og:url"
      content={`https://kaisportslive.vercel.app/category/${category}`}
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://kaisportslive.vercel.app/sitepreview.png" />
  </Head>
    <Layout>
      <main className="category-main">
                {/* Social Join Buttons Section */}
<div className="social-join-container">
  <a
    href="https://t.me/kai_se7en"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn telegram"
    aria-label="Join us on Telegram"
  >
    <Image src="/telegram.png" alt="Telegram" className="social-icon" width={30} height={30}/>
    <span>Telegram</span>
  </a>

  <a
    href="https://discord.gg/YOUR_INVITE"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn discord"
    aria-label="Join us on Discord"
  >
    <Image src="/discord.png" alt="Discord" className="social-icon" width={30} height={30} />
    <span>Discord</span>
  </a>

  <a
    href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn whatsapp"
    aria-label="Join us on WhatsApp"
  >
    <Image src="/whasap.png" alt="WhatsApp" className="social-icon" width={30} height={30}/>
    <span>WhatsApp</span>
  </a>
</div>
        
        <div className="category-banner top">
  <Image
    src="/banner.png"
    alt="Top Banner"
    width={728} height={90}
    style={{ width: "100%", maxWidth: "728px", display: "block", margin: "20px auto", marginBottom:120 }}
    onError={(e)=>{e.target.src="/api/placeholder/280/160";}}
  />
</div>

{/* Category Header */}
        <div className="category-header">
          <h1 className="category-title" >
            <span className="emoji">{getCategoryEmoji(category)}</span>
            {category.charAt(0).toUpperCase() + category.slice(1)} Streams
          </h1>
          <p className="category-subtitle">Watch live matches and highlights</p>
        </div>

        
        {/* ====== Video Grid ====== */}
        <div className="video-grid">
          {videos.map((video) => {
  const matchTime = new Date(video.time);
  const now = new Date();
  const isEnded = !video.isLive && now > matchTime;  // ✅ ended condition

  return (
    <Link key={video.id} href={`/video/${video.id}`} legacyBehavior>
      <a className="video-card">
        {video.isLive && <div className="live-badge">● LIVE</div>}
        {isEnded && <div className="ended-badge">ENDED</div>}  {/* 👈 new badge */}

        <div className="thumb-container">
          <Image
            src={video.thumb}
            alt={video.title}
            width={280}
            height={160}
            className="thumb-img"
            onError={(e) => {
              e.target.src = "/api/placeholder/280/160";
            }}
          />
          <div className="video-overlay">
            <span className="play-icon">▶</span>
          </div>
        </div>

        <div className="video-info">
          <h3 className="video-title">{video.title}</h3>
          {video.subtitle && <p className="video-subtitle">{video.subtitle}</p>}
          <div className="video-meta">
            <span className="video-time">{formatLocalTime(video.time)}</span>
            {video.viewers && <span className="video-viewers">👁 {video.viewers}</span>}
          </div>
        </div>
      </a>
    </Link>
  );
})}

        </div>

{/* ====== BOTTOM BANNER IMAGE ====== */}
<div className="category-banner bottom">
  <Image
    src="/banner.png"
    alt="Bottom Banner"
    width={728} height={90}
    style={{ width: "100%", maxWidth: "728px", display: "block", margin: "20px auto" }}
  />
</div>
 
<p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold', }}><strong >ABOUT</strong><br/></p><p>Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live scores, and match highlights — powered by <a href="https://www.facebook.com/profile.php?id=61577032744088">Kaishenborg</a>. Watch your favorite teams in action now!</p>
<p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold', }}><strong >Popular Searches</strong><br/></p>
<p> 
Live sports streaming, Watch cricket live, Football live stream, crichd Live sports, Free sports streaming, ESPN live matches, Live scores and highlights, HD sports stream, Cricket match today, Football fixtures live, Stream EPL, Stream Premier League, Kaishen Live cricket and footbal
live sports streaming, watch cricket online, football HD streams, free sports coverage, Premier League live, cricket match today, UCL streaming, La Liga live.
</p>      

<p style={{textAlign:"center", fontFamily:'Segoe UI'}}><strong>Note:</strong> Kaishports live doesn't host any media content on it own Site. Our site visitors might use external or third parties services to show content, We Notify all copyright owners, to discover that the links and media shared by visitors and contained within this site are hosted somewhere else on the web or embedded from other various sites like above. <br/> Contact us for any takedowns.</p>
      </main>

      <style jsx>{`

       .click-count { font-size: 0.75rem; color: #888; margin-left: 5px; }
        .category-main {
          padding: 50px 5% 50px;
          min-height: 80vh;
          position: relative;
        }

        .category-main::before {
          content: '';
          position: absolute;
          top: 10;
          left: 10;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(4, 0, 255, 0.3), transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(139, 90%, 24%, 0.40), transparent 100%),
            radial-gradient(circle at 40% 40%, rgba(212, 22, 22, 0.3), transparent 40%);
          pointer-events: none;
        }

        .category-header {
          text-align: center;
          margin-bottom: 0px;
          position: relative;
        }

        .category-title {
          font-size: 2rem;
          font-weight: 200;
       text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
       margin: -10; /* Remove default margin */
  display: flex;
  flex-direction:column;
  align-items: center;
  gap: 0; 
          text-align: center;
        }

        .emoji {
          font-size: 3rem;
          animation: bounce 1s infinite;
          margin-bottom: -20; /* Remove extra space below emoji */
  line-height: 1;   
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .category-subtitle {
          font-size: 1rem;
            font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;

        }

      
.ended-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #444;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}




        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          display: block;
        }

        .video-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }

        .live-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #ff0000;
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 2;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .thumb-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 160px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-card:hover .thumb-img {
          transform: scale(1.1);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .video-overlay {
          opacity: 1;
        }

        .play-icon {
          font-size: 3rem;
          color: white;
          background: rgba(255,255,255,0.2);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .video-info {
          padding: 20px;
        }

        .video-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0 0 8px 0;
                 text-align: center;

          }

        .video-subtitle {
          font-size: 0.9rem;
          margin: 0 0 12px 0;
          text-align: center;
        }

        .video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .video-time {
          color: #181818ff;
        }

        .video-viewers {
          color: #081f88ff;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .category-title {
            font-size: 2rem;
          }
          
          .video-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 20px;
          }
          
          .thumb-container {
            height: 100px;
          }
          
          .play-icon {
            font-size: 2rem;
            width: 50px;
            height: 50px;
          }

          .banner-ad {
            margin: 0 10px 30px;
            padding: 15px;
          }

          .ad-content {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .ad-text {
            align-items: center;
            text-align: center;
          }

          .ad-icon {
            font-size: 2rem;
          }

          .ad-text strong {
            font-size: 1rem;
          }

          .ad-text span {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </Layout>
    </>
  );
}
