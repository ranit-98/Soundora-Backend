import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/callback:
 *   post:
 *     summary: Google Authentication Callback
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid Google token
 */
router.post("/callback", authController.googleAuthCallback.bind(authController));

export default router;