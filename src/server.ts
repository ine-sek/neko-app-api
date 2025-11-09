import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/routes'; // routes.ts をインポート

const app = express();
const port = 3001;

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ルーティングの設定
app.use('/', authRoutes); // 例えば、すべてのauth関連のルートを '/' にマウント

app.get('/', (req, res) => {
  res.send('Hello World from TypeScript!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});