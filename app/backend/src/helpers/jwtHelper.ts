import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../middlewares/jwtConfig';

const validate = (token: string): string => {
  const decoded = verify(token, JWT_SECRET);
  return decoded as string;
};

export default validate;
