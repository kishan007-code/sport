// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <strong>Quick Link</strong>
          <br /> Ministry of Education
          <br /> University Grants Commission
        </div>
        <div>
          <strong>Get in Touch</strong>
          <br /> +977-099-520729
          <br /> info@fwu.edu.np
          <br /> Mahendranagar, Nepal
        </div>
        <div>
          <strong>Information Officer</strong>
          <br /> Nabin Bahadur Bam
          <br /> 9863031168
          <br /> nabin420807@fwu.edu.np
        </div>
      </div>
      <div className="footer-bottom">©2020 Far Western University</div>

      <style jsx>{`
        .footer {
          background: linear-gradient(90deg, #222, #000);
          color: white;
          padding: 20px;
          margin-top: 50px;
        }
        .footer-columns {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 1200px;
          margin: auto;
        }
        .footer-bottom {
          text-align: center;
          margin-top: 15px;
          border-top: 1px solid #444;
          padding-top: 10px;
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  );
}
