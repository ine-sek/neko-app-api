import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/auth';


export interface AuthRequest extends Request {
  userId?: number;
  account?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction):void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> 形式

  if (token=== null || token === undefined) {
    res.sendStatus(401); // トークンがない場合は Unauthorized
  }else{
      jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
          return res.sendStatus(403); // トークンが無効な場合は Forbidden
        }

        req.userId = user.userId;
        req.account = user.account;
        next(); // 次のミドルウェアやルートハンドラーに進む
      });
    }
};