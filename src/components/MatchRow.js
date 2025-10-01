import Link from "next/link";

export default function MatchRow({
  match,
  status,
  countdown,
  displayTime,
  elapsedMinutes,
  clickCount,
  onClick
}) {
  return (
    <li className={`match-row ${status.toLowerCase()}`}>
      <Link href={`/video/${match.id}`} legacyBehavior prefetch={false}>
        <a
          className="row-click"
          onClick={() => onClick(match.id)}
          aria-label={`${match.title} ${match.subtitle || ""}`}
        >
          <div className="left">
            <div className="title">
              {match.title}
              {match.subtitle && <span className="sub"> • {match.subtitle}</span>}
            </div>
          </div>

          <div className="center">
            {status === "UPCOMING" && (
              <span className="pill upcoming">
                {countdown
                  ? countdown
                  : displayTime.startsWith("Starts in")
                  ? displayTime
                  : displayTime}
              </span>
            )}
            {status === "LIVE" && (
              <span className="pill live">
                LIVE <span className="dot" /> {elapsedMinutes}’
              </span>
            )}
            {status === "ENDED" && <span className="pill ended">ENDED</span>}
          </div>

          <div className="right">
            <span className="clicks">({clickCount || 0})</span>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .match-row {
          list-style: none;
          border-radius: 16px;
          background: var(--row-bg);
           background: linear-gradient(
              135deg,
              rgba(37, 148, 7, 0.34),
              rgba(255,255,255,0.015)
            ),
            rgba(235, 81, 81, 0.12);

          backdrop-filter: blur(20px) saturate(150%);
          border: 3px solid ;
          transition: background .35s, border-color .5s;
        }
        .match-row + .match-row { margin-top: 14px; }
        .match-row:hover {
          background: var(--row-bg-hover);
          border-color: var(--row-border-hover);
        }

        .row-click:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: 14px;
}

        .row-click {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px 14px 20px;
          text-decoration: none;
          color: var(--row-text);
          transition: color .35s;
        }

        .left { flex: 1; min-width: 0; }
        .title {
          font-weight: 600;
          letter-spacing: .35px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sub {
          font-weight: 500;
          opacity: 1;
          font-size: .9rem;
          color: var(--row-subtext);
        }

        .center {
          min-width: 124px;
          display: flex;
          justify-content: center;
        }
        .right {
          min-width: 54px;
          text-align: right;
          font-size: .72rem;
          font-weight: 600;
          opacity: .8;
          color: var(--row-subtext);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: .63rem;
          font-weight: 700;
          letter-spacing: .6px;
          text-transform: uppercase;
          background: #222; /* default fallback */
          color: var(--status-pill-text);
        }
        .pill.live {
          background: var(--status-live-grad);
          box-shadow: 0 0 0 1px rgba(255,90,36,0.35),
            0 4px 12px -2px rgba(255,70,30,.55);
        }
        .pill.upcoming {
          background: var(--status-upcoming-grad);
        }
        .pill.ended {
          background: var(--status-ended-grad);
        }

        .dot {
          width: 7px;
          height: 7px;
          background: #fff;
          border-radius: 50%;
          position: relative;
        }
        .dot::after {
          content:'';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: pulse 1.2s infinite ease-out;
          background: rgba(255,255,255,0.6);
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(2); opacity: 0; }
        }

        @media (max-width: 640px) {
          .row-click { padding: 13px 14px; font-size: .82rem; }
          .center { min-width: 100px; }
          .pill { font-size: .55rem; padding: 4px 9px; }
          .right { min-width: 46px; }
        }
      `}</style>
    </li>
  );
}