import Link from "next/link";
import Image from "next/image";

export default function BannerAd({
  href = "mailto:abcdefg@gmail.com",
  imgSrc = "/banner.png",
  alt = "Advertise with us",
  height = 110,
  label = "Advertise / Contact",
  showFrame = true
}) {
  return (
    <div className="banner-wrapper">
      <Link href={href} legacyBehavior>
        <a className="banner-click" aria-label={label}>
          <div className={`frame ${showFrame ? "with-frame" : ""}`}>
            <Image
              src={imgSrc}
              alt={alt}
              width={1320}
              height={height}
              className="banner-img"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.parentElement?.querySelector(".fallback");
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="fallback">
              <span>{label}</span>
            </div>
          </div>
        </a>
      </Link>

      <style jsx>{`
        .banner-wrapper {
          width: 100%;
          max-width: 980px;
          margin: 34px auto 38px;
        }
        .banner-click {
            display: block;
            text-decoration: none;
        }

        .frame {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          min-height: ${height}px;
          background: linear-gradient(135deg,#1b2330,#121820);
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          box-shadow: 0 12px 38px -18px rgba(0,0,0,.75),
            0 4px 16px -6px rgba(0,0,0,.55);
          transition: transform .55s cubic-bezier(.16,.8,.24,1),
            box-shadow .55s, background .6s;
        }
        .with-frame::before {
          content:'';
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: linear-gradient(120deg,#466bff,#ff784e,#8d3dff);
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: .55;
          transition: opacity .5s;
          pointer-events: none;
        }
        .frame:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px -16px rgba(0,0,0,.85),
            0 8px 22px -8px rgba(0,0,0,.55);
        }
        .frame:hover::before { opacity: .9; }

        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .fallback {
          display: none;
          flex: 1;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          letter-spacing: .6px;
          font-size: .9rem;
          background: linear-gradient(135deg,#3652f5,#6f2bd6);
          color: #fff;
        }
        @media (max-width: 640px) {
          .banner-wrapper { margin: 26px auto 30px; }
          .frame { border-radius: 18px; min-height: 90px; }
        }
      `}</style>
    </div>
  );
}