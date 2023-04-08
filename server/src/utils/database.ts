import mongoose from "mongoose";
import logger from "./logger";
import { DB_CONNECTION_STRING } from '../constants';


export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connected to database successfully");
  } catch (e) {
    logger.error(e, "Failed to connect to database.");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();

  logger.info("Disconnected from database successfully");

  return;
}
