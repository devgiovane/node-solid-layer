import Connection from "../database/Connection";
import Transaction from "../../domain/entity/Transaction";
import Installment from "../../domain/entity/Installment";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class TransactionDatabaseRepository implements TransactionRepository {

    constructor(
        private readonly connection: Connection
    ) {
    }

    async get(code: string): Promise<Transaction> {
        const transactionData = await this.connection.one("select * from store.transaction where code = $1", [ code ]);
        const transaction = new Transaction(
            transactionData.code, parseFloat(transactionData.amount), transactionData.number_installments, transactionData.payment_method,
        );
        const installmentsData = await this.connection.query("select * from store.installment where code = $1", [ code ]);
        for (const installmentData of installmentsData) {
            const installment = new Installment(
                installmentData.number, parseFloat(installmentData.amount)
            );
            transaction.installments.push(installment);
        }
        return transaction;
    }

    async save(transaction: Transaction): Promise<void> {
        await this.connection.query("insert into store.transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4);", [
            transaction.code, transaction.amount, transaction.numberInstallments, transaction.paymentMethod
        ]);
        for (const installments of transaction.installments) {
            await this.connection.query("insert into store.installment (code, number, amount) values ($1, $2, $3);", [
                transaction.code, installments.number, installments.amount
            ]);
        }
    }

}
