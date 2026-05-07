import nodemailer from "nodemailer";

import fs from "fs";
import path from "path";

// ایجاد تنظیمات برای ایمیل
const transporter = nodemailer.createTransport({
  service: "gmail", // یا هر سرویس ایمیل دیگر که استفاده می‌کنید
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// خواندن قالب HTML از فایل
const getEmailTemplate = (data: any, mailTemplate: string) => {
  const templatePath = path.join(process.cwd(), "templates", mailTemplate);

  let template = fs.readFileSync(templatePath, "utf-8");

  // جایگزینی متغیرها در قالب
  Object.keys(data).forEach((key) => {
    const value = data[key];
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  });

  return template;
};

export const sendMail = (
  to: string | null,
  subject: string,
  data: any,
  mailTemplate: string
) => {
  const adminEmail = "m.momenzadeh1999@gmail.com";
  const html = getEmailTemplate(data, mailTemplate);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to ? to : adminEmail,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};
