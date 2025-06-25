import TransactionEntity from '@/domain/entities/transaction.entity';
import TransactionRepository from '@/domain/repositories/transaction.repository';

export default class TransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async getTransactionsByUserId(userId: string): Promise<TransactionEntity[]> {
    return this.transactionRepository.getTransactionsByUserId(userId);
  }
}
