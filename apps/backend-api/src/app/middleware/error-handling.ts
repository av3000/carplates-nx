import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export const errorMiddleware = (
  err: Error,
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
      error: {
        name: 'Server Error',
        message: err || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else if (err.message) {
    res.status(500).json({
      error: {
        name: err.name || 'Server Error',
        message: err.message || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else {
    res.status(500).json({ error: err, body: req.body } as ErrorResponse);
  }
};
