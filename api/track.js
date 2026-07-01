const { waitUntil } = require('@vercel/functions');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec";
  
  // Accept raw strings or messy streams effortlessly
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.log("Raw string detected, forwarding as-is.");
    }
  }

  // 1. Queue the Google Sheets forwarding task in Vercel's background lifecycle
  waitUntil(
    fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      console.log("Background Google Sheets sync completed:", response.status);
    })
    .catch((error) => {
      console.error("Background Sync Failed:", error.message);
    })
  );

  // 2. Respond immediately to the A7670C module (Takes < 50ms)
  return res.status(200).send("SUCCESS");
};
