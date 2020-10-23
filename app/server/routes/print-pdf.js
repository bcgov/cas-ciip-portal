const express = require('express');
const cookieParser = require('cookie-parser');
const puppeteer = require('puppeteer');
const router = express.Router();
const PORT = Number.parseInt(process.env.PORT, 10) || 3004;

const launchBrowser = async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--incognito']
  });

  browser.on('disconnected', launchBrowser);
  return browser;
};

module.exports = async () => {
  const browser = await launchBrowser();
  router.use(cookieParser());
  router.get('/', async (req, res) => {
    let page;
    try {
      page = await browser.newPage();
      await page.setCookie({
        name: 'connect.sid',
        value: req.cookies['connect.sid'],
        domain: 'localhost',
        httpOnly: true
      });

      page.setViewport({
        width: 1920,
        height: 1080
      });

      await page.goto(`${process.env.HOST}:${PORT}${req.query.url}`, {
        waitUntil: 'networkidle2'
      });

      await page.waitForSelector('#page-content');

      const pdfFile = await page.pdf({
        format: 'letter',
        printBackground: true
      });

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdfFile.length,
        'Content-Disposition': 'attachment; filename=CIIP_Application.pdf'
      });

      res.send(pdfFile);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    } finally {
      try {
        if (page) await page.close();
      } catch (ee) {
        console.error(ee);
      }
    }
  });
  return router;
};
