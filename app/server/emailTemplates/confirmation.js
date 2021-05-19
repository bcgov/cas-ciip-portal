const html = require('html-template-tag');
const createUrl = require('../helpers/createUrl');

const createConfirmationMail = ({
  applicationId,
  firstName,
  lastName,
  email,
  facilityName,
  operatorName,
  organisationId,
  versionNumber,
  contactEmail
}) => {
  const appId = Buffer.from(`["applications",${applicationId}]`).toString(
    'base64'
  );
  const encodedAppId = encodeURIComponent(appId);
  const operationFacilitiesUrl = createUrl(
    `reporter/facilities?filterArgs=${encodeURIComponent(
      JSON.stringify({organisationRowId: organisationId})
    )}`
  );
  return html`
    <table
      align="center"
      border="1"
      cellpadding="0"
      cellspacing="0"
      width="600"
    >
      <tr>
        <td style="padding: 40px 0 30px 0; " align="center">
          <h2 style="text-decoration: underline">
            Province of British Columbia
          </h2>
          <h3>Clean BC Industrial Incentive Program</h3>
        </td>
      </tr>
      <tr style="border-top: 0px">
        <td style="padding: 20px 10px 30px 10px;">
          <h3>Hello ${firstName} ${lastName},</h3>
          <p>
            Thank you for your submission to the CleanBC Industrial Incentive
            Program.
          </p>
          <p>
            Your application (#${applicationId}) for facility
            <strong>${facilityName}</strong> on behalf of
            <strong>${operatorName}</strong> has been received.
          </p>
          <p>
            You will receive notification via email when a decision on your
            application has been made, or if changes are requested.
          </p>
          <p>
            You can
            <a
              href="${createUrl(
                `reporter/application/${encodedAppId}/version/${versionNumber}/view`
              )}"
            >
              view your submitted application here
            </a>
            and monitor the status of your application(s)
            <a href="${operationFacilitiesUrl}">
              on the Operation Facilities dashboard </a
            >.
          </p>
          <p>
            If you have any questions during the application process, please
            contact
            <a href="mailto:${contactEmail}?subject=CIIP Inquiry">
              ${contactEmail}
            </a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 10px 30px 10px;">
          <p>Sent to: ${email}</p>
          <p>
            On behalf of the Climate Action Secretariat &amp; the CleanBC
            Industrial Incentive Program
          </p>
        </td>
      </tr>
    </table>
  `;
};

module.exports = createConfirmationMail;
