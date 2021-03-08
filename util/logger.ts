import path from "path";
import { createLogger, format, transports } from "winston";

const filename = new Date().toISOString().substring(0, 10);

// Get the root path and append the /logs folder to it
const logsPath = path.resolve(process.env.INIT_CWD as string, `logs`, filename);

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
