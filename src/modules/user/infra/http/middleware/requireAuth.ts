import { Request, Response, NextFunction } from 'express';

import ErrorResponse from '@shared/errors/ErrorResponse';
import ITokenProvider from '@modules/user/providers/token-provider/models/ITokenProvider';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const requireAuth = (tokenProvider: ITokenProvider) => (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('JWT bearer token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = tokenProvider.verifyToken({
      token,
      secret: `${process.env.JWT_SECRET}`
    });

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new ErrorResponse('Not authorized to access this route', 401);
  }
};

export default requireAuth;
