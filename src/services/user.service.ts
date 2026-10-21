import { User, UserCreationAttributes } from '../models/user.model';

export class UserService {
  public static async findAll(): Promise<User[]> {
    return await User.findAll({
      order: [['id', 'DESC']],
    });
  }

  public static async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  public static async create(userData: UserCreationAttributes): Promise<User> {
    return await User.create(userData);
  }

  public static async update(id: number, updateData: Partial<UserCreationAttributes>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    await user.update(updateData);
    return user;
  }

  public static async delete(id: number): Promise<boolean> {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
