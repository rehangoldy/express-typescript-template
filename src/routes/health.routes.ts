import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Memeriksa status kesehatan server dan koneksi database
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server dan database beroperasi dengan baik
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   example: 2026-10-21T07:00:00.000Z
 *                 uptime:
 *                   type: number
 *                   example: 120.45
 *                 database:
 *                   type: string
 *                   example: connected
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', HealthController.check);

export default router;
