const createNotifyAdminAccessRequestMail = ({
  firstName,
  lastName,
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
        <p><strong>${firstName} ${lastName}</strong> has requested access to the application for <strong>${operatorName}</strong>.</p>
        <p>An administrator can now review and approve them as an authorized representative for that Operator.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 10px 30px 10px;">
      <p>Sent on behalf of the Climate Action Secretariat &amp; the CleanBC Industrial Incentive Program</p></td>
    </tr>
  </table>
  `;
};

module.exports = createNotifyAdminAccessRequestMail;
