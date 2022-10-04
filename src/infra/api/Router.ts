import HttpServer from "./HttpServer";
import GetTransaction from "../../application/useCase/GetTransaction";
import CreateTransaction from "../../application/useCase/CreateTransaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";

export default class Router {

    constructor(
        private readonly httpServer: HttpServer,
        private readonly transactionRepository: TransactionRepository
    ) {

    }

    init() {
        this.httpServer.on("post", "/transactions", async (params: any, body: any) => {
            const createTransaction = new CreateTransaction(this.transactionRepository);
            await createTransaction.handle(body);
        });

        this.httpServer.on("get", "/transactions/:code", async (params: any, body: any) => {
            const getTransaction = new GetTransaction(this.transactionRepository);
            return await getTransaction.handle(params.code);
        });
    }
}
