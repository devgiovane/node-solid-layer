export default interface HttpServer {
    on (method: string, url: string, callable: Function): void;
    listen (port: number): void;
}
