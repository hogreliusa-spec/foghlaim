# Foghlaim Gaeilge: installable app

Learn Irish step by step. This folder is a complete Progressive Web App (PWA): put it online once, then install it on Windows and Android like any other app. It works offline after the first visit.

## What's in the folder

| File | Purpose |
|---|---|
| `index.html` | The whole app: lessons, review, sounds guide, progress |
| `manifest.webmanifest` | App name, icon and colours, used when installing |
| `sw.js` | Service worker that lets the app run offline |
| `icons/` | App icons for Windows, Android and iOS |

## Step 1: Put it online (free, about 5 minutes)

An app can only be installed from an `https://` address, so the files need hosting. Pick one of these.

### Option A: Netlify Drop (easiest, no account needed to try)
1. Unzip this folder.
2. Go to https://app.netlify.com/drop
3. Drag the **foghlaim-pwa** folder onto the page.
4. Netlify gives you an address such as `https://something-random.netlify.app`. That's your app.
5. Create a free account when prompted, or the site expires after an hour. You can rename the address in Site settings.

### Option B: GitHub Pages
1. Create a free account at https://github.com and click **New repository**. Name it `foghlaim` and make it Public.
2. Click **uploading an existing file** and drag in everything *inside* the folder (`index.html`, `manifest.webmanifest`, `sw.js` and the `icons` folder). Click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch", choose `main` and `/ (root)`, then **Save**.
4. After a minute your app is at `https://YOUR-USERNAME.github.io/foghlaim/`.

## Step 2: Install it

### Windows (Edge or Chrome)
1. Open your app's address.
2. Click the **install icon** at the right end of the address bar (a monitor with a down arrow), or open the **⋯** menu → **Apps** → **Install this site as an app**.
3. Foghlaim gets its own window, a Start menu entry, and can be pinned to the taskbar.

### Android (Chrome)
1. Open your app's address in Chrome.
2. Tap **Install** on the banner, or open the **⋮** menu → **Install app** (on some phones: **Add to Home screen**).
3. It appears in your app drawer and opens full screen.

### iPhone or iPad (Safari)
Open the address in Safari, tap **Share** → **Add to Home Screen**.

## Moving progress between devices

Progress is saved on each device. To carry it over:
1. On the first device, open **Progress → Export progress**. This saves a small `.json` file.
2. Send the file to the other device (email, cloud drive, USB).
3. On the other device, open **Progress → Import progress** and choose the file.

## Pronunciation

Irish words and phrases are spoken by the abair.ie speech synthesiser (Trinity College Dublin). New phrases play as they appear, and the answer plays after each question. Press the speaker button, or the P key, to hear it again. Under **Progress → Pronunciation** you can pick a voice (Connemara, Munster or Ulster; female or male), slow the speech down, or turn automatic playback off. Each phrase also has an **Open on abair.ie** link.

## Offline use

After you've opened the app once online, lessons, review and the Sounds guide work with no connection. Audio needs the internet the first time each phrase plays; after that it's saved and plays offline too.

## Updating the copy on GitHub Pages

1. In your repository, click **Add file → Upload files**.
2. Drag in the new `index.html`, `sw.js` and `README.md` (they replace the old ones) and click **Commit changes**.
3. Wait a minute, then open the app and reload it once or twice. The new version takes over on the next launch.

## Updating the app yourself

If you change any file, open `sw.js` and raise the version number in `const VERSION = "foghlaim-v2"` (to `foghlaim-v3` and so on), then upload again. Installed copies pick up the new version the next time they're opened with a connection, and show it on the launch after that.

## Going further: store packages

Once the app is online you can turn it into real store packages for free at https://www.pwabuilder.com. Paste your app's address and it generates:
- an **Android** package (`.apk` to install directly, or `.aab` for the Google Play Store, which has a one-time $25 developer fee), and
- a **Windows** package (`.msix`) for the Microsoft Store or direct install.
