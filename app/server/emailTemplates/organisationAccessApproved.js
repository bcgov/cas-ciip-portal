const createOrganisationAccessApprovedMail = ({email, firstName, lastName}) => {
  return `
    <p>${firstName}<p>
    <p>${lastName}<p>
    <p>${email}<p>
  `;
};

module.exports = createOrganisationAccessApprovedMail;
