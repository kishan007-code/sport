import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* ---------- Header with Logo ---------- */}
      <header className="contact-header">
        <Link href="/" legacyBehavior>
          <a className="home-link" aria-label="Go Home">
            <Image
              src="/kbergwhite2.png"
              alt="KaiSportsLive Logo"
              width={150}
              height={30}
              priority
            />
          </a>
        </Link>
      </header>

      {/* ---------- Main Content ---------- */}
      <main className="contact-content">
        <h1>Contact Us</h1>
        <p>We appreciate your interest in KaiSportsLive! If you have any inquiries, feedback, or concerns, feel free to reach out to us.</p>

        <section>
          <h2>📌 <u>General Inquiries</u></h2>
          <p>
            For general questions, suggestions, or issues related to our website, please contact us at:<br />
            <strong>
              <a href="mailto:kaisportslive@gmail.com">kaisportslive@gmail.com</a>
            </strong>
          </p>
        </section>

        <section>
          <h2>📝 <u>Copyright Concerns</u></h2>
          <p>
            If you have copyright concerns regarding any embedded content on our website, please check the embed link from the page’s source code and contact the original hosting platform directly.
          </p>
        </section>

        <section>
          <h2>🛠 <u>Technical Support</u></h2>
          <p>
            Experiencing technical issues with the website? Reach out to us via email, and we will do our best to assist you.
          </p>
        </section>

        <section>
          <h2>🌐 <u>Stay Connected</u></h2>
          <p>
            Stay updated with the latest sports streaming schedules and links by contacting us through email. We strive to provide you with the best service possible!
          </p>
        </section>
        <div className="divider" aria-hidden="true" />
        <div className="foot-note">
          ©2026 kaisenberg
        </div>
      
      </main>

      {/* ---------- Styles ---------- */}
      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: rgba(210, 211, 213, 0.84);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .contact-header {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          background: rgba(20, 24, 32, 0.65);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .home-link {
          display: inline-flex;
          align-items: center;
          transition: transform 0.25s ease;
        }

        .home-link:hover {
          transform: scale(1.1);
        }

        .contact-content {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px 60px;
          text-align: left;
        }

        h1 {
          font-size: 2rem;
          color: #028849ff;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        h2 {
          font-size: 1.3rem;
          color: #b82b2bff;
          margin-top: 1.5rem;
        }

        p {
          line-height: 1.6;
          font-size: 1rem;
          margin-top: 0.4rem;
        }

        a {
          color: #000000ff;
          text-decoration: underline;
        }

        a:hover {
          color: #ff0000ff;
        }

 .divider {
          width: 100%;
          height: 1px;
          margin: 40px 0 24px;
        }
        .foot-note {
          text-align: center;
          font-size: .75rem;
          letter-spacing: .8px;
        }
        @media (max-width: 680px) {
          .footer { padding: 12px 0px 16px; }
          .social-icons { gap: 14px; }
          .social-icons a { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
}
