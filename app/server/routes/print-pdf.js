require('isomorphic-fetch');
const express = require('express');
const router = express.Router();
const consola = require('consola');
const fs = require('fs');
const WEASYPRINT_HOST = process.env.WEASYPRINT_HOST || 'http://localhost';
const WEASYPRINT_PORT = process.env.WEASYPRINT_PORT || '5001';
module.exports = async () => {
  router.post('/', async (req, res) => {
    try {
      fs.writeFileSync(
        'test.html',
        req.body.html
          .replace(/href=\s*"\//, 'href="http://localhost:3004/')
          .replace(/src=\s*"\//, 'src="http://localhost:3004/')
      );
      const weasyprintRes = await fetch(
        `${WEASYPRINT_HOST}:${WEASYPRINT_PORT}/pdf`,
        {
          method: 'POST',
          body: req.body.html
            .replace(/href=\s*"\//, 'href="http://localhost:3004/')
            .replace(/src=\s*"\//, 'src="http://localhost:3004/')
        }
      );

      res.setHeader('content-type', 'application/pdf');
      res.setHeader(
        'content-length',
        weasyprintRes.headers.get('content-length')
      );
      res.setHeader(
        'content-disposition',
        weasyprintRes.headers.get('content-disposition')
      );

      weasyprintRes.body.pipe(res);
    } catch (e) {
      consola.error(e);
    }
  });

  return router;
};
