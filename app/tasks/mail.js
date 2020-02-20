const nodemailer = require('nodemailer');

module.exports = async (payload, helpers) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_IO_PASS,
      pass: process.env.MAIL_IO_PASS
    }
  });

  transporter.verify(error => {
    if (error) console.error(error);
    else console.log('transporter verified');
  });

  const message = {
    from: 'Nodemailer <example@nodemailer.com>',
    to: 'Nodemailer <example@nodemailer.com>',
    subject: 'Test2',
    text: `Yo, this is some mail for ${payload.name}`,
    html: '<h1>Test test test</h1>'
  };

  transporter.sendMail(message, (error, info) => {
    if (error) return console.error(error);
    console.log('Message sent: %s', info.messageId);
    helpers.logger.info('Finished mail job');
  });
};
