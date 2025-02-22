const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  // Configure your email transport using SMTP or a service like SendGrid
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ' ZenbotAssist@gmail.com',
      pass: 'ZingiBotSupportAid2025',
    },
  });

  const mailOptions = {
    from: email,
    to: ' ZenbotAssist@gmail.com',
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message', error }),
    };
  }
};
