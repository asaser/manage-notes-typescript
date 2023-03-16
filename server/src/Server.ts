import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import noteRouters from "./routes/noteRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();
const sessionSecret = env.SESSION_SECRET;

app.use(morgan("dev"));

app.use(express.json());

// dodany plik @types oraz zmieniono konfiguracje wewntrz tsconfig aby mona by zapisywac uzytkownikow w sessji
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  // dlugosc zycia logowanych informacji
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  // podczas uzywania uzytkownik nie wylguje sie automatycznie
  rolling: true,
  // store czyli informacje tam gdzie bedziemy przechowywac nasze dane. Jezeli nie wpisze sie STORE wtedy dane beda przechowywane w MEMORY
  // czyli kiedy zrestartujemy serwer to wtedy znikna wszystkie dane. A tak to aby  bylo dobre dla production lepiej przechowywac dane w mongo 
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
  })
}));

app.use("/api/notes", noteRouters);
app.use("/api/users", userRoutes);

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
});

export default app;