const createUrl = require('../helpers/createUrl');
const createCertificationRequestMail = ({
  firstName,
  lastName,
  email,
  facilityName,
  operatorName,
  reporterEmail,
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
          <h3>Your certification is requested.</h3>
          <p>
            <strong>${firstName} ${lastName}</strong> (${reporterEmail}), on behalf of <strong>${operatorName}</strong> for the <strong>${facilityName}</strong>
            facility has requested that you review, certify and sign off on the data contained in this application for the <a href="https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-program-for-industry/cleanbc-industrial-incentive-program">CleanBC Industrial Incentive Program</a>.
          </p>
          <p>As the Certifying Official, you must agree to the <a href="${createUrl(
            'resources/application-disclaimer'
          )}">terms described here</a>.</p>
          <p>
            <strong>Please follow the steps below to certify the facility's CIIP application:</strong>
            <ul>
              <li>
                Please log in to the CIIP Portal to review a summary of the data contained in the CIIP application. The application details can be found here.
                <ul>
                  <li>Complete the certification by reading the legal statement, signing in the grey "Certifying Official Signature" box or uploading a signature file, and then clicking the green "Sign" button at the bottom of the page.</li>
                </ul>
              </li>
              <li>Upon receiving your certification, the company representative who filled out the application will receive notice to submit the completed application for the facility named above. The representative <strong>must</strong> submit this application to participate in the CIIP.</li>
            </ul>
          </p>
          <p>Please note that if changes to the application are required, you will be required to recertify it.</p>
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

module.exports = createCertificationRequestMail;
