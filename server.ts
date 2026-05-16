import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON
  app.use(express.json());

  // API Route: Get Indian Election Meta Data
  app.get("/api/election-meta", (req, res) => {
    res.json({
      country: "India",
      nextElection: "Lok Sabha 2024 (General Elections)",
      authority: "Election Commission of India (ECI)",
      portals: [
        { name: "NVSP", url: "https://www.nvsp.in/" },
        { name: "Voter Portal", url: "https://voters.eci.gov.in/" }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VoterLab Server running on http://localhost:${PORT}`);
  });
}

startServer();
