const nodemailer = require('nodemailer');
const createWelcomeMail = require('../email_templates/welcome.js');
const createConfirmationMail = require('../email_templates/filingConfirmation.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async ({
  type,
  email,
  firstName,
  lastName,
  facilityName,
  operatorName
}) => {
  console.log(type);
  const transporter = nodemailer.createTransport(
    process.env.SMTP_CONNECTION_STRING,
    {
      port: 2525
    }
  );

  transporter.verify(error => {
    if (error) console.error(error);
    else console.log('transporter verified');
  });

  let htmlContent;
  switch (type) {
    case 'welcome':
      htmlContent = createWelcomeMail({email, firstName, lastName});
      break;
    case 'status_change_submitted':
      htmlContent = createConfirmationMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName
      });
      break;
    default:
      htmlContent = null;
  }

  if (htmlContent === null) {
    return console.error(
      'Invalid message type, no message could be generated. Email not sent'
    );
  }

  console.log(htmlContent);

  const message = {
    from: 'Nodemailer <example@nodemailer.com>',
    to: email,
    subject: 'CIIP Welcome mail',
    html: htmlContent
  };

  console.log(message);

  // Transporter.sendMail(message, (error, info) => {
  //   if (error) return console.error(error);
  //   console.log('Message sent: %s', info.messageId);
  // });
};
