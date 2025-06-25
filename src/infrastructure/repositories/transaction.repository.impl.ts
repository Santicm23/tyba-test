import TransactionDataSource from '@/domain/datasources/transaction.datasource';
import TransactionEntity from '@/domain/entities/transaction.entity';
import TransactionRepository from '@/domain/repositories/transaction.repository';

export default class TransactionRepositoryImpl
  implements TransactionRepository
{
  constructor(private readonly transactionDataSource: TransactionDataSource) {}

  async getTransactionsByUserId(userId: string): Promise<TransactionEntity[]> {
    return await this.transactionDataSource.getTransactionsByUserId(userId);
  }

  async registerTransaction(
    transaction: TransactionEntity,
    userId: string,
  ): Promise<void> {
    return await this.transactionDataSource.registerTransaction(
      transaction,
      userId,
    );
  }
}
