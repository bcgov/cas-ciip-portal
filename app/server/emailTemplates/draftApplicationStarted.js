const createUrl = require('../helpers/createUrl');
const createDraftApplicationStartedMail = ({
  applicationId,
  email,
  firstName,
  lastName,
  operatorName,
  facilityName,
  contactEmail
}) => {
  const appId = Buffer.from(`["applications", ${applicationId}]`).toString(
    'base64'
  );
  const applicationURL = createUrl(
    `reporter/application?applicationId=${encodeURIComponent(appId)}&version=1`
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
          <h3>Hello, ${firstName} ${lastName}.</h3>
          <h4>Thank you for starting an application to the CleanBC Industrial Incentive Program.</h4>
          <p>You have <a href="${applicationURL}">started an application</a> on behalf of <strong>${operatorName}</strong> for the <strong>${facilityName}</strong> facility.</p>
          <p>Further steps are necessary to complete a CIIP application:</p>
          <ul>
            <li>
              Fill in each section of the <a href="${applicationURL}">application form</a> and fix any errors that may be highlighted.
            </li>
            <li>
              Once the application has been filled, you will be prompted to request signoff from a Certifying Official at your Reporting Operation. Please ensure that person reviews and certifies the information provided in your application.
              <ul>
                <li>You will be notified via email when that step is complete.</li>
              </ul>
            </li>
            <li>
              Once you have received notification that the application has been certified, you will need to log in to the CIIP Portal to submit the application.
            </li>
            <li>Once submitted, you will be notified via email when your application has been approved or if any further information is required to process your application.</li>
          </ul>
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

module.exports = createDraftApplicationStartedMail;
