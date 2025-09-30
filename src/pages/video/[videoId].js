// src/pages/video/[videoId].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { AlignCenter, Bold } from "lucide-react";
import Image from "next/image";
import Head from "next/head";

const videoData = {
  video1: {
    title: "Nepal vs West Indies 3",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://www.youtube.com/embed/xeY2X-1tAQM?si=4g4HyhhATCP_9mvq", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/xeY2X-1tAQM?si=4g4HyhhATCP_9mvq", // link 4
    ],
  },

  video2: {
    title: "Real Madrid UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://embedsports.top/embed/admin/ppv-kairat-almaty-vs-real-madrid/1", // link 2 (replace with your alternate)
      "https://embedsports.top/embed/alpha/kairat-almaty-vs-real-madrid/1", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video3: {
    title: "Atletico UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://embedsports.top/embed/admin/ppv-atleti-vs-frankfurt/1", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://embedsports.top/embed/charlie/atletico-madrid-vs-eintracht-frankfurt-1451040/1", // link 4
    ],
  },
  video4: {
    title: "Chelsea UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://embedsports.top/embed/admin/ppv-chelsea-vs-benfica/1", // link 1
      "https://embedsports.top/embed/alpha/chelsea-u19-vs-benfica-u19/1", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video5: {
    title: "Liverpool UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://embedsports.top/embed/admin/ppv-galatasaray-vs-liverpool/1", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://embedsports.top/embed/alpha/galatasaray-u19-vs-liverpool-u19/2", // link 4
    ],
  },
  video6: {
    title: "Inter Milan UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://embedsports.top/embed/alpha/internazionale-vs-slavia-prague/2", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://embedsports.top/embed/alpha/internazionale-vs-slavia-prague/1", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video7: {
    title: "Bayern Munich UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  // add other videoId entries as needed
};
export default function VideoPage() {
    const router = useRouter();
  const { videoId } = router.query;

   const matchTitle = "Live sports streaming";
  const team1 = "Football Match live today";
  const team2 = "Barcelona Live";
  const categoryName = "World cup || UCL";

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");   // add the URL

useEffect(() => {
  if (typeof window !== "undefined") {
    setCurrentUrl(window.location.href);
  }
}, [router.asPath]);



useEffect(() => {
  if (theaterMode) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [theaterMode]);

useEffect(() => {
  if (theaterMode) {
    document.body.classList.add("theater-active");
  } else {
    document.body.classList.remove("theater-active");
  }
}, [theaterMode]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && theaterMode) {
      setTheaterMode(false);
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [theaterMode]);



  useEffect(() => {
    setSelectedSourceIndex(0);
  }, [videoId]);

  if (!videoId) return null;

  const video = videoData[videoId];
  if (!video) return <p style={{ textAlign: "center", marginTop: 60 }}>Video not found</p>;

  const currentEmbed = video.sources[selectedSourceIndex];


  return (
  <>    
  <Head>
        <title>{`${matchTitle} | KaiSportsLive`}</title>
        <meta
          name="description"
          content={`Watch ${team1} vs ${team2} live in HD. ${categoryName} streaming,  Cricket, Nepal cricket, world cup, Champions league only at KaiSportsLive.`}
        />
        <meta
          name="keywords"
          content={`${matchTitle}, ${team1} vs ${team2} live, ${categoryName} stream, Unity Cup 2025, HD live sports`}
        />
        <meta property="og:title" content={`${matchTitle} | KaiSportsLive`} />
        <meta
          property="og:description"
          content={`Live streaming of ${team1} vs ${team2}. Watch in HD now on KaiSportsLive.`}
        />
        <meta
          property="og:url"
          content={`https://kaisportslive.vercel.app/video/${videoId}`}
        />
        <meta property="og:type" content="video.other" />
      </Head>

  <Layout>
      <main style={{ paddingTop: 80, paddingBottom: 50, minHeight: "85vh" }}>

        {/* Social Join Buttons Section */}
<div className="social-join-container">
  <a
    href="https://t.me/kai_se7en"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn telegram"
    aria-label="Join us on Telegram"
  >
    <Image src="/telegram.png" alt="Telegram" className="social-icon" width={728}      // required
  height={90}      />
    <span>Telegram</span>
  </a>

  <a
    href="https://discord.gg/YOUR_INVITE"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn discord"
    aria-label="Join us on Discord"
  >
    <Image src="/discord.png" alt="Discord" className="social-icon"
    width={728}      // required
  height={90}      // required
   />
    <span>Discord</span>
  </a>

  <a
    href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
    target="_blank"
    rel="noopener noreferrer"
    className="social-btn whatsapp"
    aria-label="Join us on WhatsApp"
  >
    <Image src="/whasap.png" alt="WhatsApp" className="social-icon" width={728}      // required
  height={90} />
    <span>WhatsApp</span>
  </a>
</div>

        <h1 style={{ textAlign: "center", marginBottom: 18, color: "#ff0050" }}>{video.title}</h1>

        <div className="container">

          

          {/* Center */}
          <section className="centerPanel">

            {/* 🔗 Share Bar */}
            <div className="shareBar">
              <span className="shareLabel">🔗 Share:</span>
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="shareInput"
                onFocus={(e) => e.target.select()}
              />
              <a
                className="shareIcon"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              >
                <Image src="/fb.png" alt="Facebook" width={30}      // required
  height={30}/>
              </a>
              <a
                className="shareIcon"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
              >
                <Image src="/whasap.png" alt="WhatsApp"  width={30}      // required
  height={30}/>
              </a>
            </div>

            {/*VIDEO BAR*/}
            <div className={`videoWrap ${theaterMode ? "theater" : ""}`}>
  <div className="videoFrame">
    <iframe
      src={currentEmbed}
      title={video.title}
      allowFullScreen
      frameBorder="0"
    />
    {theaterMode && (
  <button 
    className="closeTheaterBtn" 
    onClick={() => setTheaterMode(false)}
    aria-label="Exit theater mode"
  >
    ✕
  </button>
)}

  </div>
</div>


            {/* controls row: source buttons + theater toggle */}
            <div className="controlsRow">
              <div className="sourceButtons" role="tablist" aria-label="Video Sources">
                {video.sources.map((_, idx) => (
                  <button
                    key={idx}
                    className={`sourceBtn ${selectedSourceIndex === idx ? "active" : ""}`}
                    onClick={() => setSelectedSourceIndex(idx)}
                    aria-pressed={selectedSourceIndex === idx}
                  >
                    Link {idx + 1}
                  </button>
                ))}
              </div>

              <div className="rightControls">
                <button
                  className={`theaterBtn ${theaterMode ? "active" : ""}`}
                  onClick={() => setTheaterMode((s) => !s)}
                  aria-pressed={theaterMode}
                >
                  {theaterMode ? "Exit Theater" : "Theater Mode"}
                </button>
              </div>
            </div>

           
          </section>

          
        </div>




        {/* optional small description/time area under everything */}
        <div className="metaRow" style={{textAlign: "center"}}>
          <div className="metaLeft">⏱ Live / {new Date().toLocaleString()}</div>
          <p>WAIT TILL GAME STARTS, LINKS WILL BE UPDATED<br/> Check another link if current link is not working..</p>
          <div className="metaRight">❤️ Thank you for your visit /\ share if you like ^_^</div>
        </div>
      </main>

      <p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold', }}><strong >ABOUT</strong></p><p>Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live scores, and match highlights — powered by <a href="https://www.facebook.com/profile.php?id=61577032744088">Kaishenborg</a>. Watch your favorite teams in action now!</p>
<p style={{textAlign:"center", fontFamily:'Segoe UI', fontWeight:'bold', }}><strong >Keywords</strong><br/></p>
<p> 
Live sports streaming, Watch cricket live, Football live stream, crichd Live sports, Free sports streaming, ESPN live matches, Live scores and highlights, HD sports stream, Cricket match today, Football fixtures live, Stream EPL, Stream Premier League, Kaishen Live cricket and football
</p>

      <style jsx>{`
        .container {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 0 18px;
          max-width: 800px;
          margin: 0 auto;
        }

        .centerPanel {
          flex: 1;
          min-width: 300px;
          
        }

.videoWrap.theater {
  position: fixed;
  top: 80px; /* below your header */
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: 60vh;
  background: #000;
  padding: 0;
  border-radius: 0;
  box-shadow: 0 0 18px rgba(0,0,0,0.7);
  transition: all 0.35s ease;
}

.videoWrap.theater .videoFrame {
  padding-bottom: 0;
  height: 100%;
}

.videoWrap.theater iframe {
  width: 100%;
  height: 100%;
}
body.theater-active::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 80vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 9998;
  transition: background 0.3s ease;
}
  .videoWrap,
.videoWrap.theater {
  transition: all 0.5s ease;
}




.closeTheaterBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  font-size: 24px;
  line-height: 1;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10000;
  backdrop-filter: blur(5px);
  transition: background 0.2s;
}

.closeTheaterBtn:hover {
  background: rgba(0,0,0,0.8);
}

@media (max-width: 768px) {
  .closeTheaterBtn {
    font-size: 20px;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
  }
}



        .videoWrap {
          background: linear-gradient(180deg, #0f172a, #111827);
          padding: 6px;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(147, 32, 32, 0.35);
          
        }

        .videoFrame {
          position: relative;
          padding-bottom: 56.25%;
          border-radius: 10px;
          overflow: hidden;
        }
        .videoFrame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .controlsRow {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .sourceButtons { display: flex; gap: 8px; flex-wrap: wrap; }
        .sourceBtn {
          background: #ffffff84;
          border: 1px solid #240000ff;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: #000000ff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
        }


        .sourceBtn.active { background: linear-gradient(90deg, #f692b0ff, #6ae088ff, #9078b2ff); color: #041e55ff; border: none; }

        .theaterBtn {
          background: #041e55ff;
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
        .theaterBtn.active { background: #000000ff;
        }
        .shareBar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          background: #f9fafb;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .shareInput {
          flex: 1;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-size: 13px;
        }
        .shareIcon img {
          width: 28px;
          height: 28px;
        }
         .metaRow {
  max-width: 1200px;
  margin: 18px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px 20px;
  flex-wrap: wrap; /* optional for responsiveness */
}

.metaLeft,
.metaRight {
  flex: 1;
  text-align: left;
}

.metaRight {
  text-align: right;
}

.metaRow p {
  flex: 2;
  text-align: center;
  margin: 0;
}
          
        /* hide left panel in theater mode already handled by 'hidden' class, but ensure animation is clean on mobile */
      `}</style>
    </Layout>
  </>
  );
}
