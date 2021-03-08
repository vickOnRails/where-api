import path from "path";
import { createLogger, format, transports } from "winston";

const filename = new Date().toISOString().substring(0, 10);

const env = process.env.NODE_ENV;
// Get the root path and append the /logs folder to it
const logsPath =
  env === "production"
    ? path.resolve(process.cwd(), `logs`, filename)
    : path.resolve(process.cwd(), `dist`, `logs`, filename);

// configure the logger
const logger = createLogger({
  transports: [new transports.File({ filename: `${logsPath}.log` })],
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.simple()
  ),
});

export { logger };
