import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

type InputBoundary = {
    code: string,
    amount: number,
    numberInstallments: number,
    paymentMethod: string,
}

export default class CreateTransaction {

    constructor(
        private readonly transactionRepository: TransactionRepository
    ) {
    }

    async handle(input: InputBoundary): Promise<void> {
        const transaction = new Transaction(
            input.code, input.amount, input.numberInstallments, input.paymentMethod
        );
        transaction.generateInstallments();
        await this.transactionRepository.save(transaction);
    }

}
