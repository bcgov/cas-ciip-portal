const nodemailer = require('nodemailer');
const createWelcomeMail = require('../email_templates/welcome.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (payload, helpers) => {
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

  const message = {
    from: 'Nodemailer <example@nodemailer.com>',
    to: payload.email,
    subject: 'CleanBC',
    html: createWelcomeMail(payload)
  };

  transporter.sendMail(message, (error, info) => {
    if (error) return console.error(error);
    console.log('Message sent: %s', info.messageId);
    helpers.logger.info('Finished mail job');
  });
};
