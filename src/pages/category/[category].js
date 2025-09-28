import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";

// Dummy video data
const categoryVideos = {
  cricket: [
    { id: "video1", title: "Ind v Pak Asia Cup link 1", thumb: "/indpak.jpg" },
    { id: "video2", title: "Ind v Pak Asia Cup link 2", thumb: "/indpak.jpg" },
    { id: "video3", title: "Soon", thumb: "/sample3.pngg" },
  ],
  football: [
    { id: "video4", title: "not yet", thumb: "/sample2.pnfg" },
    { id: "video5", title: "not yet", thumb: "/sample3.png" },
  ],
  "other-live": [
    { id: "video6", title: "in future", thumb: "/sample3d.png" },
  ],
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category) return null;

  const videos = categoryVideos[category.toLowerCase()];

  if (!videos) {
    return (
      <Layout>
        <p style={{ textAlign: "center", marginTop: "100px", fontSize: "1.2rem" }}>
          🚫 Category not found
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <main
        style={{
          padding: "100px 5% 50px 5%",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Left placeholder for ads */}
        <div style={{ flex: "1", minWidth: "150px" }}></div>

        {/* Center video cards */}
        <div
          style={{
            flex: "3",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/video/${video.id}`}
              legacyBehavior
              passHref
            >
              <a className="video-card">
                <Image
                  src={video.thumb}
                  alt={video.title}
                  width={300}
                  height={180}
                />
                <div className="video-title">{video.title}</div>
              </a>
            </Link>
          ))}
        </div>

        {/* Right placeholder for ads */}
        <div style={{ flex: "1", minWidth: "150px" }}></div>

        <style jsx>{`
          .video-card {
            display: flex;
            flex-direction: column;
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
            background: linear-gradient(145deg, #ff6a88, #ffb3c1);
          }
          .video-card:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
          }
          .video-title {
            padding: 10px;
            text-align: center;
            font-weight: bold;
            color: white;
            background: rgba(0, 0, 0, 0.3);
          }

          @media (max-width: 900px) {
            main {
              flex-direction: column;
              align-items: center;
            }
            .video-card {
              width: 90%;
            }
          }
        `}</style>
      </main>
    </Layout>
  );
}
