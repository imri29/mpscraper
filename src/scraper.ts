import puppeteer from "puppeteer";

export default async function scrapeDiscounts(url: string, desiredDiscount: number) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const discount = await page.evaluate(() => {
    const banner = document.querySelector(".stripBanner");
    return banner?.textContent?.trim().split(" ")[0].split("%")[0];
  });
  console.log(discount);
  if (Number(discount) >= desiredDiscount) {
    console.log(discount, desiredDiscount);
    //email me
  }

  await browser.close();
}
