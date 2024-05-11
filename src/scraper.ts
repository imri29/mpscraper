import puppeteer from "puppeteer";
import { sendEmail } from "./mailer";

export default async function scrapeDiscounts(url: string, desiredDiscount: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const discount = await page.evaluate(() => {
    const banner = document.querySelector(".stripBanner");
    console.log(banner, banner?.textContent);
    return banner?.textContent?.trim().split(" ")[0].split("%")[0] ?? "0";
  });

  if (discount >= desiredDiscount) {
    await sendEmail(discount);
  }

  await browser.close();

  return discount;
}
