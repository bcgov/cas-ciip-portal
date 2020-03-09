const createCertificationRequestMail = ({
  firstName,
  lastName,
  email,
  facilityName,
  operatorName,
  reporterEmail,
  certifierUrl
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
            <strong>${firstName} ${lastName} (${reporterEmail})</strong>, on behalf of <strong>${operatorName}</strong> for facility <strong>${facilityName}</strong>
            has requested that you review, verify and sign off on the data contained in this CIIP application. Follow the link below to view
            a summary of the data.
          </p>
          <br/>
          <a href=${certifierUrl}>CIIP Application</a>
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
