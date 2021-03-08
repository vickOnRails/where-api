import path from "path";
import { createLogger, format, transports } from "winston";

const filename = new Date().toISOString().substring(0, 10);

// The current stopping point for this logger is here
// 1. The logger is available to be used anywhere in the app
// 2. When in production, it creates a new `logs` folder in the /dist directory, but when in development, it creates it in the / directory
// 3. I'm pausing on this feature now because most hosting platforms log all requests coming in and out of the app. So it might not be particularly of use.

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
