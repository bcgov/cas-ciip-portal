const express = require('express');
const redirectRouter = express.Router();
redirectRouter.get('/reporter/view-application', (req, res) => {
  const {applicationId, version} = req.query;
  if (!applicationId || !version) {
    res.redirect('/404');
    return;
  }

  res.redirect(
    `/reporter/application/${applicationId}/version/${version}/view`
  );
});

module.exports = redirectRouter;
