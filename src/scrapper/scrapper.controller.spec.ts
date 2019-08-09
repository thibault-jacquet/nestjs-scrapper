import { Test } from '@nestjs/testing';
import { ScrapperController } from '../scrapper/scrapper.controller';

const scrapperServiceMock = {
  scrap: jest.fn(() => Promise.resolve()),
};

describe('ScrapperController', () => {
  let scrapperController: ScrapperController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ScrapperController],
      providers: [
        {
          provide: 'ScrapperService',
          useValue: scrapperServiceMock,
        },
      ],
    }).compile();
    scrapperController = module.get<ScrapperController>(ScrapperController);
  });

  it('controller should be defined', async () => {
    expect(scrapperController).toBeDefined();
  });

  describe('scrap()', () => {
    it('should call scrapperService.scrap', async () => {
      await scrapperController.scrap({});
      expect(scrapperServiceMock.scrap).toHaveBeenCalled();
    });
  });
});
