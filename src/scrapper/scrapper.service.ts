import { Injectable } from '@nestjs/common';
import { getUrl, scrapFromCode, cleanResult } from '../utils/utils';

const puppeteer = require('puppeteer');

@Injectable()
export class ScrapperService {
  // TODO Refacto code avec le code et supprimer l'url
  scrap = async (code: string, isin: string): Promise<any> => {
    let browser;
    const url = getUrl(code, isin);
    try {
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitFor(500);
      let result = await scrapFromCode(page, code);
      browser.close();
      result = cleanResult(result);
      if (isNaN(result)) throw new Error(`Scraped result: ${result} is not a number, maybe the Xpath used is available anymore`);
      return { result };
    } catch (e) {
      browser.close();
      console.error('Custom Error', e);
      return e;
    }
  };

  convert = async (): Promise<any> => {};
}
