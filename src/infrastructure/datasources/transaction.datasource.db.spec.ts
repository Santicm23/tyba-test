import TransactionDataSourceDBImpl from './transaction.datasource.db';
import prismaClient from '@/config/db/prisma';
import TransactionMapper from '../mappers/transaction.mapper';
import TransactionEntity from '@/domain/entities/transaction.entity';

jest.mock('@/config/db/prisma', () => ({
  transaction: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock('../mappers/transaction.mapper', () => ({
  multipleTransactionEntityFromDB: jest.fn(),
}));

describe('TransactionDataSourceDBImpl', () => {
  let dataSource: TransactionDataSourceDBImpl;

  beforeEach(() => {
    dataSource = new TransactionDataSourceDBImpl();
    jest.clearAllMocks();
  });

  describe('getTransactionsByUserId', () => {
    it('should call prismaClient.transaction.findMany with correct userId', async () => {
      const userId = 'example1';
      const dbTransactions = [
        {
          id: '1',
          operation: 'deposit',
          date: new Date(),
          description: 'desc',
          userId,
        },
      ];
      (prismaClient.transaction.findMany as jest.Mock).mockResolvedValue(
        dbTransactions,
      );
      (
        TransactionMapper.multipleTransactionEntityFromDB as jest.Mock
      ).mockReturnValue(['mapped']);

      const result = await dataSource.getTransactionsByUserId(userId);

      expect(prismaClient.transaction.findMany).toHaveBeenCalledWith({
        where: { userId },
        select: {
          id: true,
          operation: true,
          date: true,
          description: true,
          userId: true,
        },
      });
      expect(
        TransactionMapper.multipleTransactionEntityFromDB,
      ).toHaveBeenCalledWith(dbTransactions);
      expect(result).toEqual(['mapped']);
    });

    it('should return an empty array if no transactions found', async () => {
      (prismaClient.transaction.findMany as jest.Mock).mockResolvedValue([]);
      (
        TransactionMapper.multipleTransactionEntityFromDB as jest.Mock
      ).mockReturnValue([]);

      const result = await dataSource.getTransactionsByUserId('example2');

      expect(result).toEqual([]);
    });
  });

  describe('registerTransaction', () => {
    it('should call prismaClient.transaction.create with correct data', async () => {
      const transaction: TransactionEntity = {
        operation: 'withdraw',
        date: new Date('2024-01-01'),
        description: 'ATM withdrawal',
        user: {
          id: 'example1',
          name: 'example1',
          email: 'example1@example.com',
        },
      };
      (prismaClient.transaction.create as jest.Mock).mockResolvedValue(
        undefined,
      );

      await dataSource.registerTransaction(transaction, transaction.user.id!);

      expect(prismaClient.transaction.create).toHaveBeenCalledWith({
        data: {
          operation: transaction.operation,
          date: transaction.date,
          description: transaction.description,
          userId: transaction.user.id!,
        },
      });
    });

    it('should throw if prismaClient.transaction.create throws', async () => {
      const transaction: TransactionEntity = {
        operation: 'deposit',
        date: new Date(),
        description: 'Bank deposit',
        user: {
          id: 'example2',
          name: 'example2',
          email: 'example2@example.com',
        },
      };
      (prismaClient.transaction.create as jest.Mock).mockRejectedValue(
        new Error('DB error'),
      );

      await expect(
        dataSource.registerTransaction(transaction, transaction.user.id!),
      ).rejects.toThrow('DB error');
    });
  });
});
