const createUrl = require('../helpers/createUrl');
const createApplicationDecisionMail = ({
  firstName,
  lastName,
  email,
  facilityName,
  operatorName,
  organisationId,
  status,
  contactEmail
}) => {
  const orgId = Buffer.from(`["organisations", ${organisationId}]`).toString(
    'base64'
  );
  const encodedOrgId = encodeURIComponent(orgId);
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
          <p>Your CIIP Application for the <strong>${facilityName}</strong> facility on behalf of <strong>${operatorName}</strong> has been ${status}.</p>
          <p>
            ${
              status === 'approved'
                ? 'No further action from you is required at this time. Your incentive payment is being processed.'
                : status === 'rejected'
                ? 'Thank you for applying to the CIIP. Unfortunately this submission did not meet program requirements and a payment cannot be granted.'
                : ''
            }
          </p>
          <p>Your application(s) can be viewed in the <a href="${createUrl(
            `reporter/facilities?organisationId=${encodedOrgId}&organisationRowId=${organisationId}`
          )}">Operation Facilities dashboard</a>.</p>
          <p>If you have any questions, please contact <a href="mailto:${contactEmail}?subject=CIIP Portal Inquiry">${contactEmail}</a></p>
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

module.exports = createApplicationDecisionMail;
