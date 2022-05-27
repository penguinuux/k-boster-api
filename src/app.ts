import express, { NextFunction, Request, Response } from "express";
import { AppError, handleError } from "./errors/appError";
import { appErrorMiddleware } from "./middlewares";

const app = express();
app.use(express.json());
app.use(appErrorMiddleware);

export default app;
