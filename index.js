const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Paste your original Google Apps Script Macro URL deployment string here:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec';

app.post('/api/track', async (req, res) => {
    console.log("Telemetry Received:", req.body);
    try {
        // Proxy forwards data to Google Sheets via modern HTTPS TLS 1.3
        const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.status(200).send("SUCCESS");
    } catch (error) {
        console.error("Forwarding Error:", error.message);
        return res.status(500).send("FORWARD_ERROR");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
