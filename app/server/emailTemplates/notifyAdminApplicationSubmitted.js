const createNotifyAdminApplicationSubmittedMail = ({
  facilityName,
  operatorName
}) => {
  return `
    <p>${facilityName}<p>
    <p>${operatorName}<p>
  `;
};

module.exports = createNotifyAdminApplicationSubmittedMail;
