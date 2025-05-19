async function main() {
  const CRON_URL = process.env.CRON_URL;

  if (!CRON_URL) {
    throw new Error("CRON_URL is not set");
  }

  try {
    const response = await fetch(CRON_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response body:", data);
  } catch (err) {
    console.error("Error during cron job:", err);
    process.exit(1); // Important for CI tools
  }
}

main().finally(() => {
  process.exit(0);
});
