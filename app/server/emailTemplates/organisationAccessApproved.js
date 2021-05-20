const html = require('html-template-tag');
const createUrl = require('../helpers/createUrl');

const createOrganisationAccessApprovedMail = ({
  email,
  firstName,
  lastName,
  operatorName,
  organisationId,
  contactEmail
}) => {
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
            CleanBC Industrial Incentive Program administrators have approved
            you to submit a CIIP application on behalf of
            <strong>${operatorName}</strong>.
          </p>
          <p>
            <a href=${operationFacilitiesUrl}>
              View Operation Facilities and complete a CIIP application</a
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

module.exports = createOrganisationAccessApprovedMail;
