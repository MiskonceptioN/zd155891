const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

const BASE_URL = 'https://standardresume.co';
// Our staging site, that seems to have the same issues
// const BASE_URL = 'https://standardresume.dev';

(async () => {
  const browser = await puppeteer.launch();
  const originalUserAgent = await browser.userAgent();
  const page = await browser.newPage();
  await page.setUserAgent(`${originalUserAgent} Percy`);

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    await page.goto(`${BASE_URL}${path}`, {
      waitUntil: 'networkidle2',
    });
    await new Promise((r) => setTimeout(r, 1000));
    await percySnapshot(page, `Page: ${path}`);
  }

  await browser.close();
})();

const paths = [
  '/',
  '/style-guide',

  '/linkedin-resume-builder',
  '/resume-builder',
  '/resume-builder/photo',

  '/tech',

  '/resume-templates',
  '/resume-templates/professional',
  '/resume-templates/modern',
  '/resume-templates/creative',
  '/resume-templates/simple',

  '/examples',
  '/examples/ios-developer',
  '/examples/web-designer',

  '/resources',
  '/resources/ios-developer-resume',
  '/resources/ux-designer-resume',

  '/remote-jobs/employers',
  '/remote-companies',

  '/pricing',
  '/about',

  // These always fetch resume data from production for cross env consistency
  '/featured-resume/sidney-template',
  '/featured-resume/pender-template',
  '/featured-resume/georgia-template',
  '/featured-resume/parker-template',
  '/featured-resume/seymore-template',
  '/featured-resume/keefer-template',
  '/featured-resume/cordova-template',
  '/featured-resume/venables-template',

  // Test previews for PDF resumes. Force production data.
  '/previews/pdf/_8TwgFHjtAY_XqvxU1otV?forceProduction=true',
  '/previews/pdf/FbNuF3gefPzu0bweeuo0N?forceProduction=true',
  '/previews/pdf/i5Jo3YlqOCCy3Tl2SBlDD?forceProduction=true',
  '/previews/pdf/a96KVpIgRQpwhRsVJPI3m?forceProduction=true',
  '/previews/pdf/3WlRZPzQI1WwzP3g3QqdD?forceProduction=true',
  '/previews/pdf/zPFykBvmWJi79g28F7gxr?forceProduction=true',
  '/previews/pdf/py2J8rR66wEnNjsD5ENFF?forceProduction=true',
  '/previews/pdf/b5xkixKT7-d92LosKKKDA?forceProduction=true',

  // Test previews for share cards. Force production data.
  '/previews/share-card/3WlRZPzQI1WwzP3g3QqdD?forceProduction=true',
  '/previews/share-card/_8TwgFHjtAY_XqvxU1otV?forceProduction=true',
];