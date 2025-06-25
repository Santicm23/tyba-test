import TransactionMapper from './transaction.mapper';
import TransactionEntity from '@/domain/entities/transaction.entity';
import { Transaction } from '@prisma/client';

describe('TransactionMapper', () => {
  const transactionDb: Transaction = {
    id: '1',
    userId: '',
    operation: '',
    description: null,
    date: new Date(),
  };

  it('should map a single Transaction from DB to TransactionEntity', () => {
    const entity = TransactionMapper.transactionEntityFromDB(transactionDb);
    expect(entity).toBeInstanceOf(TransactionEntity);
    expect(entity.user.id).toBe(transactionDb.userId);
    expect(entity.operation).toBe(transactionDb.operation);
    expect(entity.description).toBe(transactionDb.description);
    expect(entity.date).toEqual(transactionDb.date);
  });

  it('should map multiple Transactions from DB to TransactionEntities', () => {
    const transactionsDb: Transaction[] = [
      transactionDb,
      { ...transactionDb, id: '2' },
    ];
    const entities =
      TransactionMapper.multipleTransactionEntityFromDB(transactionsDb);
    expect(Array.isArray(entities)).toBe(true);
    expect(entities.length).toBe(2);
    entities.forEach((entity, idx) => {
      expect(entity).toBeInstanceOf(TransactionEntity);
      expect(entity.user.id).toBe(transactionsDb[idx].userId);
      expect(entity.operation).toBe(transactionsDb[idx].operation);
      expect(entity.description).toBe(transactionsDb[idx].description);
      expect(entity.date).toEqual(transactionsDb[idx].date);
    });
  });

  it('should return an empty array when mapping an empty array', () => {
    const entities = TransactionMapper.multipleTransactionEntityFromDB([]);
    expect(Array.isArray(entities)).toBe(true);
    expect(entities.length).toBe(0);
  });
});
