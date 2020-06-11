const createUrl = require('../helpers/createUrl');
const createSignedByCertifierMail = ({
  email,
  firstName,
  lastName,
  facilityName,
  operatorName,
  certifierEmail,
  certifierFirstName,
  certifierLastName,
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
          <h3>Hello, <strong>${firstName} ${lastName}</strong>.</h3>
          <h4>Your CIIP Application has been signed by your certifier, <strong>${certifierFirstName} ${certifierLastName}</strong> (${certifierEmail}).</h4>
          <h4>Application Details:</h4>
          <p>Operator: ${operatorName}</p>
          <p>Facility: ${facilityName}</p>
          <p>Further steps are necessary to submit the CIIP application:</p>
          <ul>
            <li>
              Please <a href=${createUrl()}>log in to the CIIP Portal</a> and resume the application for the facility named above:
              <ul>
                <li>Scroll to the bottom of the "Summary" page and submit the completed application by reading the disclosure statement and clicking the blue "Submit Application" button.</li>
              </ul>
            </li>
            <li>You will be notified via email when your application has been approved or if any further information is required to process your application.</li>
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

module.exports = createSignedByCertifierMail;
