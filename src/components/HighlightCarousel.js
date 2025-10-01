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

const slides = [
  {
    id: "video1",
    title: "Al Nassr Game",
    tag: "#ACL",
    img: "/nassr.png",
    alt: "Al Nassr",
  },
  {
    id: "video3",
    title: "Barcelona vs PSG",
    tag: "#UCL",
    img: "/bvp.png",
    alt: "Barca vs PSG",
  },
  {
    id: "video4",
    title: "Man City vs Monaco",
    tag: "#UCL",
    img: "/city.png",
    alt: "Man city game",
  },
];

export default function HeroCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const scrollToIndex = useCallback(
  (i) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const slideWidth = track.offsetWidth; // full width of one slide
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
    // Restart animation by forcing reflow
    progressRef.current.style.animation = "none";
   
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
        // Snap index recompute
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
        {slides.map((s, i) => (
          <article
            key={s.id}
            className="slide"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <Link href={`/video/${s.id}`} className="media">
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(max-width: 600px) 90vw, (max-width: 1000px) 80vw, 1000px"
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
              <div className="layer" />
              <div className="content">
                <span className="tag">{s.tag}</span>
                <h3 className="title" aria-live="polite">
                  {s.title}
                </h3>
                <span className="cta">Watch Now →</span>
              </div>
            </Link>
          </article>
        ))}
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
          background:
            linear-gradient(
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
          color: white;
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
        }
      `}</style>
    </section>
  );
}