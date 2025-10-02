import { useRouter } from "next/router";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";

/* --------------------------------------------------
   YouTube URL sanitizer to reduce Error 153 issues
-------------------------------------------------- */
function sanitizeYouTube(url, origin) {
  if (!url) return url;
  const YT_DOMAINS = ["youtube.com", "youtu.be", "www.youtube.com", "m.youtube.com"];
  try {
    const u = new URL(url);
    if (!YT_DOMAINS.some(d => u.hostname.includes(d))) return url;

    // Extract video id
    let videoId = "";
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.replace("/", "");
    } else if (u.pathname.startsWith("/embed/")) {
      videoId = u.pathname.split("/embed/")[1].split("/")[0];
    } else if (u.searchParams.get("v")) {
      videoId = u.searchParams.get("v");
    } else {
      // fallback attempt
      const parts = u.pathname.split("/");
      videoId = parts.pop() || "";
    }

    if (!videoId) return url; // fallback unchanged

    // Build canonical embed
    const params = new URLSearchParams({
      enablejsapi: "1",
      rel: "0",
      playsinline: "1",
      modestbranding: "1",
      autohide: "1"
    });
    if (origin) params.set("origin", origin);

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  } catch {
    return url;
  }
}

/**
 * VIDEO DEFINITIONS
 * BEFORE + AFTER: all 4 = defaultSource
 * LIVE WINDOW: all 4 = gameSources (fallback to default if missing)
 * Keep raw definitions; sanitation done at runtime.
 */
const rawVideoDefinitions = {
  video1: {
    title: "Fenerbahce vs Nice",
    startTime: "2025-10-02T22:30:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/znmw_lOWnaA?si=kh52kloywdJWItdS",
      "https://www.youtube.com/embed/znmw_lOWnaA?si=kh52kloywdJWItdS"
    ],
    tags: ["Fenerbahce", "Nice", "Football", "Europaleague", "Ronaldo"]
  },
  video2: {
    title: "Roma vs Lille",
    startTime: "2025-10-03T22:30:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/admin/ppv-arsenal-vs-olympiacos/1",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://embedsports.top/embed/admin/ppv-arsenal-vs-olympiacos/1"
    ],
    tags: ["Roma", "Football", "Lille", "Europaleague"]
  },
  video3: {
    title: "Real Betis vs Razgrad",
    startTime: "2025-10-02T22:30:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/admin/ppv-barcelona-vs-paris/1",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://embedsports.top/embed/alpha/barcelona-vs-paris-saint-germain/1",
      "ttps://embedsports.top/embed/alpha/barcelona-vs-paris-saint-germain/4"
    ],
    tags: ["Realbetis", "Europaleague", "Football"]
  },
  video4: {
    title: "Dynamo Kyiv vs Crystal Palace",
    startTime: "2025-10-02T22:30:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/admin/ppv-chelsea-vs-benfica/1",
      "https://embedsports.top/embed/alpha/chelsea-u19-vs-benfica-u19/1",
      "https://embedsports.top/embed/admin/ppv-chelsea-vs-benfica/1",
      "https://embedsports.top/embed/alpha/chelsea-u19-vs-benfica-u19/1"
    ],
    tags: ["CrystalPalace", "Live", "Football", "streamHD", "freestream", "conferenceleague"]
  },
  video5: {
    title: "Feyenoord vs Aston Villa",
    startTime: "2025-10-03T00:45:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX"
    ],
    tags: ["Astonvilla", "Feyenoord", "UCL", "Live", "Football", "streamHD", "freestream"]
  },
  video6: {
    title: "Arsenal vs Westham",
    startTime: "2025-10-04T19:45:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/admin/ppv-napoli-vs-sporting-cp/1",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://embedsports.top/embed/alpha/napoli-vs-sporting-cp/1"
    ],
    tags: ["Arsenal", "Westham", "Premierleague", "Live", "livetoday", "livematchtoday", "Football", "streamHD", "freestream"]
  },
  video7: {
    title: "Man United vs Sunderland",
    startTime: "2025-10-04T19:45:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/alpha/borussia-dortmund-vs-athletic-club/1",
      "https://www.youtube.com/embed/znmw_lOWnaA?rel=0",
      "https://www.youtube.com/embed/znmw_lOWnaA?rel=0",
      "https://embedsports.top/embed/alpha/borussia-dortmund-vs-athletic-club/1"
    ],
    tags: ["Manutd", "Sunderland", "Premierleague", "Live", "livetoday", "livematchtoday", "Football", "streamHD", "freestream" ]
  },
