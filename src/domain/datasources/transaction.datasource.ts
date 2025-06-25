import TransactionEntity from '@/domain/entities/transaction.entity';

export default abstract class TransactionDataSource {
  abstract getTransactionsByUserId(
    userId: string,
  ): Promise<TransactionEntity[]>;
  abstract registerTransaction(
    transaction: TransactionEntity,
    userId: string,
  ): Promise<void>;
}
