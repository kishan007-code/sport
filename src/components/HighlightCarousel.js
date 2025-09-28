import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { src: "/indpak.jpg", title: "india v pakistan" },
  { src: "/indpak.jpg", title: "india v pakistan" },
  { src: "/indpak.jpg", title: "india v pakistan" },
];

export default function HighlightCarousel() {
  const [current, setCurrent] = useState(1);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="highlight-wrapper">
      <button className="nav-btn left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="highlight-carousel">
        {slides.map((slide, index) => {
          let position = "side";
          if (index === current) position = "center";
          else if (index === (current - 1 + slides.length) % slides.length) position = "left";
          else if (index === (current + 1) % slides.length) position = "right";

          return (
            <div key={index} className={`highlight-slide ${position}`}>
              <Image src={slide.src} alt={slide.title} fill style={{ objectFit: "cover" }} />
              <div className="highlight-title">{slide.title}</div>
            </div>
          );
        })}
      </div>

      <button className="nav-btn right" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
}
