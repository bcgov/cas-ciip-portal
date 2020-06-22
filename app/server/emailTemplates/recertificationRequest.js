const createUrl = require('../helpers/createUrl');
const createRecertificationRequestMail = ({
  applicationId,
  email,
  firstName,
  lastName,
  facilityName,
  operatorName,
  contactEmail
}) => {
  const appId = Buffer.from(`["applications", ${applicationId}]`).toString(
    'base64'
  );
  const applicationURL = createUrl(
    `reporter/application?applicationId=${encodeURIComponent(
      appId
    )}&version=1&confirmationPage=true`
  );
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
          <h3>Hello, <strong>${firstName} ${lastName}</strong>.</h3>
          <h4>Your CIIP Application has changed and must be certified again.</h4>
          <h4>Application Details:</h4>
          <p>Operator: ${operatorName}</p>
          <p>Facility: ${facilityName}</p>
          <p>
            Your Certifying Official attempted to review your application, however the data has been
            changed since you last requested their certification.
          </p>
          <p>
            Further steps are necessary to complete a CIIP application:
            <ul>
              <li>
                Please log in to the CIIP Portal and <a href=${applicationURL}>resume the application</a> for the facility named above:
                <ul>
                  <li>Scroll to the bottom of the "Summary" page and make a new request for certification by entering the Certifying Official's email and clicking the blue "Submit for Certification" button.</li>
                </ul>
              </li>
            </ul>
          </p>
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

module.exports = createRecertificationRequestMail;
