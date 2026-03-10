# Anime Village (Native App)

Mobile app for **Anime Village** – same theme and API as the [anime-world](../anime-world) website. Build an APK to install on Android.

## Setup

1. **Install dependencies**
   ```bash
   cd anime-app-native
   npm install
   ```

2. **Optional: API URL**  
   Copy `.env.example` to `.env` and set your aniwatch-api URL (e.g. your deployed aniwatch-api or `http://localhost:4000` when running the API locally).
   ```bash
   cp .env.example .env
   ```

3. **Run the app**
   ```bash
   npx expo start
   ```
   Then press `a` for Android or `i` for iOS simulator.

## Theme

Uses the same colors as anime-world:

- **Background:** `#111827` (gray-900)
- **Foreground:** `#f9fafb`
- **Accent:** `#2563eb` (blue-600)
- **Cards / inputs:** gray-800, gray-700

Theme constants: `lib/theme.ts`  
API base URL and endpoints: `lib/api.ts`

## Build APK (Android)

1. Install EAS CLI (one-time): `npm install -g eas-cli`
2. Log in: `eas login`
3. Configure project: `eas build:configure`
4. Build APK: `eas build -p android --profile preview`  
   Or for a local build (no EAS): `npx expo run:android` (requires Android Studio / SDK).

The APK can be hosted on your anime-world site for download (e.g. a “Download app” page).

## Project structure

- `App.tsx` – root navigator (dark theme)
- `lib/theme.ts` – Anime Village color theme
- `lib/api.ts` – aniwatch-api base URL and endpoints
- `Auth.tsx` / `UsersPage.tsx` – existing screens (styled with theme)
