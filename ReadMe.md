# サーバー起動
```
npm run dev
(nodemon index.js)
(node index.js)
```
Server listening at http://localhost:3000
これが表示されればOK

# index.js
ポート番号を指定している
app.get()でget

# インストールしたライブラリ
以下を npm install した
express: Webアプリケーションフレームワーク
body-parser: リクエストのbody部分を扱う
sqlite3: SQLiteデータベースを操作する
bcrypt: パスワードを安全にハッシュ化する
express-session: セッション管理
cookie-parser: Cookieを扱う


# 作成手順
1. package.jsonの作成
npm init -y
2. Expressのインストール
npm install express
3. index.jsの作成
```
const express = require('express');
    const app = express();
    const port = 3000;
    app.use(express.json());
    
    app.get('/api/data', (req, res) => {
      const data = { message: 'Hello from Node.js and Express!' };
      res.json(data);
    });

    app.post('/api/data', (req, res) => {
        const userId= req?.body?.userId;
        const data = {
            message: 'Hello from Node.js and Express!',
            userId: userId ??'undefined',
            req: req.body 
         };
      
        if (userId === 1) {
          data.said = 'ハロー';
        } else if (userId === 2) {
          data.said = 'こんばんは';
        }
      res.json(data);
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
```
4. nodemonのインストール
npm install -g nodemon
5. サーバー起動
nodemon index.js
6. おわり
index.jsの内容を変更した場合、nodemonが自動でサーバーの再起動を行ってくれる

7. TypeScriptにしたい
npm install typescript @types/node @types/express --save-dev
8. tsconfig.jsonの作成
npx tsc --init
9. index.jsをindex.tsに変更
手動で変更
10. タイプスクリプトに内容を変更する
import express, { Request, Response } from 'express';を利用

11. tsファイルでもnodemon使う
npm install nodemon ts-node --save-dev
12. package.jsonの内容を変更する
"scripts": {の中に追記
  "dev": "nodemon --exec ts-node index.ts"
}
13. 実行する
npm run dev

14. おわり
型は一旦anyになった笑

## ついでにdelayを入れる
async awaitを追記した