import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);
router.delete('/', authMiddleware, deleteProfile);

export default router;