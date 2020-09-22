import { Request, Response, NextFunction } from 'express';
import colors from 'colors';

import ErrorResponse from '@shared/errors/ErrorResponse';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response | void => {
  console.log(colors.red(err.stack || ''));

  res.status(err instanceof ErrorResponse ? err.statusCode : 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
