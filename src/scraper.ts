import { parseHTML } from "linkedom";
import { sendEmail } from "./mailer";

const MYPROTEIN_URL = "https://www.myprotein.co.il/";

export default async function scrapeDiscounts(desiredDiscount: string) {
  try {
    const html = await fetch(MYPROTEIN_URL).then((res) => res.text());
    const { document } = parseHTML(html);
    const banner = document.querySelector(".stripBanner");
    const discount = banner?.textContent?.trim().split(" ")[0].split("%")[0] ?? "0";

    if (discount >= desiredDiscount) {
      await sendEmail(discount);
    }

    return discount;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }
  }
}
