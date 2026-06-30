const axios = require('axios');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec';

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }
    
    console.log("Serverless Telemetry Received:", req.body);
    try {
        await axios.post(GOOGLE_SCRIPT_URL, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.status(200).send("SUCCESS");
    } catch (error) {
        console.error("Forwarding Error:", error.message);
        return res.status(500).send("FORWARD_ERROR");
    }
};
