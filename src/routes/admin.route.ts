import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const adminController = new AdminController();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs (requires admin privileges)
 */

/**
 * @swagger
 * /api/admin/check:
 *   get:
 *     summary: Check if the user is an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: boolean
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.get("/check", protectRoute, requireAdmin, adminController.checkAdmin.bind(adminController) as import("express").RequestHandler);

/**
 * @swagger
 * /api/admin/songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               albumId:
 *                 type: string
 *               duration:
 *                 type: number
 *               audioFile:
 *                 type: string
 *                 format: binary
 *               imageFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Song created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Missing required files
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.post("/songs", protectRoute, requireAdmin, adminController.createSong.bind(adminController) as import("express").RequestHandler)

/**
 * @swagger
 * /api/admin/songs/{id}:
 *   delete:
 *     summary: Delete a song by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Song not found
 */
router.delete("/songs/:id", protectRoute, requireAdmin, adminController.deleteSong.bind(adminController) as import("express").RequestHandler);

/**
 * @swagger
 * /api/admin/albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               releaseYear:
 *                 type: number
 *               imageFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Album created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       400:
 *         description: Missing required files
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 */
router.post("/albums", protectRoute, requireAdmin, adminController.createAlbum.bind(adminController) as import("express").RequestHandler);

/**
 * @swagger
 * /api/admin/albums/{id}:
 *   delete:
 *     summary: Delete an album by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Album not found
 */
router.delete("/albums/:id", protectRoute, requireAdmin, adminController.deleteAlbum.bind(adminController) as import("express").RequestHandler);

export default router;