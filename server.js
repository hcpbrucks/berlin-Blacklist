const express = require("express");
const fetch = require("node-fetch");

const app = express();

// JSON Middleware
app.use(express.json());

// =========================
// ⚙️ CONFIG
// =========================
const FIVEM_URL = "http://94.249.138.10:30120/berlin_check/blacklist/add";
const API_KEY = "berlin_9xA7fK2L_secure_2026";

// =========================
// 🟢 TEST ROUTE
// =========================
app.get("/", (req, res) => {
    res.send("Berlin Blacklist API läuft");
});

// =========================
// 🔴 BLACKLIST ENDPOINT
// =========================
app.post("/blacklist/add", async (req, res) => {
    try {
        console.log("📥 BOT REQUEST:", req.body);

        const { discordId, reason, license } = req.body;

        if (!discordId) {
            return res.json({ success: false, error: "missing_discordId" });
        }

        // 👉 SEND TO FIVEM
const response = await fetch(FIVEM_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "Content-Length": Buffer.byteLength(JSON.stringify({
            discordId,
            reason,
            license
        }))
    },
    body: JSON.stringify({
        discordId,
        reason,
        license
    })
});

        const text = await response.text();

        console.log("📤 FIVEM RESPONSE:", text);

        res.json({
            success: true,
            fivem: text
        });

    } catch (err) {
        console.error("❌ ERROR:", err);

        res.json({
            success: false,
            error: err.message
        });
    }
});

// =========================
// 🚀 START SERVER
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Server läuft auf Port", PORT);
});
