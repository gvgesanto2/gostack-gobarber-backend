import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ErrorResponse from '../errors/ErrorResponse';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('JWT bearer token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, `${process.env.JWT_SECRET}`);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new ErrorResponse('Not authorized to access this route', 401);
  }
};

export default requireAuth;
