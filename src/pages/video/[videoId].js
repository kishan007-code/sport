// src/pages/video/[videoId].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { AlignCenter, Bold } from "lucide-react";
import Image from "next/image";

const videoData = {
  video1: {
    title: "Nepal vs West Indies 2",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/SRfGzEDRlNA?si=rCDAU3atjEnLLs67", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/SRfGzEDRlNA?si=rCDAU3atjEnLLs67", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },

  video2: {
    title: "Nepal vs West Indies 3",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video3: {
    title: "Al hilal game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video4: {
    title: "Real Madrid UCL Game",
    // multiple sources for the same video - buttons switch between these
    sources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 1
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 2 (replace with your alternate)
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 3
      "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma", // link 4
    ],
  },
  video5: {
    title: "Ind v Bang",
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

  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [theaterMode, setTheaterMode] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("http://localhost:3000/video/video1");   // add the URL


  // donation state (you can fetch this from an API)
  const [amount, setAmount] = useState(13.73); // current amount e.g. 15.76$
  const goal = 1000;

  useEffect(() => {
    setSelectedSourceIndex(0);
  }, [videoId]);

  if (!videoId) return null;

  const video = videoData[videoId];
  if (!video) return <p style={{ textAlign: "center", marginTop: 60 }}>Video not found</p>;

  const currentEmbed = video.sources[selectedSourceIndex];
  const progressPercent = Math.min((amount / goal) * 100, 100).toFixed(1);

  // Replace these links with the actual payment targets you will give
  const paymentLinks = {
    esewa: "https://esewa.com.np/#/checkout?placeholder=1",
    khalti: "https://khalti.com/#/checkout?placeholder=1",
    binance: "https://www.binance.com/en/donate?placeholder=1",
  };

  return (
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

          {/* Left - Nepali panel (hidden in theater mode) */}
          <aside className={`sidePanel leftPanel ${theaterMode ? "hidden" : ""}`}>
            <h3>नेपाली सन्देश</h3>
            <p style={{ marginBottom: 10 }}>
             तपाइको सानो सहयोगले एउटा सबल विद्यार्थी जीवन निर्माणमा अमुख भूमिका खेल्दछ। 
              सहयोगी मनप्रति:     
            </p>

            <div className="progressWrap">
              <div className="progressLabel">0 - ${goal} • Currently: ${amount}</div>
              <div className="progressBar">
                <div className="progressFill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>{progressPercent}%</div>
            </div>
            
            {/* 📜 Donor List */}
            <div className="donorLink">
              <a href="/record.xlsx" target="_blank" rel="noopener noreferrer">
                📜 View Donor List
              </a>
            </div>

            <div className="payments">
              <a href={paymentLinks.esewa} target="_blank" rel="noopener noreferrer">
                <Image src="/esewa.png" alt="E-sewa" width={50}      // required
  height={50}      />
              </a>
              <a href={paymentLinks.khalti} target="_blank" rel="noopener noreferrer">
                <Image src="/kalti.png" alt="Khalti" width={50}      // required
  height={30}/>
              </a>
              <a href={paymentLinks.binance} target="_blank" rel="noopener noreferrer">
                <Image src="/binance.png" alt="Binance" width={30}      // required
  height={30}/>
              </a>
            </div>

            <div className="payText">E-sewa: +977 9762486686</div>
          </aside>




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
            <div className="videoWrap">
              <div className="videoFrame">
                <iframe
                  src={currentEmbed}
                  title={video.title}
                  allowFullScreen
                  frameBorder="0"
                />
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

            {/* When theater mode is active, English message moves below the video here.
                If theater mode is off, the right panel will show it to the right. */}
            {theaterMode && (
              <div className="englishBelow">
                <h3 style={{textAlign:"center"}}>Message in English</h3>
                <p style={{textAlign:"center"}}>
                 With bulk College fees, student life aren’t easy. even Re. 1 or $ 1 helps more than you know. Your support lights up my journey. Thank you!
                </p>

                <div className="progressWrap small">
                  <div className="progressLabel" style={{textAlign:"center"}}>0 - ${goal} • Currently: ${amount}</div>
                  <div className="progressBar">
                    <div className="progressFill" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>{progressPercent}%</div>
                </div>

                {/* 📜 Donor List */}
                <div className="donorLink">
                  <a
                    href="/record.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📜 View Donor List
                  </a>
                </div>


                <div className="payments small">
                  <a href={paymentLinks.esewa} target="_blank" rel="noopener noreferrer">
                    <Image src="/esewa.png" alt="E-sewa"  width={50}      // required
  height={50}/>
                  </a>
                  <a href={paymentLinks.khalti} target="_blank" rel="noopener noreferrer">
                    <Image src="/kalti.png" alt="Khalti"  width={30}      // required
  height={30} />
                  </a>
                  <a href={paymentLinks.binance} target="_blank" rel="noopener noreferrer">
                    <Image src="/binance.png" alt="Binance"  width={30}      // required
  height={30}/>
                  </a>
                </div>

                <div className="payText">E-sewa: +977 9762486686</div>
              </div>
            )}
          </section>

          {/* Right - English panel (hidden if theater mode is active) */}
          <aside className={`sidePanel rightPanel ${theaterMode ? "hidden" : ""}`}>
            <h3 style={{textAlign:"center"}}>Message in English</h3>
            <p>
             With bulk College fees, student life aren’t easy. Even Re. 1 or $ 1 helps more than you know. Your support lights up my journey. Thank you!
            </p>

            <div className="progressWrap">
              <div className="progressLabel">0 - ${goal} • Currently: ${amount}</div>
              <div className="progressBar">
                <div className="progressFill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>{progressPercent}%</div>
            </div>
 {/* 📜 Donor List */}
            <div className="donorLink">
              <a href="/record.xlsx" target="_blank" rel="noopener noreferrer">
                📜 View Donor List
              </a>
            </div>

            <div className="payments">
              <a href={paymentLinks.esewa} target="_blank" rel="noopener noreferrer">
                <Image src="/esewa.png" alt="E-sewa"  width={40}      // required
  height={40}/>
              </a>
              <a href={paymentLinks.khalti} target="_blank" rel="noopener noreferrer">
                <Image src="/kalti.png" alt="Khalti"  width={40}      // required
  height={30}/>
              </a>
              <a href={paymentLinks.binance} target="_blank" rel="noopener noreferrer">
                <Image src="/binance.png" alt="Binance"  width={30}      // required
  height={30}/>
              </a>
            </div>

            <div className="payText">E-sewa: +977 9762486686</div>
          </aside>
        </div>




        {/* optional small description/time area under everything */}
        <div className="metaRow" style={{textAlign: "center"}}>
          <div className="metaLeft">⏱ Live / {new Date().toLocaleString()}</div>
          <p>WAIT TILL GAME STARTS, LINKS WILL BE UPDATED</p>
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
          max-width: 1100px;
          margin: 0 auto;
        }

        .sidePanel {
          width: 250px;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          text-align: center;
         border: 2px solid currentColor; /* uses the current text color */
        }


        .leftPanel { align-self: flex-start; }
        .rightPanel { align-self: flex-start;   font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
}

        .centerPanel {
          flex: 1;
          min-width: 300px;
          
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
        .theaterBtn.active { background: #000000ff; }

        .progressWrap { margin-top: 8px; }
        .progressLabel { font-size: 14px; margin-bottom: 6px; }
        .progressBar {
          width: 100%;
          height: 10px;
          background: #3f4b5725;
          border-radius: 999px;
          overflow: hidden;
        }
          
        .progressFill {
          height: 100%;
          background: linear-gradient(90deg,#ff4d88,#ff99cc);
        }

        .payments {  
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 12px;
          align-items: center;
        }
        .payments img {
          width: 46px;
          height: 34px;
          object-fit: contain;
          cursor: pointer;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.15));
        }

        .payText { margin-top: 8px; font-weight: 600; text-align: center }

        .hidden { display: none; }

        /* small screens: stack */
        @media (max-width: 860px) {
          .container { flex-direction: column; padding: 0 12px; }
          .sidePanel { width: 100%; order: 3; }
          .rightPanel { order: 4; }
          .leftPanel { order: 2; }
          .centerPanel { order: 1; }
          .controlsRow { flex-direction: column; align-items: stretch; gap: 8px; }
          .theaterBtn { width: 100%; }
        }


        .donorLink {
          margin-top: 6px;
          text-align: center;

        }
          .englishBelow {
          margin-top: 14px;
          padding: 12px;
          border-radius: 10px;
          font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
}
        
        .donorLink a {
          font-size: 15px;
          color: #ff5e6cff;
            font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;

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
  );
}
