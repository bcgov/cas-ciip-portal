const createUrl = require('../helpers/createUrl');
const createWelcomeMail = ({firstName, lastName, email, contactEmail}) => {
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
          <h4>Thank you for registering for the CleanBC Industrial Incentive Program.</h4>
          <p>Further steps are necessary to complete a CIIP application:</p>
          <ul>
            <li>
              Please log in to the CIIP Portal to <a href=${createUrl(
                'reporter'
              )}>request access to an operator</a>.
              <ul>
                <li>You will be notified via email when your access has been approved.</li>
              </ul>
            </li>
            <li>You will be able to fill out an application once you have been approved as an authorised representative.</li>
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

module.exports = createWelcomeMail;
