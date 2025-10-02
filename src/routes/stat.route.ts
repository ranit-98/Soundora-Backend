import { Router } from "express";
import { StatController } from "../controllers/stat.controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const statController = new StatController();

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get platform statistics (Admin only)
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Platform statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAlbums:
 *                   type: number
 *                 totalSongs:
 *                   type: number
 *                 totalUsers:
 *                   type: number
 *                 totalArtists:
 *                   type: number
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.get("/", protectRoute, requireAdmin, statController.getStats.bind(statController));

export default router;