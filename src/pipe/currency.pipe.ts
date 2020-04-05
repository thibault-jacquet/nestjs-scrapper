import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseCurrencyPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed - Not a float Element');
    }

    return value.replace('.', ',');
  }
}
