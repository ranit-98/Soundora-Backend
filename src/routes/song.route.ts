import { Router } from "express";
import { SongController } from "../controllers/song.controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const songController = new SongController();

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs (Admin only)
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.get("/", protectRoute, requireAdmin, songController.getAllSongs.bind(songController));

/**
 * @swagger
 * /api/songs/featured:
 *   get:
 *     summary: Get featured songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of featured songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get("/featured", songController.getFeaturedSongs.bind(songController));

/**
 * @swagger
 * /api/songs/made-for-you:
 *   get:
 *     summary: Get made-for-you songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of made-for-you songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get("/made-for-you", songController.getMadeForYouSongs.bind(songController));

/**
 * @swagger
 * /api/songs/trending:
 *   get:
 *     summary: Get trending songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of trending songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get("/trending", songController.getTrendingSongs.bind(songController));

export default router;