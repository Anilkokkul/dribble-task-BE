const nodemailer = require("nodemailer");

exports.sendEmail = async (email) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "anilkokkul8076@gmail.com",
        pass: process.env.PASS,
      },
    });

    let mailoptions = {
      from: "Anil Kokkul <anilkokkul@gmail.com>",
      to: email,
      subject: `Your account has been created`,
      html: `<!DOCTYPE html>
      <html>
      <body>
      <h1 style=" text-align:center; margin-top:50px; font-family:'Rubik';">Thank you for submitting your information</h1>
      <p style="text-align:center;">We have received your data and it has been successfully stored in our database.</p>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailoptions);
    return true;
  } catch (error) {
    console.log("Error while sending email: Internal Server Error", error);
    return false;
  }
};
