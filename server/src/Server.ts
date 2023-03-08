import express, { NextFunction, Request, Response } from "express";
import noteRouters from "./routes/noteRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";


const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", noteRouters);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

// Todo inaczej łapać błędy i na pewno nie za pomocą app.use()
// NextFunction użyty aby z controllers brać błędy wychodzące z NEXT(error)
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknow error occured";
  let statusCode = 500;
  
  if(isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage})
})

export default app;