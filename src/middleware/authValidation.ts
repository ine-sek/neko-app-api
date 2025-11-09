import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// ユーザー登録用のバリデーションルール
export const registerValidation = [
  body('mail')
    .notEmpty().withMessage('メールアドレスは必須だよ！')
    .isEmail().withMessage('有効なメールアドレス形式じゃないよ！'),
  body('password')
    .notEmpty().withMessage('パスワードは必須だよ！')
    .isLength({ min: 8 }).withMessage('パスワードは最低8文字必要だよ！'),
  body('account') // accountも追加した方がいいね！
    .notEmpty().withMessage('アカウント名は必須だよ！')
    .isLength({ min: 3, max: 20 }).withMessage('アカウント名は3文字以上20文字以内だよ！'),
];

// ログイン用のバリデーションルール
export const loginValidation = [
  body('mail')
    .notEmpty().withMessage('メールアドレスは必須だよ！')
    .isEmail().withMessage('有効なメールアドレス形式じゃないよ！'),
  body('password')
    .notEmpty().withMessage('パスワードは必須だよ！'),
];

// バリデーション結果をチェックするミドルウェア
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // エラーがなければ次のミドルウェアへ
  }
  // エラーがあれば、ここでまとめてレスポンスを返す
  const extractedErrors: { [key: string]: string } = {};
  errors.array().map(err => {
    if (err.type === 'field') {
      extractedErrors[err.path] = err.msg;
    }
  });

  return res.status(422).json({
    result: false,
    message: '入力値にエラーがあるよ！',
    errors: extractedErrors, // どの項目がエラーか分かりやすく！
  });
};