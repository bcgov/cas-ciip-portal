const createUrl = require('../helpers/createUrl');
const createDraftApplicationStartedMail = ({
  email,
  firstName,
  lastName,
  operatorName,
  facilityName,
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
          <h4>Thank you for starting an application to the CleanBC Industrial Incentive Program.</h4>
          <p>You have started an application on behalf of <strong>${operatorName}</strong> for the <strong>${facilityName}</strong> facility.</p>
          <p>Further steps are necessary to complete a CIIP application:</p>
          <ul>
            <li>
              A certification request has been sent to the certifier from your organization that you indicated at the bottom of the application. To complete your application, please ensure that person reviews and certifies the information provided in your application.
              <ul>
                <li>You will be notified via email when this step is complete.</li>
              </ul>
            </li>
            <li>
              Once you have received notification that the application has been certified, you will need to <a href=${createUrl()}>log in to the CIIP Portal</a> to submit the application.
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
