const puppeteer = require("puppeteer");

const videoLinks = [
  "https://youtu.be/RIN62T74Yow",
  "https://youtu.be/_d7dEVA73so",
  "https://youtu.be/AlksdxwSIk0"
];

(async () => {
  while (true) {
    for (const link of videoLinks) {
      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
        );

        console.log(`▶ Playing: ${link}`);
        await page.goto(link, { waitUntil: "load", timeout: 0 });

        await page.waitForTimeout(540000); // 9 mins

        await browser.close();

        const delay = 120000 + Math.floor(Math.random() * 120000);
        console.log(`⏱ Waiting ${delay / 1000} seconds before next...`);
        await new Promise((res) => setTimeout(res, delay));
      } catch (err) {
        console.error("❌ Error: ", err);
      }
    }
  }
})();
