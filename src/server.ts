import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDatabase, sequelize } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Hubungkan ke database MySQL
    await connectDatabase();

    // Jalankan server Express
    const server = app.listen(PORT, () => {
      console.log(`================================================`);
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
      console.log(`📖 Swagger API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`================================================`);
    });

    // Graceful Shutdown
    const handleShutdown = async (signal: string) => {
      console.log(`\n🛑 Menerima sinyal ${signal}. Menutup server...`);
      server.close(async () => {
        try {
          await sequelize.close();
          console.log('🔒 Koneksi database ditutup dengan aman.');
        } catch (err) {
          console.error('Error saat menutup database:', err);
        }
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Gagal menjalankan server:', error);
    process.exit(1);
  }
};

startServer();
