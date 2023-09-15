import { BaseEntity } from '@app/common';
import { Column, JoinColumn, OneToOne } from 'typeorm';
import User from '../../users/entity/user.entity';

class Token extends BaseEntity<Token> {
  @Column({ length: 200 })
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Token;
