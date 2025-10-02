import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { HTTP_STATUS } from "../constants/httpStatus";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users except the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 */
router.get("/", protectRoute, userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /api/users/messages/{userId}:
 *   get:
 *     summary: Get messages between current user and another user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 */
router.get("/messages/:userId", protectRoute, userController.getMessages.bind(userController));

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get details of a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       404:
 *         description: User not found
 */
router.get("/:userId", protectRoute, userController.getUserDetails.bind(userController));

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - No token provided or invalid token
 *       403:
 *         description: Forbidden - Cannot edit another user's profile
 *       404:
 *         description: User not found
 */
router.put("/:userId", protectRoute, userController.updateUserDetails.bind(userController));

export default router;