const createDraftApplicationStartedMail = ({
  email,
  firstName,
  lastName,
  operatorName,
  facilityName
}) => {
  return `
    <p>${firstName}<p>
    <p>${lastName}<p>
    <p>${email}<p>
    <p>${operatorName}<p>
    <p>${facilityName}<p>
  `;
};

module.exports = createDraftApplicationStartedMail;
