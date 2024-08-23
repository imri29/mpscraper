import "dotenv/config";
import express from "express";
import scraper from "./scraper.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// API endpoint to fetch discount
app.get("/discount", async (req, res) => {
  try {
    console.log("Endpoint hit");
    const discount = await scraper("40");
    console.log({ discount });
    res.json({ discount });
  } catch (error: any) {
    console.error("Error occurred:", error.message!);
    console.error(error.stack);
    res.status(500).json({ error: "Failed to fetch discount", details: error.message });
  }
});

app.listen(Number(port), () => {
  console.log(`Server running on port:${port}`);
});
