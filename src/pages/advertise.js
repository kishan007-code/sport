import Link from "next/link";
import Image from "next/image";

export default function AdvertisePage() {
  return (
    <section className="advertise-section">
      {/* ---------- Header / Home Button ---------- */}
      <div className="top-nav">
        <Link href="/" legacyBehavior>
          <a className="home-logo">
<Image
                src="/kbergwhite2.png"
                alt="Logo"
                className="logo"
                width={170}
                height={32}
                priority
              />          </a>
        </Link>
        <h1 className="page-title">📢 Advertise With Us</h1>
      </div>

      {/* ---------- Intro ---------- */}
      <div className="advertise-container">
        <p className="intro-text">
          Want to showcase your brand in front of thousands of passionate sports fans?  
          KaiSports Live offers high-impact advertising opportunities for businesses, sponsors, and creators.  
          📈 Lets grow together!
        </p>

        {/* ---------- Why Advertise ---------- */}
        <div className="advertise-block">
          <h2>🌟 Why Advertise With Us?</h2>
          <ul>
            <li>🧑‍🤝‍🧑 <strong>Engaged Audience</strong> — Sports fans actively seeking live match previews & updates.</li>
            <li>📍 <strong>Strategic Placements</strong> — Your ads appear in prime positions across high-traffic pages.</li>
            <li>🚀 <strong>Early Advantage</strong> — Partner with us now as our reach grows rapidly.</li>
          </ul>
        </div>

        {/* ---------- Ad Spaces Table ---------- */}
        <div className="advertise-block">
          <h2>📐 Available Ad Spaces</h2>
          <table>
            <thead>
              <tr>
                <th>Placement</th>
                <th>Size (px)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🏔 Top Banner (Header)</td>
                <td>728 × 90</td>
                <td>Visible on all pages — perfect for branding</td>
              </tr>
              <tr>
                <td>📰 In-Content Block</td>
                <td>300 × 250</td>
                <td>Blends inside content for high engagement</td>
              </tr>
              <tr>
                <td>🧭 Sidebar Panel</td>
                <td>300 × 600</td>
                <td>Great for vertical creatives and offers</td>
              </tr>
              <tr>
                <td>📱 Mobile Sticky Footer</td>
                <td>320 × 50</td>
                <td>Optimized for mobile devices</td>
              </tr>
            </tbody>
          </table>
          <p className="note">
            💡 *Custom ad sizes may be accepted if they fit the layout. Contact us to discuss!*
          </p>
        </div>

        {/* ---------- Restrictions ---------- */}
        <div className="advertise-block">
          <h2>🚫 Ads We Do NOT Accept</h2>
          <ul className="no-ads">
            <li>❌ Malware, illegal, or misleading content</li>
            <li>❌ Intrusive flashing or autoplay audio ads</li>
          </ul>
        </div>

        {/* ---------- Contact ---------- */}
        <div className="advertise-block contact-section">
          <h2>✉️ Interested?</h2>
          <p>
            Email us at <a href="mailto:joshijona119@gmail.com" className="email-link">joshijona119@gmail.com </a>  
             with your ad creative, preferred placement, and campaign duration.  
            We’ll respond with pricing and availability.
          </p>
        </div>
      </div>

      {/* ---------- Styling ---------- */}
      <style jsx>{`
        .advertise-section {
          background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
          color: #f1f5f9;
          min-height: 100vh;
          padding: 30px 20px 60px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .top-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 30px;
        }

        .home-logo img {
          width: 160px;
          height: auto;
          filter: drop-shadow(0 0 6px rgba(0,0,0,0.6));
          transition: transform .25s;
        }

        .home-logo:hover img {
          transform: scale(1.08);
        }

        .page-title {
          font-size: 2.1rem;
          font-weight: bold;
          color: #00b4d8;
          text-align: center;
        }

        .advertise-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .intro-text {
          text-align: center;
          font-size: 1.1rem;
          line-height: 1.6;
          color: #e2e8f0;
          margin-bottom: 28px;
        }

        .advertise-block {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px -10px rgba(0,0,0,0.6);
        }

        .advertise-block h2 {
          color: #38bdf8;
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        ul {
          padding-left: 18px;
          line-height: 1.5;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }

        th, td {
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px;
          text-align: left;
        }

        th {
          background: rgba(255,255,255,0.08);
          color: #facc15;
        }

        .note {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        .no-ads li {
          color: #f87171;
          font-weight: 500;
        }

        .email-link {
          color: #facc15;
          font-weight: 600;
          text-decoration: none;
        }

        .email-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .page-title { font-size: 1.7rem; }
          th, td { font-size: 0.9rem; }
        }
      `}</style>
    </section>
  );
}
