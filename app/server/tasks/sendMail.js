const nodemailer = require('nodemailer');
const createWelcomeMail = require('../emailTemplates/welcome.js');
const createConfirmationMail = require('../emailTemplates/confirmation.js');
const createApplicationDecisionMail = require('../emailTemplates/applicationDecision.js');
const createAmendmentMail = require('../emailTemplates/amendment.js');
const createCertificationRequestMail = require('../emailTemplates/certificationRequest.js');
const createSignedByCertifierMail = require('../emailTemplates/signedByCertifier.js');
const createRecertificationRequestMail = require('../emailTemplates/recertificationRequest.js');
const createOrganisationAccessRequestMail = require('../emailTemplates/requestForOrganisationAccess.js');
const createOrganisationAccessApprovedMail = require('../emailTemplates/organisationAccessApproved.js');
const createNotifyAdminApplicationSubmittedMail = require('../emailTemplates/notifyAdminApplicationSubmitted.js');
const createNotifyAdminAccessRequestMail = require('../emailTemplates/notifyAdminOrganisationAccess');
const createDraftApplicationStartedMail = require('../emailTemplates/draftApplicationStarted');
const getEmailShortForm = require('../helpers/getEmailShortForm');
const dotenv = require('dotenv');
dotenv.config();

const ADMIN_EMAIL_SHORT = getEmailShortForm(process.env.ADMIN_EMAIL);

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
  reporterEmail,
  certifierFirstName,
  certifierLastName,
  certifierEmail,
  certifierUrl,
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
        contactEmail: ADMIN_EMAIL_SHORT
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
        versionNumber
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
        contactEmail: ADMIN_EMAIL_SHORT
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
        contactEmail: ADMIN_EMAIL_SHORT
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
        contactEmail: ADMIN_EMAIL_SHORT
      });
      break;
    // Request for certification
    case 'certification_request':
      subject = 'CIIP Application Certification Request';
      htmlContent = createCertificationRequestMail({
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        reporterEmail,
        certifierUrl,
        contactEmail: ADMIN_EMAIL_SHORT
      });
      break;
    // Certifier signs application
    case 'signed_by_certifier':
      subject = 'CIIP Application Certified';
      htmlContent = createSignedByCertifierMail({
        applicationId,
        versionNumber,
        email,
        firstName,
        lastName,
        facilityName,
        operatorName,
        certifierEmail,
        certifierFirstName,
        certifierLastName,
        contactEmail: ADMIN_EMAIL_SHORT
      });
      break;
    // Request for recertification (data changed)
    case 'recertification':
      subject = 'CIIP Application recertification request';
      htmlContent = createRecertificationRequestMail({
        applicationId,
        email,
        firstName,
        lastName,
        facilityName,
        operatorName
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
        contactEmail: ADMIN_EMAIL_SHORT
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
        contactEmail: ADMIN_EMAIL_SHORT
      });
      break;
    case 'notify_admin_submitted':
      subject = 'CIIP Application Submission';
      htmlContent = createNotifyAdminApplicationSubmittedMail({
        applicationId,
        facilityName,
        operatorName,
        versionNumber
      });
      email = process.env.ADMIN_EMAIL;
      break;
    case 'notify_admin_organisation_access':
      subject = 'CIIP Organisation Access Request';
      htmlContent = createNotifyAdminAccessRequestMail({
        firstName,
        lastName,
        operatorName
      });
      email = process.env.ADMIN_EMAIL;
      break;
    case 'draft_application_started':
      subject = 'CIIP Draft Application Started';
      htmlContent = createDraftApplicationStartedMail({
        applicationId,
        firstName,
        lastName,
        email,
        operatorName,
        facilityName,
        contactEmail: ADMIN_EMAIL_SHORT
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
