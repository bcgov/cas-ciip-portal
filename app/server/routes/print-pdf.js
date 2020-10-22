const express = require('express');
const cookieParser = require('cookie-parser');
const puppeteer = require('puppeteer');
const router = express.Router();

router.use(cookieParser());
router.get('/', async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
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

    console.log(`http://localhost:3004${req.query.url}`);
    page.goto(`http://localhost:3004${req.query.url}`, {
      waitUntil: 'networkidle2'
    });

    await page.waitForSelector('#page-content');

    const pdfFile = await page.pdf({
      format: 'letter',
      printBackground: true
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdfFile.length
    });

    res.send(pdfFile);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  } finally {
    await browser.close();
  }
});

module.exports = router;
