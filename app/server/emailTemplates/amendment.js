const createUrl = require('../helpers/createUrl');
const createAmendmentMail = ({
  firstName,
  lastName,
  email,
  facilityName,
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
          <p>Changes are requested to your CIIP application for facility <strong>${facilityName}</strong> on behalf of <strong>${operatorName}</strong>.</p>
          <p>Further steps are necessary to submit your CIIP application:</p>
          <ul>
            <li><strong>Please <a href=${createUrl()}>log in to the CIIP Portal</a> and address the requested changes.</strong> Your timely attention to this request will reduce the amount of time required to process your incentive payment.</li>
            <li>After logging in, view the submitted application for the facility named above.</li>
            <li>Review the feedback, including requested changes, which are found in the communication pane on the right side of the window.</li>
            <li>To update the application, click the green "Revise Application" button at the bottom of the page.</li>
            <li>You will be directed back to your application, which will require certification, and submission again.</li>
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

module.exports = createAmendmentMail;
