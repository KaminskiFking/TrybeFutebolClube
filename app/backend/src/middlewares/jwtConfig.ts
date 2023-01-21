/* eslint-disable linebreak-style */

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const config: object = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

export { JWT_SECRET, config };
