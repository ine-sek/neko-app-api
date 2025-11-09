import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');

    const app = express();
    const port = 3003;

    app.use(express.json());
    // body-parserの設定
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    // 下記は別のプロジェクト
    app.get('/api/data', (req:Request<{}, {}, {}>, res:Response) => {
      const data = { message: 'Hello!! from Node.js and Express!',
        type:'GET', };
      res.json(data);
      
    });

    app.post('/api/data', (req:Request<{}, {}, any>, res:Response) => {
        const userId= req?.body?.userId;
        const data = {
            message: 'Hello from Node.js and Express!',
            userId: userId ??'undefined',
            req: req.body,
            said:''
         };
      
        if (userId === 1) {
          data.said = 'ハロー';
        } else if (userId === 2) {
          data.said = 'こんばんは';
        }
      res.json(data);
    });

    // 2秒間待機する関数
    const delay = (s: number) => new Promise(resolve => setTimeout(resolve, s*1000));

    app.post('/api/data2', async(req:Request<{}, {}, any>, res:Response) => {
      const userId= req?.body?.userId;
      console.log(userId??'userId');
        const data = {
            message: 'data2 Hello from Node.js and Express!',
            userId: userId ??'undefined',
            req: req.body,
            said:''
         };
      
        if (userId === 1) {
          data.said = 'ハロー';
        } else if (userId === 2) {
          data.said = 'こんばんは';
        }
        await delay(2);

      res.json(data);
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });