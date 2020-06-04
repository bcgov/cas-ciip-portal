const createNotifyAdminAccessRequestMail = ({
  firstName,
  lastName,
  operatorName
}) => {
  return `
    <p>${firstName}<p>
    <p>${lastName}<p>
    <p>${operatorName}<p>
  `;
};

module.exports = createNotifyAdminAccessRequestMail;
