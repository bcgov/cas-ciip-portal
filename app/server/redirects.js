const express = require('express');
const redirectRouter = express.Router();

const base64Decode = (str) =>
  Buffer.from(String(str), 'base64').toString('utf8');

const isValidApplicationId = (applicationId) => {
  try {
    const idParts = JSON.parse(base64Decode(applicationId));
    return (
      Array.isArray(idParts) &&
      idParts.length === 2 &&
      idParts[0] === 'applications' &&
      typeof idParts[1] === 'number'
    );
  } catch (e) {
    return false;
  }
};

redirectRouter.get('/reporter/view-application', (req, res) => {
  const {applicationId, version} = req.query;
  if (
    !applicationId ||
    !version ||
    !isValidApplicationId(applicationId) ||
    Number.isNaN(Number(version))
  ) {
    res.redirect('/404');
    return;
  }

  res.redirect(
    `/reporter/application/${applicationId}/version/${version}/view`
  );
});

redirectRouter.get('/reporter/application', (req, res) => {
  const {applicationId} = req.query;
  if (!applicationId || !isValidApplicationId(applicationId)) {
    res.redirect('/404');
    return;
  }

  res.redirect(`/reporter/application/${applicationId}`);
});

module.exports = redirectRouter;
