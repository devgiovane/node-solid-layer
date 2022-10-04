import express, { Request, Response } from "express";
//
import HttpServer from "./HttpServer";

export default class ExpressAdapter implements HttpServer {

    private readonly app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(method: string, url: string, callable: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
             const output = await callable(req.params, req.body);
             res.json(output);
        });
    }

    listen(port: number): void {
        this.app.listen(3000);
    }

}
