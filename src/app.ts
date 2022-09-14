import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express"
import { appRoutes } from "./routes";
import { AppError } from "./error/global";

const app = express();
app.use(express.json());



//função que executa as rotas
appRoutes(app)

//global errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  });

export default app;