const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const createWelcomeMail = require('../emailTemplates/welcome.js');
const createConfirmationMail = require('../emailTemplates/confirmation.js');
const createApplicationDecisionMail = require('../emailTemplates/applicationDecision.js');
const createAmendmentMail = require('../emailTemplates/amendment.js');
const createOrganisationAccessRequestMail = require('../emailTemplates/requestForOrganisationAccess.js');
const createOrganisationAccessApprovedMail = require('../emailTemplates/organisationAccessApproved.js');
const createNotifyAdminApplicationSubmittedMail = require('../emailTemplates/notifyAdminApplicationSubmitted.js');
const createNotifyAdminAccessRequestMail = require('../emailTemplates/notifyAdminOrganisationAccess');
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const receiverEmail = `GHG Regulator <${adminEmail}>`;
const senderEmail = `CIIP Admin, BC Climate Action Secretariat <${process.env.SENDER_EMAIL}>`;

module.exports = async ({
  type,
  applicationId,
  email,
  firstName,
  lastName,
  facilityName,
  operatorName,
  organisationId,
  status,
  versionNumber
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
      htmlContent = createWelcomeMail({
        email,
        firstName,
        lastName,
        contactEmail: adminEmail
      });
      break;
    // Confirmation of CIIP Application submission
    case 'status_change_submitted':
      subject = 'CIIP Application Submission Confirmation';
      htmlContent = createConfirmationMail({
        applicationId,
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        organisationId,
        versionNumber,
        contactEmail: adminEmail
      });
      break;
    case 'status_change_approved':
      subject = 'Your CIIP Application has been approved';
      htmlContent = createApplicationDecisionMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        organisationId,
        status,
        contactEmail: adminEmail
      });
      break;
    case 'status_change_rejected':
      subject = 'Your CIIP application has been rejected';
      htmlContent = createApplicationDecisionMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        status,
        contactEmail: adminEmail
      });
      break;
    case 'status_change_requested_changes':
      subject = 'Your CIIP application: Changes requested';
      htmlContent = createAmendmentMail({
        applicationId,
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        versionNumber,
        contactEmail: adminEmail
      });
      break;
    case 'request_for_organisation_access':
      subject = 'CIIP Application: Organisation Access Requested';
      htmlContent = createOrganisationAccessRequestMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        contactEmail: adminEmail
      });
      break;
    case 'organisation_access_approved':
      subject = 'CIIP Application: Organisation Access Approved';
      htmlContent = createOrganisationAccessApprovedMail({
        email,
        firstName,
        lastName,
        operatorName,
        organisationId,
        contactEmail: adminEmail
      });
      break;
    case 'notify_admin_submitted':
      subject = 'CIIP Application Submission';
      htmlContent = createNotifyAdminApplicationSubmittedMail({
        applicationId,
        facilityName,
        operatorName
      });
      email = receiverEmail;
      break;
    case 'notify_admin_organisation_access':
      subject = 'CIIP Organisation Access Request';
      htmlContent = createNotifyAdminAccessRequestMail({
        firstName,
        lastName,
        operatorName
      });
      email = receiverEmail;
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
    from: senderEmail,
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
