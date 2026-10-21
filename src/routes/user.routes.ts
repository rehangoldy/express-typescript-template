import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Mendapatkan semua daftar user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Daftar user berhasil diambil
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Menambahkan user baru
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Input tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Kesalahan pada server
 */
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Mendapatkan detail user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang dicari
 *     responses:
 *       200:
 *         description: Detail user berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Detail user berhasil diambil
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Format ID tidak valid
 *       404:
 *         description: User tidak ditemukan
 *
 *   put:
 *     summary: Memperbarui data user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang akan diperbarui
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User berhasil diperbarui
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Format ID tidak valid
 *       404:
 *         description: User tidak ditemukan
 *
 *   delete:
 *     summary: Menghapus user berdasarkan ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang akan dihapus
 *     responses:
 *       200:
 *         description: User berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User dengan ID 1 berhasil dihapus
 *       400:
 *         description: Format ID tidak valid
 *       404:
 *         description: User tidak ditemukan
 */
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
