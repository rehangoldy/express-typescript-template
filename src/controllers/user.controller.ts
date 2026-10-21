import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.findAll();
      res.status(200).json({
        success: true,
        message: 'Daftar user berhasil diambil',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Format ID tidak valid',
        });
        return;
      }

      const user = await UserService.findById(id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: `User dengan ID ${id} tidak ditemukan`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Detail user berhasil diambil',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, role } = req.body;

      if (!name || !email) {
        res.status(400).json({
          success: false,
          message: 'Nama dan email wajib diisi',
        });
        return;
      }

      // Periksa apakah email sudah terdaftar
      const existingUser = await UserService.findByEmail(email);
      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'Email sudah terdaftar',
        });
        return;
      }

      const newUser = await UserService.create({ name, email, role });
      res.status(201).json({
        success: true,
        message: 'User berhasil dibuat',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Format ID tidak valid',
        });
        return;
      }

      const { name, email, role } = req.body;
      const updatedUser = await UserService.update(id, { name, email, role });

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: `User dengan ID ${id} tidak ditemukan`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User berhasil diperbarui',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(String(req.params.id), 10);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Format ID tidak valid',
        });
        return;
      }

      const isDeleted = await UserService.delete(id);
      if (!isDeleted) {
        res.status(404).json({
          success: false,
          message: `User dengan ID ${id} tidak ditemukan`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `User dengan ID ${id} berhasil dihapus`,
      });
    } catch (error) {
      next(error);
    }
  }
}
