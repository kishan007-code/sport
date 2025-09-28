// src/pages/video/[videoId].js
//watch NOTEEEEE update it...
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

const videoData = {
  video1: { title: "Ind v Pak Asia cup link 1", src: "/indpak.jpg", embedUrl: "https://embedsports.top/embed/alpha/asia-cup-t20-final-india-vs-pakistan/1" },
  video2: { title: "Ind v Pak Asia cup link 2", src: "/sample2.png", embedUrl: "https://embedsports.top/embed/echo/asia-cup-final-india-vs-pakistan-cricket-787894/2" },
  video3: { title: "aww man", src: "/sample3.png", embedUrl: "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma" },
  video4: { title: "not yet", src: "/sample2.png", embedUrl: "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma" },
  video5: { title: "not yet", src: "/sample3.png", embedUrl: "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma" },
  video6: { title: "Special", src: "/sample3.png", embedUrl: "https://www.youtube.com/embed/CLCtx00Ei50?si=f12UZb2o7eIfayma" },
};


export default function VideoPage() {
  const router = useRouter();
  const { videoId } = router.query;
   const { id } = router.query;

  const [amount, setAmount] = useState(5.45); // Example donation progress
  const goal = 1000;

  if (!videoId) return null;

  const video = videoData[videoId];

  if (!video) return <p>Video not found</p>;

  const progressPercent = Math.min((amount / goal) * 100, 100);

  return (
    
    <main style={{ paddingTop: "80px", paddingBottom: "50px", minHeight: "90vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#ff0050" }}>
        {video.title}
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {/* Left Message - Nepali */}
        <div style={{ flex: "1", minWidth: "250px", padding: "10px" }}>
          <h3>नेपाली सन्देश</h3>
          <p>
           गर्नुहोस्। 
          </p> 
          
        </div> 

        {/* Center Video */}
        <div style={{ flex: "2", minWidth: "300px", position: "relative" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={video.embedUrl}
              title={video.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              }}
              allowFullScreen
            />
          </div>
        </div>

        {/* Right Message - English */}
        <div style={{ flex: "1", minWidth: "250px", padding: "10px" }}>
          <h3>Message in English</h3>
          <p>
            goal. 
          </p>
          
        </div>
      </div>
      <Layout>
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>🎬 Now Playing: {id}</h1>
        <p>Here the video player and description will go...</p>
      </div>
    </Layout>
    </main>
    
  );
}

const donateBtnStyle = {
  background: "linear-gradient(135deg, #ff4d88, #ff99cc)",
  border: "none",
  borderRadius: "10px",
  padding: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
};

