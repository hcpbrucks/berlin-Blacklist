const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔐 CONFIG
const FIVEM_API = "http://94.249.138.10:30120/berlin_check/blacklist/add";
const API_KEY = "berlin_9xA7fK2L_secure_2026";

// =========================
// 🔥 TEST ROUTE
// =========================
app.get("/", (req, res) => {
    res.send("Blacklist API läuft 🚀");
});

// =========================
// ➕ BLACKLIST ADD
// =========================
app.post("/blacklist", async (req, res) => {
    try {
        const { discordId, reason, license } = req.body;

        if (!discordId) {
            return res.json({ success: false, error: "missing_discordId" });
        }

        console.log("Incoming:", req.body);

        const response = await fetch(FIVEM_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({
                discordId,
                reason,
                license
            })
        });

        const data = await response.text();

        console.log("FiveM Response:", data);

        res.json({
            success: true,
            fivem: data
        });

    } catch (err) {
        console.error(err);
        res.json({ success: false, error: "server_error" });
    }
});

app.listen(PORT, () => {
    console.log("Server läuft auf Port", PORT);
});
