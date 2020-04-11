import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { cleanResult, scrapFromCode } from '../../utils/utils';

@Injectable()
export class ScrapperService {
  // TODO Refacto code avec le code et supprimer l'url
  scrap = async (code: string, url: string): Promise<any> => {
    let browser: puppeteer.Browser;
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
      console.error('Custom Error', e);
      browser.close();
      return e;
    }
  };

  convert = async (): Promise<any> => {};
}
