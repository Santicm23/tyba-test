import { Module } from '@nestjs/common';

import { TransactionController } from '@/presentation/transaction/transaction.controller';

@Module({
  controllers: [TransactionController],
})
export class TransactionModule {}
