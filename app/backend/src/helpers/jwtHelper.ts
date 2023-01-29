import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../middlewares/jwtConfig';

export default class validate {
  public valid = async (token: string): Promise<string> => {
    const decoded = verify(token, JWT_SECRET);
    return decoded as string;
  };
}
