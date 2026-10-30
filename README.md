# Pathdb Analyzer

Pathdb Analyzer is a web tool for running RPQ queries on PathDB and visualizing their logical and physical execution plans, the graph schema, and per-query statistics.

This repository contains **the frontend only** (Vue 3 + Vite, in [`frontend/`](frontend/README.md)). The **backend** (`app.jar`) and the **sample databases** are distributed separately on Google Drive:

**Drive folder:** <https://drive.google.com/drive/folders/14QjAKnFvCb2h1mj_J3C8n2w9gXloeH0z>

## Ports

| Port | What runs there | When |
|---|---|---|
| 8080 | Backend (`app.jar`) | Always |
| 5173 | Frontend dev server (`npm run dev`) | Development |
| 9090 | Frontend production build served by PM2 | Production |

You only use one frontend port at a time: **5173 while developing, 9090 once you build and deploy with PM2**.

## Requirements

- Linux (Ubuntu, Debian, etc.) or Windows 10/11, with 8 GB of RAM
- A terminal (Terminal on Linux, PowerShell on Windows) and an internet connection for the installation
- Git (to clone this repository; alternatively, download it as a ZIP from GitHub)
- Node.js 20.19 or newer, or 22.12 or newer (includes `npm`)
- Java 21 or newer (the backend is compiled with Java 21)
- Python 3 + `gdown` (optional, only to download the Drive folder from the terminal)
- PM2 (optional, only for the production deployment)
- A web browser

**Linux:**

```bash
sudo apt update && sudo apt install -y git curl ca-certificates gnupg python3 python3-pip openjdk-21-jdk
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2   # optional
```

**Windows**

Everything below is typed in **PowerShell** (Start menu → type "PowerShell" → open it; no administrator rights needed unless an installer asks for them).

1. **Install the basic tools.** `winget` ships with Windows 11 and recent Windows 10 (it comes with "App Installer" from the Microsoft Store). Check that it exists with `winget --version`. If it does not, install each program from its website instead (links in the table below).

   | Tool | Why it is needed | `winget` command | Manual download |
   |---|---|---|---|
   | Git | Clone this repository (skip it if you download the ZIP from GitHub instead) | `winget install -e --id Git.Git` | <https://git-scm.com/download/win> |
   | Java 21 (JDK) | Runs the backend `app.jar` | `winget install -e --id Microsoft.OpenJDK.21` | <https://learn.microsoft.com/java/openjdk/download> |
   | Node.js (LTS) | Installs and runs the frontend (includes `npm`) | `winget install -e --id OpenJS.NodeJS.LTS` | <https://nodejs.org> |
   | Python 3 | Only for `gdown`; skip it if you download the Drive folder from the browser | `winget install -e --id Python.Python.3.12` | <https://www.python.org/downloads/> |

2. **Close and reopen PowerShell.** Newly installed programs are only found by terminals opened after the installation.

3. **Check that everything is installed:**

   ```powershell
   git --version
   java -version      # must report 21 or newer
   node --version     # must report v20.19 or newer, or v22.12 or newer
   npm --version
   python --version   # only if you installed Python
   ```

   If a command is reported as "not recognized", the program is not installed or the terminal was not reopened.

4. **Optional, production only:** install PM2 with `npm install -g pm2`.

Notes for Windows:

- The first time the backend runs, Windows Defender Firewall may ask for permission for Java. Allow it on **private networks**, otherwise the browser cannot reach the backend.
- If PowerShell refuses to run `npm` or `pm2` with an "execution policy" / "running scripts is disabled" error, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use **CMD** instead of PowerShell.
- Keep the PowerShell window running the backend open: closing it stops the backend (use a second window for the frontend).
- PM2 on Windows keeps the frontend running in the background, but it does not restart it automatically after rebooting the computer; run the `pm2 serve ...` command again.

## 1. Download the backend

Download the Drive folder from your browser, or from the terminal:

```bash
# Linux
pip3 install gdown --break-system-packages
gdown --folder https://drive.google.com/drive/folders/14QjAKnFvCb2h1mj_J3C8n2w9gXloeH0z -O ./pathdb-backend
```

```powershell
# Windows (PowerShell)
pip install gdown
gdown --folder https://drive.google.com/drive/folders/14QjAKnFvCb2h1mj_J3C8n2w9gXloeH0z -O .\pathdb-backend
```

If you download it from the browser, unzip it and make sure `app.jar` and `databases` end up directly inside the folder (no extra nested folder).

You should end up with this structure:

```text
pathdb-backend/
├── app.jar        # backend
└── databases/     # users and sample graphs
```

## 2. Start the backend

The backend looks for `databases/` **relative to the directory it is started from**, so run it from the folder that contains both `app.jar` and `databases/`:

```bash
cd pathdb-backend
java -jar app.jar
```

The command is the same on Linux and Windows (PowerShell or CMD). It listens on port **8080**. Stop it with `CTRL + C`. To update the backend, replace `app.jar` with the new release, keeping the same name.

## 3. Start the frontend

```bash
git clone <this-repository-url>
cd pathdb-analyzer/frontend
npm install
```

**Development** (hot reload, http://localhost:5173). Requests to `/api` are proxied to the backend at `localhost:8080`:

```bash
npm run dev
```

**Production** (http://localhost:9090). The commands are the same on Linux and Windows:

```bash
npm run build
pm2 serve dist 9090 --name "pathdb-analyzer" --spa
pm2 stop pathdb-analyzer   # to stop it
```

On Windows, if PowerShell blocks `npm` or `pm2` with an execution-policy error, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use CMD instead.

## Basic usage

1. Open the frontend in your browser. On the login screen enter the backend host (`localhost` if it runs on the same machine), your username and password. Credentials are managed by the backend (`databases/users` in the Drive folder); this repository does not include any.
2. Pick the active database in the popup.
3. Explore the graph in **Visual Schema** and **Graph Info**. Clicking a node or edge shows its properties in **Object Viewer**.
4. Type an RPQ query in the top bar (it validates the syntax and suggests completions), or try **Examples**, then press **Run Query**.
5. Check the results in **Query Results** (**See Path** opens the path graphically) and the plans in **Statistics**, **Raw Logical Tree**, **Optimized Tree** and **Physical Tree**.

## Repository layout

| Path | Contents |
|---|---|
| `frontend/` | Frontend source code; its [README](frontend/README.md) describes each component |
| `LICENSE` | Project license |

## License

See [LICENSE](LICENSE).
