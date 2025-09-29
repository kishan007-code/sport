import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Clickable Highlight Carousel
 * - Slides array below contains `id`, `src`, `title`.
 * - Clicking a slide navigates to /video/{id}
 * - The center slide index starts at 1 so the second item is center on load.
 */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

const slides = [
  { id: "video1", src: "/nepwin.svg", title: "" },
  { id: "video3", src: "/hilal.svg", title: "Asian CL" }, // your requested slide
  { id: "video4", src: "/madrid.svg", title: "UCL" },
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
      <button className="nav-btn left" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>

      <div className="highlight-carousel">
        {slides.map((slide, index) => {
          let position = "side";
          if (index === current) position = "center";
          else if (index === (current - 1 + slides.length) % slides.length) position = "left";
          else if (index === (current + 1) % slides.length) position = "right";

          return (
            <Link
              key={slide.id}
              href={`/video/${slide.id}`}
              className={`highlight-slide ${position}`}
            >
              <div className="slide-inner">
                {/* Image uses fill — parent (.slide-inner) is position:relative in CSS */}
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === current}
                />
                <div className="highlight-title">{slide.title}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <button className="nav-btn right" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>
    </section>
  );
}
