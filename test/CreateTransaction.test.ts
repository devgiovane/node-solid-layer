import { v4 as uuidV4 } from "uuid";
//
import PostgresAdapter from "../src/infra/database/PostgresAdapter";
import GetTransaction from "../src/application/useCase/GetTransaction";
import CreateTransaction from "../src/application/useCase/CreateTransaction";
import TransactionDatabaseRepository from "../src/infra/repository/TransactionDatabaseRepository";
import TransactionMemoryRepository from "../src/infra/repository/TransactionMemoryRepository";

test("should create a transaction", async function () {
    const connection = new PostgresAdapter();
    // const transactionRepository = new TransactionDatabaseRepository(connection);
    const transactionRepository = new TransactionMemoryRepository();
    const code = uuidV4();
    const input = {
        code,
        amount: 1000,
        numberInstallments: 12,
        paymentMethod: "credit_card"
    }
    const createTransaction = new CreateTransaction(transactionRepository);
    await createTransaction.handle(input);
    const getTransaction = new GetTransaction(transactionRepository);
    const transaction = await getTransaction.handle(code);
    expect(transaction.code).toBe(code);
    expect(transaction.amount).toBe(1000);
    expect(transaction.paymentMethod).toBe("credit_card");
    expect(transaction.installments).toHaveLength(12);
    expect(transaction.installments[0].amount).toBe(83.33);
    expect(transaction.installments[11].amount).toBe(83.37);
    await connection.close();
});
