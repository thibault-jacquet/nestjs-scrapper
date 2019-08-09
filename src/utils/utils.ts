import { HttpException, HttpStatus } from '@nestjs/common';

const getUrlFromCode = (code: string): string => {
  switch (code) {
    case 'CMZ':
      return 'https://www.bourse.commerzbank.com/webforms/Products/ProductSearchQuick.aspx?q=';
    case 'SG':
      return 'https://bourse.societegenerale.fr/produits/levier/leverage/symbol:';
    case 'BOURSO':
      return 'https://www.boursorama.com/bourse/trackers/cours/';
    case 'VONTOBEL':
      return 'https://bourse.vontobel.com/FR/FR/Produit/';
    default:
      return null;
  }
};

const concate = (str1: string, str2: string): string => `${str1}${str2}`;

export const getUrl = (code: string, isin: string): string => {
  const url: string = getUrlFromCode(code);
  if (!url) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: `Invalid code ${code}` }, 400);
  return concate(url, isin);
};

export const scrapFromCode = async (page, code: string) => {
  switch (code) {
    case 'CMZ':
      return await scrapCMZ(page);
    case 'SG':
      return await scrapSG(page);
    case 'BOURSO':
      return await scrapBOURSO(page);
    case 'VONTOBEL':
      return await scrapVONTOBEL(page);
  }
};

const scrapSG = async page => {
  return page.$eval('span.blinkable-marketdata-product', e => e.innerText);
};

const scrapBOURSO = async page => {
  return page.$eval('span[class="c-instrument c-instrument--last"]', e => e.innerText);
};

const scrapVONTOBEL = async page => {
  return page.$eval('span[class="strong value"]', e => e.innerText);
};

const scrapCMZ = async page => {
  const allFrames = page.mainFrame().childFrames();
  let mainFrame;
  allFrames.forEach(frame => {
    console.log('frame.url()', frame.url());
    if (frame.url().includes('https://www.bourse.commerzbank.com/webforms/Products/ProductDetailsData')) {
      mainFrame = frame;
    }
  });
  await mainFrame.waitForSelector('div#ctl00_content_displayDataSection_displayPriceData_divTable');
  const result = await mainFrame.$eval(
    'div#ctl00_content_displayDataSection_displayPriceData_divTable tr:first-child td:nth-child(2) > span',
    e => e.innerText,
  );
  return result;
};

export const cleanResult = (result: string): string => {
  let dotResult = result.replace(/,/g, '.');
  return dotResult.replace(/[\s€\$]/g, '');
};
