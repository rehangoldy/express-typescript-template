import { Request, Response } from 'express';
import { sequelize } from '../config/database';

export class HealthController {
  public static async check(req: Request, res: Response): Promise<void> {
    let dbStatus = 'disconnected';
    try {
      await sequelize.authenticate();
      dbStatus = 'connected';
    } catch {
      dbStatus = 'disconnected';
    }

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
    });
  }
}
