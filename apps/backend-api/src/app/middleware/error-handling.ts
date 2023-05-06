import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../models/carplate.model';

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
      error: {
        status: 500,
        name: 'Server Error',
        message: err || 'Internal Server Error',
      },
      body: req.body,
    } as errorResponse);
  } else if (err.message) {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        name: err.name || 'Server Error',
        message: err.message || 'Internal Server Error',
      },
      body: req.body,
    } as errorResponse);
  } else {
    res.status(500).json({ error: err, body: req.body } as errorResponse);
  }
};
