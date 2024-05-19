import "dotenv/config";
import express from "express";
import scraper from "./scraper.js";

const app = express();
const port = process.env.PORT || 3000;

// Serve HTML files from the 'public' directory
app.use(express.static("public"));

// API endpoint to fetch discount
app.get("/discount", async (req, res) => {
  try {
    console.log("Endpoint hit");
    const discount = await scraper("https://www.myprotein.co.il/", "40");
    console.log({ discount });
    res.json({ discount });
  } catch (error: any) {
    console.error("Error occurred:", error.message!);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to fetch discount", details: error.message });
  }
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
