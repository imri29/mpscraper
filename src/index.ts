import 'dotenv/config';
import express from 'express';
import scraper from './scraper.js';

const app = express();
const port = 3000;

// Serve HTML files from the 'public' directory
app.use(express.static('public'));

// API endpoint to fetch discount
app.get('/discount', async (req, res) => {
  try {
    const discount = await scraper("https://www.myprotein.co.il/", "40");
    console.log({ discount })
    res.json({ discount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discount' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
