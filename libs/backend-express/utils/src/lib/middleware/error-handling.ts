import { Request, Response, NextFunction } from 'express';

import { StatusCode } from '@shared/common/enums';
import { ErrorResponse } from '@shared/common/types';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || StatusCode.HTTP_500_INTERNAL_SERVER_ERROR;

  if (typeof err === 'string') {
    res.status(status).json({
      error: {
        name: 'Server Error',
        message: err || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else if (err.message) {
    res.status(status).json({
      error: {
        name: err.name || 'Server Error',
        message: err.message || 'Internal Server Error',
      },
      body: req.body,
    } as ErrorResponse);
  } else {
    res.status(status).json({ error: err, body: req.body } as ErrorResponse);
  }
};
