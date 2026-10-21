import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.originalUrl}' tidak ditemukan. Silakan cek dokumentasi di /api-docs`,
  });
};