video8: {
    title: "Man United vs Sunderland",
    startTime: "2025-10-04T19:45:00+05:45",
    durationMinutes: 120,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://embedsports.top/embed/alpha/borussia-dortmund-vs-athletic-club/1",
      "https://www.youtube.com/embed/znmw_lOWnaA?rel=0",
      "https://www.youtube.com/embed/znmw_lOWnaA?rel=0",
      "https://embedsports.top/embed/alpha/borussia-dortmund-vs-athletic-club/1"
    ],
    tags: ["Manutd", "Sunderland", "Premierleague", "Live", "livetoday", "livematchtoday", "Football", "streamHD", "freestream" ]
  },

  video9: {
    title: "Afghanistan vs Bangladesh",
    startTime: "2025-10-02T20:45:00+05:45",
    durationMinutes: 300,
    defaultSource: "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
    gameSources: [
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX",
      "https://embedsports.top/embed/alpha/afghanistan-vs-bangladesh/2",
      "https://embedsports.top/embed/alpha/afghanistan-vs-bangladesh/1",
      "https://www.youtube.com/embed/CLCtx00Ei50?si=XRHQz8Zwvc9PLoXX"
    ],
    tags: ["Bangladesh", "Cricket", "Afghanistan", "T20I", "ICC"]
  },
};

/* ---------- STATUS HELPERS ---------- */
function computeStatus(startTime, durationMinutes, now = new Date()) {
  if (!startTime || !durationMinutes) return "UNKNOWN";
  const start = new Date(startTime);
  if (isNaN(start.getTime())) return "UNKNOWN";
  const end = new Date(start.getTime() + durationMinutes * 60000);
  if (now < start) return "UPCOMING";
  if (now >= start && now < end) return "LIVE";
  return "ENDED";
}

