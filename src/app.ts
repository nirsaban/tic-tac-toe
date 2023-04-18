import express, { Express } from "express";
import cors from "cors";



export class App {
  private app: Express;
  constructor() {
    this.app = express();

   
    this.app.use(cors());
    this.app.use(express.json());
    this.app.listen(3000, () => {
        console.log("server running");
    });
  }

  public export() {
    return this.app;
  }

  public async start(port: number) {
    return await new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      });
    });
  }
}

export const app = new App()