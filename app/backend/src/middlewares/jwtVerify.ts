import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from './jwtConfig';

export default class jwtVerify {
  public valid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      verify(authorization, JWT_SECRET);

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
