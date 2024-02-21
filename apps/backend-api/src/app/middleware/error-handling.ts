import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';
import { StatusCode } from '../enums';

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
    res.status(StatusCode.HTTP_500_INTERNAL_SERVER_ERROR).json({
      error: {
        name: 'Server Error',
        message: err || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else if (err.message) {
    res.status(StatusCode.HTTP_500_INTERNAL_SERVER_ERROR).json({
      error: {
        name: err.name || 'Server Error',
        message: err.message || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else {
    res
      .status(StatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ error: err, body: req.body } as ErrorResponse);
  }
};
