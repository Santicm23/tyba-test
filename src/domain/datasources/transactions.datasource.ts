export default abstract class TransactionsDataSource {
  abstract getTransactions(): Promise<any>;
  abstract registerTransaction(): Promise<any>;
}
