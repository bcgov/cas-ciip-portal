const nodemailer = require('nodemailer');
const createWelcomeMail = require('../emailTemplates/welcome.js');
const createConfirmationMail = require('../emailTemplates/confirmation.js');
const createAmendmentMail = require('../emailTemplates/amendment.js');
const createCertificationRequestMail = require('../emailTemplates/certificationRequest.js');
const createSignedByCertifierMail = require('../emailTemplates/signedByCertifier.js');
const createRecertificationRequestMail = require('../emailTemplates/recertificationRequest.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async ({
  type,
  email,
  firstName,
  lastName,
  facilityName,
  operatorName,
  status,
  reporterEmail,
  certifierFirstName,
  certifierLastName,
  certifierUrl,
  certifierEmail
}) => {
  if (!process.env.SMTP_CONNECTION_STRING && !process.env.NO_MAIL)
    throw new Error('SMTP connection string is undefined');
  const transporter = nodemailer.createTransport(
    process.env.SMTP_CONNECTION_STRING
  );

  if (!process.env.NO_MAIL) {
    transporter.verify((error) => {
      if (error) console.error(error);
      else console.log('transporter verified');
    });
  }

  let subject;
  let htmlContent;
  switch (type) {
    // New CIIP user welcome
    case 'welcome':
      subject = 'Welcome to CIIP';
      htmlContent = createWelcomeMail({email, firstName, lastName});
      break;
    // Confirmation of CIIP Application submission
    case 'status_change_submitted':
      subject = 'CIIP Application Submission Confirmation';
      htmlContent = createConfirmationMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName
      });
      break;
    // Notice of amendment to CIIP Application submission
    case 'status_change_other':
      subject = 'Your CIIP Application status has changed';
      htmlContent = createAmendmentMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        status
      });
      break;
    // Request for certification
    case 'certification_request':
      subject = 'CIIP application certification request';
      htmlContent = createCertificationRequestMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        reporterEmail,
        certifierUrl,
        host: process.env.HOST
      });
      break;
    // Certifier signs application
    case 'signed_by_certifier':
      subject = 'CIIP application certified';
      htmlContent = createSignedByCertifierMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        certifierEmail,
        certifierFirstName,
        certifierLastName
      });
      break;
    // Request for recertification (data changed)
    case 'recertification':
      subject = 'CIIP Application recertification request';
      htmlContent = createRecertificationRequestMail({
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

  const message = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject,
    html: htmlContent
  };
  if (process.env.NO_MAIL) {
    return console.log(
      'NO_MAIL flag is set.\nsendMail Job was sent successfully but no email was sent'
    );
  }

  await transporter.sendMail(message, (error, info) => {
    if (error) return console.error(error);
    console.log('Message sent: %s', info.messageId);
  });
};
