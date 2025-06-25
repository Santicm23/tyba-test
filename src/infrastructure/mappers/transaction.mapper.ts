import TransactionEntity from '@/domain/entities/transaction.entity';
import { Transaction } from '@prisma/client';
import { plainToClass } from 'class-transformer';

export default class TransactionMapper {
  static transactionEntityFromDB(transaction: Transaction) {
    return plainToClass(TransactionEntity, transaction);
  }

  static multipleTransactionEntityFromDB(
    transactions: Transaction[],
  ): TransactionEntity[] {
    return transactions.map((transaction) =>
      this.transactionEntityFromDB(transaction),
    );
  }
}