function formatCountdown(startTime, now = new Date()) {
  if (!startTime) return "";
  const start = new Date(startTime);
  const diff = start - now;
  if (isNaN(start.getTime())) return "";
  if (diff <= 0) return "Starting...";
  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/**
 * 4 sources logic:
 * - LIVE: gameSources (fallback each to default)
 * - Otherwise: all default
 */
function buildSources(video, status) {
  if (!video) return [];
  const def = video.defaultSource;
  if (status !== "LIVE") return [def, def, def, def];
  const gs = video.gameSources || [];
  return [0, 1, 2, 3].map(i => gs[i] || def);
}

export default function VideoPage() {
  const router = useRouter();
  const { videoId } = router.query;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [theater, setTheater] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [origin, setOrigin] = useState("");
  const loadTimeoutRef = useRef(null);

  // Tick
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Page URL + origin for YouTube
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
      setOrigin(window.location.origin);
    }
  }, [router.asPath]);

  // Get raw video
  const rawVideo = videoId ? rawVideoDefinitions[videoId] : null;

  // Sanitize video sources once origin known (keeps other providers unchanged)
  const video = useMemo(() => {
    if (!rawVideo) return null;
    const safeDefault = sanitizeYouTube(rawVideo.defaultSource, origin);
    const safeGame = (rawVideo.gameSources || []).map(src =>
      sanitizeYouTube(src, origin)
    );
    return {
      ...rawVideo,
      defaultSource: safeDefault,
      gameSources: safeGame
    };
  }, [rawVideo, origin]);

  const status = useMemo(
    () => (video ? computeStatus(video.startTime, video.durationMinutes, now) : "UNKNOWN"),
    [video, now]
  );

  const sources = useMemo(() => buildSources(video, status), [video, status]);

  // Reset selection on video/status change
  useEffect(() => {
    setSelectedIndex(0);
    setIframeError(false);
    setIframeLoaded(false);
  }, [videoId, status]);

  // Index bounds
  useEffect(() => {
    if (selectedIndex > sources.length - 1) setSelectedIndex(0);
  }, [sources, selectedIndex]);

  const currentEmbed = sources[selectedIndex] || "";

  // Theater
  useEffect(() => {
    if (theater) {
      document.body.classList.add("theater-active");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("theater-active");
      document.body.style.overflow = "";
    }
  }, [theater]);

  useEffect(() => {
    const esc = e => e.key === "Escape" && theater && setTheater(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [theater]);

  // Iframe load fallback
  useEffect(() => {
    setIframeError(false);
    setIframeLoaded(false);
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    let canceled = false;
    loadTimeoutRef.current = setTimeout(() => {
      if (!canceled) { // If iframe hasn't called onLoad yet, error out
        setIframeError(true);
      }},10000);

    return () => {
      canceled = true;
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [currentEmbed]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
  };
  const handleIframeError = () => setIframeError(true);

  const countdown = status === "UPCOMING" && video
    ? formatCountdown(video.startTime, now)
    : null;

  const liveElapsed = useMemo(() => {
    if (status !== "LIVE" || !video) return null;
    const start = new Date(video.startTime);
    if (isNaN(start.getTime())) return null;
    return `${Math.floor((now - start) / 60000)}m`;
  }, [status, video, now]);

  const shareCopy = useCallback(() => {
    if (!pageUrl) return;
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }, [pageUrl]);

  if (!videoId) {
    return (
      <Layout>
        <main style={{ padding: "140px 24px", textAlign: "center" }}>
          <p>Loading...</p>
        </main>
      </Layout>
    );
  }
  if (!video) {
    return (
      <Layout>
        <main style={{ padding: "140px 24px", textAlign: "center" }}>
          <h2>Stream Not Found</h2>
          <p>Check the URL or try another match.</p>
        </main>
      </Layout>
    );
  }

  const canonical = `https://kaisportslive.vercel.app/video/${videoId}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: video.title,
    startDate: video.startTime,
    eventStatus:
      status === "LIVE"
        ? "https://schema.org/EventInProgress"
        : status === "ENDED"
        ? "https://schema.org/EventCompleted"
        : "https://schema.org/EventScheduled",
    organizer: { "@type": "Organization", name: "KaiSportsLive" },
    description: `${video.title} status: ${status}`
  };

  return (
    <>
      <Head>
        <title>
          {video.title} {status === "LIVE" ? "| LIVE Now" : "| KaiSportsLive"}
        </title>
        <meta
          name="description"
          content={`${status === "LIVE" ? "LIVE NOW: " : ""}${video.title} stream.`}
        />
        <meta
          name="keywords"
          content={`${video.title}, ${(video.tags || []).join(", ")}, live stream, KaiSportsLive`}
        />
        <meta property="og:title" content={`${video.title} | KaiSportsLive`} />
        <meta
          property="og:description"
          content={`${status === "LIVE" ? "LIVE NOW: " : ""}${video.title}`}
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="video.other" />
        <link rel="canonical" href={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Layout>
        <main className="video-page">
          <header className="vp-header">
            <h1 className="vp-title">{video.title}</h1>
            <div className={`status-pill ${status.toLowerCase()}`}>
              {status === "UPCOMING" && (
                <>
                  <span className="dot" />
                  UPCOMING {countdown && <span className="count">{countdown}</span>}
                </>
              )}
              {status === "LIVE" && (
                <>
                  <span className="dot live" />
                  LIVE {liveElapsed && <span className="elapsed">{liveElapsed}</span>}
                </>
              )}
              {status === "ENDED" && (
                <>
                  <span className="dot ended" />
                  ENDED
                </>
              )}
            </div>
          </header>

          <div className="share-bar">
            <button className="copy-btn" onClick={shareCopy}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <input
              className="share-input"
              aria-label="Share URL"
              readOnly
              value={pageUrl}
              onFocus={e => e.target.select()}
            />
          </div>

          <div className={`player-shell ${theater ? "theater" : ""}`}>
            <div className="aspect">
              {currentEmbed ? (
                <iframe
                  key={currentEmbed}
                  src={currentEmbed}
                  title={video.title}
                  allowFullScreen
                  frameBorder="0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                />
              ) : (
                <div className="empty">No Source</div>
              )}

              {iframeError && (
                <div className="iframe-fallback">
                  <p>Stream failed to load. Try another link or reload.</p>
                  <div className="fallback-buttons">
                    <button
                      onClick={() => {
                        setIframeError(false);
                        setIframeLoaded(false);
                        setSelectedIndex((i) => (i + 1) % sources.length);
                      }}
                    >
                      Next Link
                    </button>
                    <button
                      onClick={() => {
                        setIframeError(false);
                        setIframeLoaded(false);
                        setSelectedIndex(selectedIndex); // reload same
                      }}
                    >
                      Reload
                    </button>
                  </div>
                  <small>
                    YouTube 153? Check embedding allowed, video public, no geo/age
                    restriction.
                  </small>
                </div>
              )}

              {theater && (
                <button
                  className="close-theater"
                  aria-label="Exit theater mode"
                  onClick={() => setTheater(false)}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="controls-row">
            <div className="sources" role="tablist" aria-label="Stream sources">
              {sources.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={selectedIndex === i}
                  onClick={() => {
                    setSelectedIndex(i);
                    setIframeError(false);
                    setIframeLoaded(false);
                  }}
                  className={`src-btn ${selectedIndex === i ? "active" : ""}`}
                >
                  Link {i + 1}
                </button>
              ))}
            </div>
            <button
              className={`theater-btn ${theater ? "on" : ""}`}
              onClick={() => setTheater(t => !t)}
            >
              {theater ? "Exit Theater" : "Theater Mode"}
            </button>
          </div>

          <section className="info">
            <p className="note">
              {status === "LIVE"
                ? "Make sure to try another source if the current one does not work."
                : status === "UPCOMING"
                ? "Match not live—yet."
                : "Match ended..."}
            </p>
           
           
            {/* About Section */}
        <p className="about-title"><strong>ABOUT</strong></p>
        <p>
          Stream live cricket, football, and more on <strong>Kai_shports Live</strong>. Enjoy HD sports coverage, live
          scores, and match highlights — powered by <b style={{ color: "red" }}>Kaishenborg</b>.
        </p>
        <br/> <strong>Note:</strong> Kaishports live does not host any media content on it own Site. Our site visitors might use external or third parties services to show content, We Notify all copyright owners, to discover that the links and media shared by visitors and contained within this site are hosted somewhere else on the web or embedded from other various sites like above. Contact us for any takedowns.
          </section>
        </main>

        <style jsx>{`
          .video-page {
            max-width: 860px;
            margin: 0 auto;
            padding: 90px 20px 90px;
          }
          .vp-header {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

          }
          .vp-title {
            margin: 0;
            font-size: clamp(1.5rem, 3.3vw, 2.3rem);
            font-weight: 600;
            background: linear-gradient(90deg,#ffffff,#d5dde6);
            -webkit-background-clip: text;
text-align: center;          }
          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.68rem;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 999px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(0, 0, 0, 0.8);
            letter-spacing: 0.7px;
            text-transform: uppercase;
            color: #fff;
          }
          .status-pill.live {
            background: linear-gradient(90deg,#ff3d3d,#ff7a1e);
            border: none;
          }
          .status-pill.upcoming {
            background: linear-gradient(135deg,#2653f5,#6d3df8);
            border: none;
          }
          .status-pill.ended {
            background: linear-gradient(135deg,#4a4f55,#2d3136);
            border: none;
          }
          .status-pill .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: currentColor;
            position: relative;
          }
          .status-pill.live .dot::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: rgba(30, 22, 22, 0.6);
            animation: pulse 1.1s infinite ease-out;
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            70% { transform: scale(2); opacity: 0; }
            100% { transform: scale(2); opacity: 0; }
          }

          .share-bar {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            background: rgba(62, 52, 52, 0.29);
            border: 2px solid rgba(11, 8, 8, 0.16);
            padding: 10px 14px;
            border-radius: 14px;
            margin-bottom: 16px;
            backdrop-filter: blur(10px);
          }
          .copy-btn {
            background: rgba(149, 144, 2, 0.77);
            border: 2px solid rgba(0, 0, 0, 0.61);
            font-size: 0.68rem;
            color:white;
            padding: 8px 12px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            letter-spacing: 0.5px;
          }
          .share-input {
            flex: 1;
            min-width: 200px;
            border: 2px solid rgba(8, 4, 4, 0.86);
            background: rgba(0,0,0,0.3);
            color:white;
          
            font-size: 0.7rem;
            padding: 6px 8px;
            border-radius: 8px;
          }

          .player-shell {
            position: relative;
            margin-bottom: 14px;
            transition: all 0.4s;
          }
          .player-shell.theater {
            position: fixed;
            top: 68px;
            left: 50%;
            transform: translateX(-50%);
            width: min(90vw, 1180px);
            height: calc(100vh - 120px);
            z-index: 1200;
          }
          .player-shell.theater .aspect {
            padding-bottom: 0;
            height: 100%;
          }
          body.theater-active::after {
            content: "";
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.75);
            z-index: 1100;
          }

          .aspect {
            position: relative;
            padding-bottom: 56.25%;
            background: #000;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 16px 42px -14px rgba(0,0,0,0.7);
          }
          .aspect iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .empty {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
            color: #ccc;
          }
          .iframe-fallback {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg,#111920,#15212a);
            color: #f3f6f9;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            font-size: 0.7rem;
            z-index: 10;
          }
          .fallback-buttons {
            display: flex;
            gap: 10px;
          }
          .fallback-buttons button {
            background: linear-gradient(135deg,#2653f5,#6d3df8);
            color: #cd3838ff;
            border: none;
            font-size: 0.65rem;
            font-weight: 600;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
          }

          .close-theater {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.55);
            color: #fff;
            border: none;
            font-size: 20px;
            line-height: 1;
            padding: 6px 10px;
            border-radius: 50%;
            cursor: pointer;
          }

          .controls-row {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
          }
          .sources {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .src-btn {
            background: rgba(11, 9, 9, 0.35);
            border: 2px solid rgba(11, 7, 7, 0.94);
            color: #fff;
            font-size: 0.65rem;
            padding: 8px 12px;
            font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            letter-spacing: 0.5px;
            transition: background .35s,border-color .4s;
          }
          .src-btn.active {
            background: linear-gradient(135deg,#2653f5,#6d3df8);
            border-color: black;
          }
          .src-btn:not(.active):hover {
            background: rgba(250, 20, 20, 0.88);
            border-color: rgba(18, 13, 13, 0.85);
          }
          .theater-btn {
            background: rgba(11, 123, 3, 0.81);
            border: 2px solid rgba(20, 16, 16, 0.82);
            color: #eff1f4ff;
            font-size: 0.65rem;
            padding: 8px 14px;
            border-radius: 10px;
            font-weight: 600;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: background .35s;
          }
          .theater-btn.on {
            background: linear-gradient(90deg,#ff3d3d,#ff7a1e);
            border-color: transparent;
          }

          .info {
            margin-top: 14px;
            text-align: center;
          }
          .note {
            font-size: 0.72rem;
            opacity: 0.85;
            margin: 0 0 6px;
          }
          .disc {
            font-size: 0.63rem;
            opacity: 0.55;
            margin: 0;
          }

          @media (max-width: 760px) {
            .video-page { padding: 86px 16px 80px; }
            .player-shell.theater {
              top: 60px;
              height: calc(100vh - 90px);
            }
            .share-bar { gap: 8px; }
            .share-input { flex: 1 1 100%; }
            .vp-header { flex-direction: column; align-items: flex-start; }
          }
        `}</style>
      </Layout>
    </>
  );
}