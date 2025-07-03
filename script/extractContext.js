import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const PAGES = ["/"];

async function extractPageContent(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const sections = await page.evaluate(() => {
    const extractText = (element, selector) =>
      Array.from(element.querySelectorAll(selector))
        .map((el) => el.innerText.trim())
        .filter((text) => text.length > 0); 

    return Array.from(document.querySelectorAll("section, div"))
      .map((section, index) => {
        return {
          id: `section-${index + 1}`,
          title: extractText(section, "h1, h2, h4").join(" "), 
          content: extractText(section, "p").join(" "), 
        };
      })
      .filter((section) => section.title || section.content); 
  });

  await browser.close();
  return { title: url, sections };
}

async function generateSearchIndex() {
  const baseURL = "http://localhost:3001"; 
  let searchIndex = [];

  for (const slug of PAGES) {
    const url = `${baseURL}${slug}`;
    console.log(`Extracting content from: ${url}`);

    try {
      const { title, sections } = await extractPageContent(url);
      searchIndex.push({ slug, title, sections });
    } catch (error) {
      console.error(`Failed to extract ${url}:`, error);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), "public", "assets", "searchIndex.json"),

    JSON.stringify(searchIndex, null, 2)
  );

  console.log("✅ Search index updated successfully!");
}

generateSearchIndex();
