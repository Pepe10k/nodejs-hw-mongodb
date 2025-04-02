import { Router } from 'express';
import authController from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(authController.register),
);

router.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(authController.login),
);

router.post('/refresh', ctrlWrapper(authController.refresh));

router.post('/logout', ctrlWrapper(authController.logout));

export default router;