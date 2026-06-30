export default async function handler(req, res) {
  if (req.method === 'POST') {
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw7oNRowuoZAwXYw9-F_dpiRc9BATNtR02jKsEaFDTklcvE8qHCcnrJGVwSU2f4gOs/exec";

    // 1. INSTANT RESPONSE: Fire an immediate 200 OK back to the A7670C to close the cellular connection loop
    res.status(200).send("SUCCESS");

    // 2. BACKGROUND PROCESSING: Forward data to Google Sheets independently
    try {
        await fetch(googleScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        console.log("Background transfer to Google Sheets completed.");
    } catch (error) {
        console.error("Background Google Sheet Forwarding Error:", error.message);
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
