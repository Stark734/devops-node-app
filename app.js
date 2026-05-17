const express = require("express");
const app = express();

const startTime = Date.now();

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>DevOps Dashboard</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background: rgba(255, 255, 255, 0.08);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 0 25px rgba(0,0,0,0.5);
      width: 420px;
      text-align: center;
      backdrop-filter: blur(10px);
    }

    h1 {
      margin-bottom: 10px;
      font-size: 32px;
    }

    .status {
      color: #00ff88;
      font-weight: bold;
      animation: blink 1.2s infinite;
    }

    @keyframes blink {
      50% { opacity: 0.4; }
    }

    .card {
      margin-top: 20px;
      padding: 15px;
      background: rgba(0,0,0,0.3);
      border-radius: 12px;
      text-align: left;
    }

    .label {
      color: #aaa;
      font-size: 13px;
    }

    .value {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .footer {
      margin-top: 15px;
      font-size: 12px;
      color: #ccc;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>🚀 DevOps Dashboard</h1>
    <p>Status: <span class="status">RUNNING</span></p>

    <div class="card">
      <div class="label">Stage</div>
      <div class="value">Phase 1 - Node.js Service</div>

      <div class="label">Environment</div>
      <div class="value">Development</div>

      <div class="label">Port</div>
      <div class="value">3000</div>

      <div class="label">Uptime</div>
      <div class="value">${Math.floor((Date.now() - startTime) / 1000)} seconds</div>
    </div>

    <div class="footer">
      Built for Docker → Kubernetes → Jenkins Pipeline
    </div>
  </div>
</body>
</html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "devops-node-app",
    uptime: Math.floor((Date.now() - startTime) / 1000) + "s"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 DevOps App running on port ${PORT}`);
});