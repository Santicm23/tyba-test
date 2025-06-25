import prismaClient from '@/config/db/prisma';
import TransactionDataSource from '@/domain/datasources/transaction.datasource';
import TransactionEntity from '@/domain/entities/transaction.entity';
import TransactionMapper from '../mappers/transaction.mapper';

export default class TransactionDataSourceDBImpl
  implements TransactionDataSource
{
  async getTransactionsByUserId(userId: string): Promise<TransactionEntity[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId },
      select: {
        id: true,
        operation: true,
        date: true,
        description: true,
        userId: true,
      },
    });

    return TransactionMapper.multipleTransactionEntityFromDB(transactions);
  }

  async registerTransaction(
    transaction: TransactionEntity,
    userId: string,
  ): Promise<void> {
    await prismaClient.transaction.create({
      data: {
        operation: transaction.operation,
        date: transaction.date,
        description: transaction.description,
        userId: userId,
      },
    });
  }
}
