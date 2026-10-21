import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('💥 Error terdeteksi:', err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
