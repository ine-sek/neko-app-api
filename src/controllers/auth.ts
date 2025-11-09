import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/authMiddleware';

const db = new sqlite3.Database('./nyaon_db.db');
// 環境変数から JWT_SECRETを取得
export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

// JWTのチェック
export const checkAuth = (req: AuthRequest, res: Response) : void => {
  if(req.userId && req.account){
    res.status(200).json({ result:true,message: '認証は有効です', userId: req.userId, account: req.account });
  }  else{
    res.status(401).json({ result:false,message: '再度ログインしてください' });
  }
};

// ユーザーのログアウト処理
export const logoutUser = async (req: Request, res: Response) : Promise<void> => {
res.status(200).json({result:true, message: '正常にログアウトしました' });
}

export const loginUser = async (req: Request, res: Response) : Promise<void> => {
  const { mail, password } = req.body;

  // ユーザーが入力したメールアドレスとパスワードを検証
  // if (!mail || !password) {
  //    res.status(400).json({result:false, message: 'メールアドレスとパスワードは必須です' });
  //    return;
  // }

    try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    await new Promise<void>((resolve, reject) => {

      db.get(
        'SELECT * FROM users WHERE mail = ?',
        [mail],
        async (err,result:any)=> {
          if (err) {
            console.error('ユーザーログインエラー:', err.message);
            res.status(500).json({result:false, message: 'サーバーエラーが発生しました' });
          }
          if (!result) {
              res.status(401).json({ result:false,message: 'メールアドレスまたはパスワードが間違っています' });
            }else{
              const passwordMatch = await bcrypt.compare(password, result.password);
            if(passwordMatch){
              // JWTトークンの生成
              const token = jwt.sign({ userId: result.id, account: result.account }, JWT_SECRET, { expiresIn: '1h' });
              res.status(200).json({result:true, message: 'ログイン成功',token:token,userId:result.id,account:result.account});
            }else{
              res.status(401).json({ result:false,message: 'メールアドレスまたはパスワードが間違っています' });
            }
          }
        }
      );
    });
    }catch (error) {
    console.error('ログイン処理エラー:', error);
    res.status(500).json({ result:false,message: 'サーバーエラーが発生しました' });
    }
}

// ユーザー登録処理
export const registerUser = async (req: Request, res: Response) : Promise<void>=> {
  const { mail, password, account } = req.body;

  if (!mail || !password) {
     res.status(400).json({ result:false,message: 'メールアドレスとパスワードは必須です' });
     return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await new Promise<void>((resolve, reject) => {
      db.run(
        'INSERT INTO users (mail, password, account) VALUES (?, ?, ?)',
        [mail, hashedPassword, account],
        function (err) {
          if (err) {
            console.error('ユーザー登録エラー:', err.message);
            if (err.message.includes('UNIQUE constraint failed: users.mail')) {
              res.status(409).json({ result:false,message: 'このメールアドレスは既に登録されています' });
            } else {
              res.status(500).json({ result:false,message: 'サーバーエラーが発生しました' });
            }
            reject(); // エラーの場合は reject を呼ぶ
          } else {
            res.status(201).json({ result:true,message: 'ユーザー登録が完了しました', userId: this.lastID });
            resolve(); // 成功の場合は resolve を呼ぶ
          }
        }
      );
    });
  } catch (error) {
    console.error('ユーザー登録処理エラー:', error);
    // Promise内でレスポンスを送信しているので、ここでは何もしない
  }
};