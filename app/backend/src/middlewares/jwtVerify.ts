import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from './jwtConfig';

export default class jwtVerify {
  public valid = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      verify(token, JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
