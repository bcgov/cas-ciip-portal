const createUrl = require('../helpers/createUrl');
const createOrganisationAccessApprovedMail = ({
  email,
  firstName,
  lastName,
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
          <h4>CleanBC Industrial Incentive Program administrators have approved you as an authorized representative for an Operation you requested access to. You can now submit a CIIP application on their behalf.</h4>
          <p>Further steps are necessary to complete a CIIP application:</p>
          <ul>
            <li>
              Please <a href=${createUrl()}>log in to the CIIP Portal</a> and view Operation Facilities to access the CIIP application.
            </li>
            <li>
              To complete an application, it must be filled out, certified, and submitted.
              <ul>
                <li>You will be notified via email when each step is complete and what the next steps are.</li>
              </ul>
            </li>
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

module.exports = createOrganisationAccessApprovedMail;
