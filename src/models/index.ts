import { sequelize } from '../config/database';
import { User } from './user.model';

// Definisikan relasi antar model di sini jika diperlukan:
// Contoh: User.hasMany(Post, { foreignKey: 'userId' });

export {
  sequelize,
  User,
};
