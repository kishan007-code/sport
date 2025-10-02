import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="cols">
          <div className="block">
            <strong className="block-title">Social Media</strong>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61577032744088" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Image src="/fb.png" alt="Facebook" width={30} height={30}/>
              </a>
              <a href="https://www.instagram.com/kai.se7en/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Image src="/insta.png" alt="Instagram" width={30} height={30}/>
              </a>
              <a href="https://www.tiktok.com/@kai7berg" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Image src="/tktk.png" alt="TikTok" width={30} height={30}/>
              </a>
            </div>
          </div>

          <div className="block">
            <strong className="block-title">Get in Touch</strong>
            <p className="mini">
              xxxxxxx<br />
              joshijona119@gmail.com<br />
              Brussels, Belgium
            </p>
          </div>

          <div className="block">
            <strong className="block-title">Chief Executive Officer</strong>
            <p className="mini">Kai_7</p>
          </div>
        </div>

        <div className="divider" aria-hidden="true" />
        <div className="foot-note">
          ©2026 kaisenberg
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(160deg,#040029,#070435 60%,#06002f);
          color: #ffffff;
          padding: 14px 3% 5px;
          font-family: 'Segoe UI', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content:'';
          position: absolute;
          top:-140px;
          right:-120px;
          width:380px;
          height:380px;
          background: radial-gradient(circle,#5a5dff22,#0000);
          filter: blur(4px);
          opacity:.65;
          pointer-events:none;
        }
        .footer-inner {
          max-width: 1060px;
          margin: 0 auto;
          position: relative;
        }
        .cols {
          display: flex;
          justify-content: center;
          gap: clamp(40px, 10vw, 140px);
          flex-wrap: wrap;
          text-align: center;
        }
        .block-title {
          font-size: 1.05rem;
          display: block;
          margin-bottom: 12px;
          letter-spacing: .6px;
        }
        .mini {
          margin: 0;
          line-height: 1.6;
          font-size: .82rem;
          opacity: .85;
        }
        .social-icons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .social-icons a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .4s, background .45s, box-shadow .45s;
          box-shadow: 0 4px 14px -6px rgba(0,0,0,.55);
        }
        .social-icons a:hover {
          transform: translateY(-6px) scale(1.12);
          background: linear-gradient(135deg,#ff0050,#ff9900);
          box-shadow: 0 8px 24px -8px rgba(255,0,80,.55);
        }
        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg,transparent,#ffffff33,transparent);
          margin: 40px 0 24px;
        }
        .foot-note {
          text-align: center;
          font-size: .75rem;
          letter-spacing: .8px;
          opacity: .75;
        }
        @media (max-width: 680px) {
          .footer { padding: 12px 0px 16px; }
          .social-icons { gap: 14px; }
          .social-icons a { width: 36px; height: 36px; }
        }
      `}</style>
    </footer>
  );
}