import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { AuthRequest } from '../middleware/authMiddleware';


const db = new sqlite3.Database('./nyaon_db.db');

export const registerCat = async (req: AuthRequest, res: Response) : Promise<void> => {
    const { name, breed,age } = req.body;
    const ownerId =req.userId;

    // バリデーションチェック
    if (!name ) {
    res.status(400).json({ message: '名前は必須です。' });
    return;
    }
    if (!ownerId ) {
    res.status(400).json({ message: '認証が必要です。' });
    return;
    }
    db.run(
    'INSERT INTO cats (name, breed, age, owner_id) VALUES (?, ?, ?, ?)',
    [name, breed, age, ownerId],
    function(err){
        if (err) {
            console.error('ユーザーログインエラー:', err.message);
            res.status(500).json({ message: 'サーバーエラーが発生しました。' });
            return
        }
        res.status(201).json({ message: '情報を登録しました。',catId:this.lastID});
    }
    );


}
