import { StatusCode } from '@shared/common/enums';
import { NextFunction, Request, Response } from 'express';

type AsyncEndpointHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncErrorHandler =
  (fn: AsyncEndpointHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        next({
          status: StatusCode.HTTP_500_INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      } else {
        // Handle NonError objects
        next({
          status: StatusCode.HTTP_500_INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred',
        });
      }
    }
  };
