const createUrl = require('../helpers/createUrl');
const createOrganisationAccessRequestMail = ({
  email,
  firstName,
  lastName,
  operatorName,
  contactEmail
}) => {
  return `
    <table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
      <tr>
        <td style="padding: 40px 0 30px 0; " align="center">
          <h2 style="text-decoration: underline">Province of British Columbia</h2>
          <h3>Clean BC Industrial Incentive Program</h3>
        </td>
      </tr>
      <tr style="border-top: 0px">
        <td style="padding: 20px 10px 30px 10px;" >
          <h3>Hello, ${firstName} ${lastName}.</h3>
          <h4>Thank you for registering for the CleanBC Industrial Incentive Program.</h4>
          <p>You have requested access to submit an application on behalf of <a href="${createUrl(
            'reporter'
          )}"><strong>${operatorName}</strong></a>.</p>
          <p>Your request is being processed. Please be advised that if you are not listed as the Operation Representative for GHG reporting, confirmation that you are authorized to complete this application will be sought from that representative.</p>
          <p>You will be notified once your request for access has been approved.</p>
          <p>If you have any questions during the application process, please contact <a href="mailto:${contactEmail}?subject=CIIP Portal Inquiry">${contactEmail}</a></p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 10px 30px 10px;">
        <p>Sent to: ${email}</p>
        <p>On behalf of the Climate Action Secretariat &amp; the CleanBC Industrial Incentive Program</p></td>
      </tr>
    </table>
  `;
};

module.exports = createOrganisationAccessRequestMail;
