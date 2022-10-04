import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class TransactionMemoryRepository implements TransactionRepository {

    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    async get(code: string): Promise<Transaction> {
        const transaction = this.transactions.find(transaction => transaction.code === code);
        if (!transaction) throw new Error();
        return transaction;
    }

    async save(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

}
