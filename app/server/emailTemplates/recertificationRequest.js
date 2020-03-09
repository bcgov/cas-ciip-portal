const createRecertificationRequestMail = ({
  email,
  firstName,
  lastName,
  facilityName,
  operatorName
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
          <h4>Your CIIP Application requires a new certificaton URL.</h4>
          <p>
            Your certifier attempted to review your application, however the data has been
            changed since the certification URL was generated. A new URL needs to be generated and sent to the certifier from
            the Application Summary page
          </p>
          <h4>Application Details:</h4>
          <p>Operator: ${operatorName}</p>
          <p>Facility: ${facilityName}</p>
          <br/>
          <a href="http://localhost:3004">CIIP Portal</a>
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

module.exports = createRecertificationRequestMail;
