import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

import { CONVERT_EURO_DOLLAR_URL } from '../../config/convert.config';
import { cleanResult, scrapFromCode } from '../../utils/utils';

@Injectable()
export class ConvertService {
  // TODO Refacto code avec le code et supprimer l'url
  convert = async (amount: string): Promise<any> => {
    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(`${CONVERT_EURO_DOLLAR_URL}${amount}`);
      await page.waitFor(300);
      let result = await scrapFromCode(page, 'XE');
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
}
