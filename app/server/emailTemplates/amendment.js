const createUrl = require('../helpers/createUrl');
const createAmendmentMail = ({
  firstName,
  lastName,
  email,
  facilityName,
  operatorName,
  status,
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
          <h4>The Status of your CIIP Application has changed.</h4>
          <h4>Application Details:</h4>
          <p>Operator: ${operatorName}</p>
          <p>Facility: ${facilityName}</p>
          <p>Status: ${status}</p>
          <p>Further steps may be necessary to submit the CIIP application:</p>
          <p>
            If your status has been changed to:
            <ul>
              <li>
                Approved
                <ul>
                  <li>No further action from you is required at this time. Your incentive payment is being processed.</li>
                </ul>
              </li>
              <li>
                Requested changes
                <ul>
                  <li><strong>Please <a href=${createUrl()}>log in to the CIIP Portal</a> and address the requested changes.</strong> Your timely attention to this request will reduce the amount of time required to process your incentive payment.</li>
                  <li>After logging in, view the submitted application for the facility named above.</li>
                  <li>Review the feedback, including requested changes, which are found in the communication pane on the right side of the window.</li>
                  <li>To update the application, click the green "Revise Application" button at the bottom of the page.</li>
                  <li>You will be directed back to your application, which will require certification, and submission again.</li>
                </ul>
              </li>
              <li>
                Rejected
                <ul>
                  <li>Thank you for applying to the CIIP. Unfortunately this submission did not meet program requirements and a payment cannot be granted.</li>
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

module.exports = createAmendmentMail;
