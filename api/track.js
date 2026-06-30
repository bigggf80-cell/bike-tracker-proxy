const { waitUntil } = require('@vercel/functions');

module.exports = async (req, res) => {
  // Allow all request types to bypass Vercel's automated header guards
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec";
  
  // Safe Body Parsing: Handle raw strings, object objects, or broken text streams cleanly
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.log("Raw string payload detected, sending raw.");
    }
  }

  // Instantly unlock the A7670C modem serial pipeline in <50ms
  res.status(200).send("SUCCESS");

  // Fire background sync loop safely inside Vercel's lifecycle queue
  waitUntil(
    fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then((response) => console.log("Google Sheets forward status:", response.status))
    .catch((error) => console.error("Google Sync Failed:", error.message))
  );
};
