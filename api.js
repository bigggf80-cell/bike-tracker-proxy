import { waitUntil } from '@vercel/functions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec";
  const payload = req.body;

  // 1. Queue the Google Sheets forwarding task in Vercel's background lifecycle
  waitUntil(
    fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async (response) => {
      console.log("Background Google Sheets sync completed with status:", response.status);
    })
    .catch((error) => {
      console.error("Background Google Sheets sync failed:", error.message);
    })
  );

  // 2. Respond immediately to the A7670C module (Takes < 100ms)
  return res.status(200).send("SUCCESS");
}
