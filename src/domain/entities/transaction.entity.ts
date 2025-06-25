import { IsDate, IsString } from 'class-validator';

import UserEntity from '@/domain/entities/user.entity';

export default class TransactionEntity {
  @IsString()
  public operation: string;

  @IsString()
  public description: string;

  @IsDate()
  public date: Date;

  public user: UserEntity;
}
