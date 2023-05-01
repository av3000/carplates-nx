import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (typeof err === 'string') {
    res.status(500).json({
      code: 500,
      name: 'Server Error',
      message: err || 'Internal Server Error',
    });
  } else if (err.message) {
    res.status(err.code || 500).json({
      code: err.code || 500,
      name: err.name || 'Server Error',
      message: err.message || 'Internal Server Error',
    });
  } else {
    res.status(500).json(err);
  }
};
