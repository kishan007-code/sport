import Link from "next/link";
import { useState } from "react";

/**
 * BannerAd Component (Video Version)
 * 
 * Plays a looping autoplay video instead of an image.
 */

export default function BannerAd({
  href = "mailto:contact@kaisportslive.com",
  videoSrc = "/adspace.mp4",
  alt = "Advertise with KaiSportsLive",
  label = "Advertise / Contact Us",
  height = 90,
  className = ""
}) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className={`banner-wrapper ${className}`}>
      <Link href={href} legacyBehavior>
        <a
          className="banner-link"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
        >
          {!videoError ? (
            <div className="banner-video-container">
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                onError={() => setVideoError(true)}
                className="banner-video"
              />
            </div>
          ) : (
            <div className="banner-fallback">
              <span className="fallback-text">{label}</span>
            </div>
          )}
        </a>
      </Link>

      <style jsx>{`
        .banner-wrapper {
          width: 100%;
          max-width: 920px;
          margin: 28px auto;
          position: relative;
        }

        .banner-link {
          display: block;
          position: relative;
          width: 100%;
          min-height: ${height}px;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(135deg, #1b2330, #0f1419);
          box-shadow: 0 10px 32px -12px rgba(0, 0, 0, 0.6),
            0 4px 16px -6px rgba(0, 0, 0, 0.45);
          transition: transform 0.5s cubic-bezier(0.16, 0.8, 0.24, 1),
            box-shadow 0.45s;
          text-decoration: none;
        }

        .banner-link:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px -14px rgba(0, 0, 0, 0.7),
            0 8px 24px -8px rgba(0, 0, 0, 0.5);
        }

        .banner-video-container {
          position: relative;
          width: 100%;
          height: ${height}px;
        }

        .banner-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .banner-link:hover .banner-video {
          filter: brightness(1.08);
        }

        .banner-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: ${height}px;
          background: linear-gradient(135deg, #3652f5, #6f2bd6);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.6px;
        }

        .fallback-text {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        @media (max-width: 760px) {
          .banner-wrapper {
            margin: 20px auto;
          }
          .banner-link {
            border-radius: 14px;
            min-height: ${Math.floor(height * 0.8)}px;
          }
          .banner-video-container {
            height: ${Math.floor(height * 0.8)}px;
          }
          .banner-fallback {
            min-height: ${Math.floor(height * 0.8)}px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .banner-link {
            border-radius: 12px;
            min-height: ${Math.floor(height * 0.7)}px;
          }
          .banner-video-container {
            height: ${Math.floor(height * 0.7)}px;
          }
          .banner-fallback {
            min-height: ${Math.floor(height * 0.7)}px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
