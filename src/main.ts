import dotenv from "dotenv";
//
import Router from "./infra/api/Router";
import ExpressAdapter from "./infra/api/ExpressAdapter";
import PostgresAdapter from "./infra/database/PostgresAdapter";
import TransactionDatabaseRepository from "./infra/repository/TransactionDatabaseRepository";

dotenv.config();

const httpServer = new ExpressAdapter();
const connection = new PostgresAdapter();
const transactionRepository = new TransactionDatabaseRepository(connection);

const router = new Router(httpServer, transactionRepository);
router.init();
httpServer.listen(300);
