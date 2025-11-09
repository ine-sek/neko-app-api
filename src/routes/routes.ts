import express, { Router } from 'express';
import { logoutUser,loginUser, registerUser,checkAuth } from '../controllers/auth'; // コントローラーの関数をインポート
import { authenticateToken } from '../middleware/authMiddleware';
import { registerCat } from '../controllers/cats';


const router = Router();
// 認証系
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/auth/check', authenticateToken, checkAuth);


// 猫の情報登録API（認証が必要）
router.post('/cats/register', authenticateToken, registerCat);

export default router;