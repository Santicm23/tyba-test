import TransactionUseCase from '@/domain/usecases/transactions.usecase';
import TransactionDataSourceDBImpl from '@/infrastructure/datasources/transaction.datasource.db';
import TransactionRepositoryImpl from '@/infrastructure/repositories/transaction.repository.impl';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('transactions')
export class TransactionController {
  private readonly transactionUseCase = new TransactionUseCase(
    new TransactionRepositoryImpl(new TransactionDataSourceDBImpl()),
  );

  @Get(':userId')
  async getTransactionsByUserId(@Param('userId') userId: string) {
    return await this.transactionUseCase.getTransactionsByUserId(userId);
  }
}
