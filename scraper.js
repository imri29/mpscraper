import { parseHTML } from "linkedom";
import { sendEmail } from './mailer.js';
const MYPROTEIN_URL = "https://www.myprotein.co.il/";
const percentGroupRegex = /(\d+)%/;
export default async function scrapeDiscounts(desiredDiscount) {
    try {
        const html = await fetch(MYPROTEIN_URL).then((res) => res.text());
        const { document } = parseHTML(html);
        const banner = document.querySelector(".stripBanner");
        const textContainingDiscount = banner?.textContent?.trim();
        const match = textContainingDiscount?.match(percentGroupRegex);
        const [_, discount] = match ?? [];
        if (discount && discount >= desiredDiscount) {
            await sendEmail(discount);
        }
        return discount;
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return error.message;
        }
    }
}
