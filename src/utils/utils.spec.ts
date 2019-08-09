import { cleanResult } from './utils';

describe('Utils', () => {
  it('should clean result', async () => {
    const str = '€ 0,  2 12 € $ ';
    expect(cleanResult(str)).toEqual('0.212');
  });
});
