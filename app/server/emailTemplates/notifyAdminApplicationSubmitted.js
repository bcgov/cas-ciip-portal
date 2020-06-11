const createNotifyAdminApplicationSubmittedMail = ({
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
        <p>The <strong>${facilityName}</strong> facility of <strong>${operatorName}</strong> has submitted or updated their application.</p>
        <p>An analyst can now review their application.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 10px 30px 10px;">
      <p>Sent on behalf of the Climate Action Secretariat &amp; the CleanBC Industrial Incentive Program</p></td>
    </tr>
  </table>
  `;
};

module.exports = createNotifyAdminApplicationSubmittedMail;
