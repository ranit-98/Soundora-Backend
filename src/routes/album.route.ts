import { Router } from "express";
import { AlbumController } from "../controllers/album.controller";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const albumController = new AlbumController();

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Get all albums
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: List of albums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 */
router.get("/", albumController.getAllAlbums.bind(albumController));

/**
 * @swagger
 * /api/albums/{albumId}:
 *   get:
 *     summary: Get an album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Album details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Album not found
 */
router.get("/:albumId", albumController.getAlbumById.bind(albumController));

export default router;