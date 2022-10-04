import TransactionRepository from "../../domain/repository/TransactionRepository";

type OutputBoundary = {
    code: string,
    amount: number,
    numberInstallments: number,
    paymentMethod: string,
    installments: { number: number, amount: number }[]
}

export default class GetTransaction {

    constructor(
        private readonly transactionRepository: TransactionRepository
    ) {
    }

    async handle(code: string): Promise<OutputBoundary> {
        const transaction = await this.transactionRepository.get(code);
        return transaction;
    }

}
