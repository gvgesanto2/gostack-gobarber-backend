import { Request, Response, NextFunction } from 'express';

interface IAsyncMiddlewareFunction extends CallableFunction {
  (req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

const asyncHandler = (fn: IAsyncMiddlewareFunction) => (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
