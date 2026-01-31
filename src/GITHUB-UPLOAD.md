# How to Upload This Project to GitHub

## 1. Create a new repo on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click **"+"** (top right) → **"New repository"**.
3. Choose a name (e.g. `bot-detect`).
4. Choose **Public** (or Private).
5. **Do not** check "Add a README" (you already have code).
6. Click **"Create repository"**.

## 2. Open a terminal in the project folder

Use the **parent** folder (the one that contains `src`), not only `src`:

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master
```

If your Git repo is only inside `src`, use:

```bash
cd /Users/dhruvilacharya/Documents/Project/bot-detect-master/src
```

## 3. Initialize Git (if not already)

Check if Git is set up:

```bash
git status
```

- If you see "not a git repository": run `git init`.
- If you see a list of files: Git is already initialized; skip to step 4.

To init and add a remote in one go:

```bash
git init
git add .
git commit -m "Initial commit: bot-detect library and demo"
```

## 4. Add GitHub as remote and push

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Example:

```bash
git remote add origin https://github.com/dhruvilacharya/bot-detect.git
git branch -M main
git push -u origin main
```

If the repo already had a remote:

```bash
git remote -v
# If 'origin' exists and points to the wrong URL:
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 5. If you get "Permission denied" or auth errors

- **HTTPS:** GitHub may ask for username + **Personal Access Token** (not your password).  
  Create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token. Use the token as the password when `git push` asks.

- **SSH:** Use an SSH URL and an SSH key:
  ```bash
  git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
  git push -u origin main
  ```

## Quick checklist

| Step | Command |
|------|--------|
| Go to project root | `cd .../bot-detect-master` (or `.../bot-detect-master/src` if repo is there) |
| Init (if needed) | `git init` |
| Add files | `git add .` |
| Commit | `git commit -m "Initial commit"` |
| Add remote | `git remote add origin https://github.com/USER/REPO.git` |
| Push | `git push -u origin main` |

The `.gitignore` in `src` keeps `node_modules/` and `dist/` out of the repo so they are not uploaded.
