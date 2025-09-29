// src/components/Footer.js
export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="quick-links">
            <strong className="quick-title">Social Media Links</strong>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=61577032744088" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/fb.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/kai.se7en/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/insta.png" alt="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@kai7berg" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <img src="/tktk.png" alt="TikTok" />
              </a>
            </div>
          </div>

          <div>
            <strong>Get in Touch</strong>
            <br /> xxxxxxx
            <br /> joshijona119@gmail.com
            <br /> Brussels, Belgium
          </div>

          <div>
            <strong>Chief Executive Officer</strong>
            <br /> Kai_7
            <br /><br />
          </div>
        </div>

        <div className="footer-bottom">
          ©2026 kaisenberg
        </div>
      </footer>
     

      <style jsx>{`
        
/* ================= FOOTER ================= */
.footer {
  background: #040029;
  color: rgb(255, 255, 255);
  padding: 20px 6%;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
position: relative;
}

.footer-columns {
  display: flex;
    gap: 100px;
  line-height: 1.7;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;

}
@media (max-width: 700px) {
  .footer-columns {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    text-align: center;
  }
}
.footer-bottom {
  text-align: center;
  margin-top: 20px;
  opacity: 0.7;
  position: relative;
align-items: center;
}


.quick-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.quick-title {
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #fff;
  font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
}

.social-icons {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.social-icons a {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1a1a1a;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.social-icons a img {
  width: 22px;
  height: 22px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.social-icons a:hover {
  transform: translateY(-4px) scale(1.15);
  background: linear-gradient(135deg, #ff0050, #ff6600);
  box-shadow: 0 6px 20px rgba(255, 0, 80, 0.4);
}

.social-icons a:hover img {
  transform: rotate(-10deg) scale(1.1);
  filter: brightness(1) invert(0);
}


/* Mobile tweaks */
@media (max-width: 600px) {
  .social-icons {
    gap: 12px;
  }

  .social-icons a {
    width: 32px;
    height: 32px;
  }

  .social-icons a img {
    width: 18px;
    height: 18px;
  }
}

      `}</style>
      </div>
  );
}
