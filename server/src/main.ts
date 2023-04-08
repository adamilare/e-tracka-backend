import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import logger from "./utils/logger";
import { CORS_ORIGIN, PORT } from "./constants";
import helmet from "helmet";
import deserializeUser from "./middleware/deserializeUser";
import router from './utils/route.index';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api', router);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server up and running on http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  /*process.on is a method in Node.js that allows you to register event listeners for
  various signals or events that occur during the lifetime of a Node.js process.*/
  process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close();

    // disconnect from the db
    await disconnectFromDatabase();

    logger.info("My work here is done");

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
