const createOrganisationAccessRequestMail = ({
  email,
  firstName,
  lastName,
  operatorName
}) => {
  return `
    <p>${firstName}<p>
    <p>${lastName}<p>
    <p>${email}<p>
    <p>${operatorName}<p>
  `;
};

module.exports = createOrganisationAccessRequestMail;
