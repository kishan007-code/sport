import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Carousel philosophy:
 * - Native horizontal scroll (scroll-snap)
 * - Auto-advance gracefully (no jump if user is mid-swipe)
 * - Progress bar at top resets each cycle
 * - Minimal DOM + easy theming via CSS vars
 */

const SLIDE_INTERVAL = 5000;

/**
 * Match schedule for status badges.
 * Use real times (ISO with timezone).
 * durationMinutes = how long it's considered LIVE.
 */
const slideSchedule = {
 
  video00: {
    startTime: "2025-10-05T05:15:00+05:45",
    durationMinutes: 120,
  },
   video9: {
    startTime: "2025-10-05T20:15:00+05:45",
    durationMinutes: 300,
  },
  video8: {
    startTime: "2025-10-04T22:15:00+05:45",
    durationMinutes: 120,
  },
  video4: {
    startTime: "2025-10-05T00:45:00+05:45",
    durationMinutes: 120,
  },
};

function computeStatus(id, now = new Date()) {
  const meta = slideSchedule[id];
  if (!meta) return "UNKNOWN";
  const start = new Date(meta.startTime);
  if (isNaN(start.getTime())) return "UNKNOWN";
  const end = new Date(start.getTime() + meta.durationMinutes * 60000);
  if (now < start) return "UPCOMING";
  if (now >= start && now < end) return "LIVE";
  return "ENDED";
}

const slides = [
  
  {
    id: "video00",
    title: "Nepal vs USA",
    tag: "#Cricket",
    img: "/nepvus.png",
    alt: "KaiseliveNEPVUS",
  },
  /*{
    id: "video9",
    title: "Afghanistan vs Bangladesh",
    tag: "#Cricket||3rd T20I",
    img: "/bang.png",
    alt: "3rd T20I",
  },*/
  {
    id: "video5",
    title: "Arsenal vs Crystal Palace",
    tag: "#PremierLeague",
    img: "/arsenal.png",
    alt: "Arsenal and Palace clash",
  },

{
    id: "video4",
    title: "Real Madrid vs Barcelona",
    tag: "#LaliGa",
    img: "/classico.png",
    alt: "ELCLASSICO game",
  },
];

