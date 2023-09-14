import { BaseEntity } from '@app/common';
import { Column } from 'typeorm';

class Token extends BaseEntity {
  @Column({ length: 200 })
  token: string;
}

export default Token;
