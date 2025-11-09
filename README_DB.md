# DB

```
// コンソールでDBに入る
sqlite3 nyaon_db.db
```

## ユーザー情報

```
CREATE TABLE users (;
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mail TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    account TEXT,
    auth_provider TEXT DEFAULT 'email',
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME
);
```

## 猫情報

cats.owner_id === users.id

```
CREATE TABLE IF NOT EXISTS cats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```
