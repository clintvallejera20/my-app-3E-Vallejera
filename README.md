# IT304 Project: Student Guide

You are a **developer**. Your instructor is the **project manager (PM)**.
You build your assigned system in this repo; the PM reviews and releases it.

| Branch | Goes live at | Who controls it |
|---|---|---|
| `dev` | **Staging**: `https://3e-vallejera-dev.aws-deployhost.online` | You. Push anytime; it updates automatically within ~10 minutes. |
| `main` | **Production**: `https://3e-vallejera.aws-deployhost.online` | The PM. Changes arrive by pull request and go live when the PM releases them. |

Your 3e-vallejera, project status and deploy history: **https://aws-deployhost.online**
Your deploy log and PHP errors: the **private log link** your instructor sends you (don't share it).

---

## 1. Folder layout (don't rename these)

```
frontend/            React app (Vite)
  src/               your React code
  dist/              BUILT app. You must commit this!
api/                 your PHP files (one file per resource, e.g. notes.php)
  db.php             database connection + helpers (require it in every API file)
database.sql         your tables + sample data
```

## 2. First-time setup on your laptop (XAMPP)

1. Clone the repo **into XAMPP's htdocs**:
   - Windows: `C:\xampp\htdocs\`
   - Mac: `/Applications/XAMPP/xamppfiles/htdocs/`
   ```bash
   git clone https://github.com/mit-adrian/it304-3e-vallejera-clint-john.git
   cd it304-3e-vallejera-clint-john
   git checkout dev
   ```
2. Start **Apache** and **MySQL** in XAMPP.
3. In **phpMyAdmin** (http://localhost/phpmyadmin): create a database named `it304_local`, then **Import** `database.sql`.
4. Copy `api/config.local.example.php` to `api/config.local.php`. Edit it only if your MySQL password isn't empty.
5. Check the API: open `http://localhost/it304-3e-vallejera-clint-john/api/health.php`. You should see `"db":"ok"`.
6. Run the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open the link it shows (usually http://localhost:5173). The example Notes app should load.

## 3. Daily workflow

```bash
git checkout dev            # always work on dev
# ...code...
cd frontend && npm run build && cd ..     # REQUIRED before every push
git add .
git commit -m "Add request form"
git push
```
Within ~10 minutes your **staging** link shows the new version. Test it there.

### Ready for the PM to review?
1. On GitHub: **Pull requests → New pull request → base: `main` ← compare: `dev`**
2. Fill in the checklist and click **Create pull request**.
3. The PM reviews it. If there are comments, fix them on `dev` and push; the PR updates by itself.
4. After approval and merge, the PM **releases** it to production.

## 4. Rules that make deployment work

- **Always build before pushing:** `npm run build` inside `frontend/`, then commit `frontend/dist`. No `dist` means a failed deploy.
- **Call your API with relative paths only:** `fetch('/api/requests.php')` or use `api.get('requests.php')` from `src/api.js`.
  Never write `http://localhost/...` in React code.
- **Start every PHP file in `api/` with** `require __DIR__ . '/db.php';` and use `db()` for queries.
  Always use **prepared statements**: `db()->prepare('... WHERE id = ?')->execute([$id])`.
- **Put every table and sample row in `database.sql`.**
  - No `CREATE DATABASE` and no `USE` lines; the server picks your database.
  - When `database.sql` changes, the server **resets your tables** and imports it again.
- **Never commit passwords.** `api/config.local.php` is already in `.gitignore`. On the server, a separate config is provided for you.
- **React Router works:** any non-file URL serves `index.html`.
- **Store passwords with** `password_hash()` / `password_verify()`, never as plain text.

## 5. When something breaks

| Symptom | Where to look / fix |
|---|---|
| Status page says *"No built frontend found"* | You forgot `npm run build` or didn't commit `frontend/dist` |
| Page loads but data doesn't | Open `/api/health.php` on your staging link; check **PHP errors** on your private log page |
| `database.sql import failed` | SQL error in `database.sql`; test-import it in phpMyAdmin first |
| Works locally, not on staging | A `localhost` URL in your code, or a table missing from `database.sql` |
| Staging didn't update | Did you push to **dev**? Wait 10 minutes, then check the status page |
| Blank page | Open the browser console (F12). Usually a JS error, or `dist` not rebuilt |

## 6. Adding a new API resource (example)

```php
<?php // api/requests.php
require __DIR__ . '/db.php';
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    json_out(db()->query('SELECT * FROM requests ORDER BY id DESC')->fetchAll());
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $in = json_in();
    db()->prepare('INSERT INTO requests (name, purpose) VALUES (?, ?)')->execute([$in['name'] ?? '', $in['purpose'] ?? '']);
    json_out(['id' => (int)db()->lastInsertId()], 201);
}
json_out(['error' => 'Method not allowed'], 405);
```
```jsx
// in React
const rows = await api.get('requests.php')
await api.post('requests.php', { name, purpose })
```
And add the `requests` table to `database.sql`.
