import { StatusCode } from '../enums';

export const asyncErrorHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next({
      status: StatusCode.HTTP_500_INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};
