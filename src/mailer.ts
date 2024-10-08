import nodeMailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

export async function sendEmail(discount: string) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const info = await transporter.sendMail({
    from: "Discount Finder",
    to: email,
    subject: "New MyProtein discount!",
    text: `The current MyProtein discount is ${discount}%. Go check it out at https://www.myprotein.co.il/.`,
  });

  console.log("Message sent: %s", info.messageId);
}
