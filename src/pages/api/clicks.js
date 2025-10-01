// In-memory click counter (demo). Replace with real DB for persistence.
let clickCounts = {};

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ counts: clickCounts });
  }
  if (req.method === "POST") {
    try {
      const { videoId } = req.body || {};
      if (!videoId) return res.status(400).json({ error: "videoId required" });
      clickCounts[videoId] = (clickCounts[videoId] || 0) + 1;
      return res.status(200).json({ videoId, count: clickCounts[videoId] });
    } catch {
      return res.status(500).json({ error: "Failed to increment" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}