import { IsIn, IsUrl } from 'class-validator';

export class ScrapParams {
  @IsUrl()
  url: string;

  @IsIn(['SG', 'VTB', 'CMZ', 'BS', 'INVEST', 'GEF'])
  code: string;
}
