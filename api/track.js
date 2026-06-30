const { waitUntil } = require('@vercel/functions');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec";
  const payload = req.body;

  // Queue the background sync using native Node global fetch
  waitUntil(
    fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      console.log("Background Google Sheets sync status:", response.status);
    })
    .catch((error) => {
      console.error("Background Sync Failed:", error.message);
    })
  );

  // Send an immediate response back to the A7670C modem (Takes < 50ms)
  return res.status(200).send("SUCCESS");
};
