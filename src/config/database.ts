import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'express_ts_db';

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? false : false, // Ubah ke console.log jika ingin melihat SQL queries
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Berhasil terhubung ke database MySQL.');
    // Sinkronisasi model ke database
    await sequelize.sync({ alter: false });
    console.log('✅ Semua model Sequelize berhasil disinkronisasi.');
    return true;
  } catch (error: any) {
    console.error('⚠️  Gagal terhubung ke MySQL:', error?.message || error);
    console.warn('💡 Catatan: Pastikan service MySQL sudah berjalan dan database "' + dbName + '" sudah dibuat.');
    return false;
  }
};
