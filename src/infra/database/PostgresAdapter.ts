import pgp from "pg-promise";
//
import Connection from "./Connection";

export default class PostgresAdapter implements Connection {
    private connection: any;

    constructor() {
        this.connection = pgp()("postgres://giovane:giovane@localhost:5432/app");
    }

    close(): Promise<void> {
        return this.connection.$pool.end();
    }

    one(statement: string, params: any): Promise<any> {
        return this.connection.one(statement, params);
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

}
