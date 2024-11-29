import morgan from 'morgan';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = {
  info: (message: string) => {
    if (!isProduction) console.log(`[INFO]: ${message}`);
  },
  warn: (message: string) => {
    if (!isProduction) console.warn(`[WARN]: ${message}`);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR]: ${message}`);
    if (error) console.error(error);
  },
};

export const morganMiddleware = morgan(isProduction ? 'combined' : 'dev', {
  // skip: (req, res) => res.statusCode < 400, // Log only error requests in production
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
