import { PipeTransform, BadRequestException } from '@nestjs/common';
import { SortQuery } from '../model/dto/sort-query.dto';

export class SortValidationPipe implements PipeTransform {
  protected readonly options: string[];
  protected readonly isEverythingAllowed: boolean = true;
  constructor(options?: string[]) {
    if (options) {
      this.options = options;
      this.isEverythingAllowed = false;
    }
  }

  transform(value: string): SortQuery[] {
    const fields = value.split(',');
    return fields.map((field) => {
      const [name, order] = field.split(':');
      if (
        !name ||
        !order ||
        (order !== 'ASC' && order !== 'DESC') ||
        (!this.options.includes(name) && this.isEverythingAllowed === false)
      ) {
        throw new BadRequestException('Invalid sort query.');
      }
      return { field: name, order: order as 'ASC' | 'DESC' };
    });
  }
}
