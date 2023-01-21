import ILogin from '../interfaces/ILogin';
import userModel from '../database/models/User';

export default class UserModel {
  private model = userModel;

  public async findOne(email: string): Promise<ILogin> {
    const result = await this.model.findOne({ where: { email } });
    return result as ILogin;
  }
}