export default function HeroCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  // status + viewers
  const [now, setNow] = useState(() => new Date());
  const [statuses, setStatuses] = useState({});
  const [viewCounts, setViewCounts] = useState({}); // { videoId: number }

  // Load existing view counts
  useEffect(() => {
    try {
      const raw = localStorage.getItem("carouselViewCounts");
      if (raw) {
        setViewCounts(JSON.parse(raw));
      }
    } catch (_) {}
  }, []);

  // Update statuses every 30s
  useEffect(() => {
    const update = () => {
      const n = new Date();
      setNow(n);
      const map = {};
      slides.forEach((s) => {
        map[s.id] = computeStatus(s.id, n);
      });
      setStatuses(map);
    };
    update();
    const int = setInterval(update, 30000);
    return () => clearInterval(int);
  }, []);

  const incrementView = useCallback((id) => {
    setViewCounts((prev) => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      try {
        localStorage.setItem("carouselViewCounts", JSON.stringify(next));
      } catch (_) {}
      return next;
    });
  }, []);

  const scrollToIndex = useCallback(
    (i) => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const slideWidth = track.offsetWidth;
      track.scrollTo({
        left: i * slideWidth,
        behavior: "smooth",
      });
      setIndex(i);
    },
    []
  );

  // Auto cycle
  useEffect(() => {
    if (isUserScrolling) return;
    timerRef.current = setInterval(() => {
      const next = (index + 1) % slides.length;
      scrollToIndex(next);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [index, isUserScrolling, scrollToIndex]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.animation = "none";
    // force reflow
   
    progressRef.current.offsetHeight;
    progressRef.current.style.animation = `slideProgress ${SLIDE_INTERVAL}ms linear forwards`;
  }, [index]);

  // Detect manual scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let scrollTimeout;
    const onScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
        const children = Array.from(el.children);
        const nearest = children.reduce(
          (acc, child, i) => {
            const box = child.getBoundingClientRect();
            const distance = Math.abs(box.left - el.getBoundingClientRect().left);
            return distance < acc.dist ? { dist: distance, i } : acc;
          },
          { dist: Infinity, i: 0 }
        );
        setIndex(nearest.i);
      }, 260);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero-carousel" aria-label="Featured live highlights">
      <div className="progress">
        <div ref={progressRef} className="bar" />
      </div>

      <div className="track" ref={trackRef}>
        {slides.map((s, i) => {
          const status = statuses[s.id] || "UNKNOWN";
          const views = viewCounts[s.id] || 0;

          return (
            <article
              key={s.id}
              className="slide"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <Link
                href={`/video/${s.id}`}
                className="media"
                onClick={() => incrementView(s.id)}
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1000px) 80vw, 1000px"
                  priority={i === 0}
                  style={{ objectFit: "cover" }}
                />
                <div className="layer" />

                {/* NEW: Status badge */}
                <div className={`badge badge-${status.toLowerCase()}`}>
                  {status === "LIVE" && <span className="pulse-dot" />}
                  {status}
                </div>

                {/* NEW: View count */}
                <div className="view-count">
                  {views} view{views === 1 ? "" : "s"}
                </div>

                <div className="content">
                  <span className="tag">{s.tag}</span>
                  <h3 className="title" aria-live="polite">
                    {s.title}
                  </h3>
                  <span className="cta">Watch Now →</span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <div className="index-indicator" aria-hidden="true">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-pressed={i === index}
          />
        ))}
      </div>

      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto 50px;
          aspect-ratio: 16 / 7.2;
          border-radius: 34px;
          overflow: hidden;
          background: radial-gradient(
              circle at 20% 30%,
              rgba(90, 130, 255, 0.25),
              transparent 65%
            ),
            radial-gradient(
              circle at 75% 70%,
              rgba(255, 90, 40, 0.22),
              transparent 60%
            ),
            linear-gradient(140deg, #0f141b, #121a23);
          box-shadow: 0 28px 68px -26px rgba(0, 0, 0, 0.7),
            0 6px 22px -8px rgba(0, 0, 0, 0.55);
        }

        .track {
          display: flex;
          flex-flow: row nowrap;
          height: 100%;
          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .track::-webkit-scrollbar {
          display: none;
        }

        .slide {
          position: relative;
          flex: 0 0 100%;
          height: 100%;
          scroll-snap-align: start;
        }

        .media {
          position: absolute;
          inset: 0;
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .media :global(img) {
          filter: brightness(0.85) saturate(112%);
          transition: filter 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide:hover .media :global(img) {
          filter: brightness(0.98) saturate(120%);
        }

        .layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            140deg,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.15) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          mix-blend-mode: overlay;
        }

        .content {
          position: absolute;
          left: 50%;
          top: 55%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 70%;
        }

        .tag {
          display: inline-block;
          font-size: 0.9rem;
          letter-spacing: 1.2px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.41);
          backdrop-filter: blur(6px);
          color: #000000ff;
          font-weight: bold;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          text-transform: uppercase;
        }

        .title {
          margin: 0;
          font-size: clamp(1.6rem, 4.5vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #ffffff, #d4dde6);
          -webkit-background-clip: text;
          color: #50ffe8f2;
          font-family: "Times New Roman", serif;
          text-shadow: 0 6px 38px rgba(0, 0, 0, 0.92);
        }

        .cta {
          font-size: 0.8rem;
          letter-spacing: 0.8px;
          font-weight: 600;
          font-family: Papyrus, fantasy;
          padding: 8px 16px;
          background: linear-gradient(90deg, #25776eff, #d16111ff);
          border-radius: 14px;
          color: #fff;
          display: inline-block;
          box-shadow: 0 4px 18px -6px rgba(255, 122, 30, 0.6);
          transition: transform 0.4s, box-shadow 0.5s;
        }
        .cta:hover {
          border: 2px solid #21c60cff;
        }

        /* NEW: status badge */
        .badge {
          position: absolute;
          top: 10px;
          left: 12px;
          padding: 6px 12px;
          font-size: 0.62rem;
          letter-spacing: 1px;
          font-weight: 700;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px -2px rgba(0,0,0,0.5);
        }
        .badge-live {
          background: linear-gradient(90deg,#ff3d3d,#ff7a1e);
        }
        .badge-upcoming {
          background: linear-gradient(135deg,#2653f5,#6d3df8);
        }
        .badge-ended {
          background: linear-gradient(135deg,#555,#2f3235);
        }
        .badge-unknown {
          background: rgba(0, 0, 0, 0.55);
        }
        .pulse-dot {
          position: relative;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
        }
        .pulse-dot::after {
          content: "";
          position: absolute;
            inset: 0;
          border-radius: inherit;
          background: rgba(255,255,255,0.6);
          animation: pulseBadge 1.1s infinite ease-out;
        }
        @keyframes pulseBadge {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* NEW: view count */
        .view-count {
          position: absolute;
          top: 10px;
          right: 12px;
          padding: 6px 10px;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 10px;
          background: rgba(255,255,255,0.18);
          color: #000;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 6px -2px rgba(0,0,0,0.5);
        }

        .progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: 100%;
          background: rgba(255, 250, 250, 0.89);
          z-index: 15;
        }
        .bar {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #4860ff, #ff7a1e);
          border-radius: 0 4px 4px 0;
        }

        @keyframes slideProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .index-indicator {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 16;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(182, 175, 175, 0.88);
          border: 2px solid rgba(8, 4, 4, 0.71);
          cursor: pointer;
          transition: background 0.4s, transform 0.5s, border-color 0.4s;
        }
        .dot.active {
          background: rgba(247, 4, 4, 0.83);
          border-color: transparent;
          transform: scale(1.25);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.14);
        }
        .dot:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 880px) {
          .hero-carousel {
            border-radius: 26px;
            aspect-ratio: 16 / 9;
          }
          .content {
            max-width: 80%;
            top: 58%;
          }
        }
        @media (max-width: 560px) {
          .hero-carousel {
            border-radius: 22px;
            aspect-ratio: 16 / 10;
          }
          .content {
            top: 60%;
            gap: 12px;
          }
          .title {
            font-size: clamp(1.4rem, 6.2vw, 2.15rem);
          }
          .cta {
            font-size: 0.7rem;
            padding: 7px 14px;
          }
          .badge, .view-count {
            font-size: 0.56rem;
            padding: 5px 9px;
          }
        }
      `}</style>
    </section>
  );
}