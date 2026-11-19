# Running the Atlas

Use Node 22.14 or newer with node:sqlite. Run npm install, npm run build, then npm start with a writable persistent ATLAS_DATA_DIR. The Node server serves both editions, the journal, its share images, and the receiver. Use HTTPS for a public deployment. Set SITE_URL to the public origin at build time.

## Private sequences

Run `./scripts/configure-owner.ps1` privately in PowerShell. The setup stores SHA-256 digests of your sequences and answer in your Windows user environment. Choose independently generated high-entropy values and save them in your password manager. For hosting, provision ATLAS_OWNER_HASH, ATLAS_QUESTION, ATLAS_ANSWER_HASH, ATLAS_PASSWORD_KEY, ATLAS_PIPER_HASH and ATLAS_BONUS_HASH through your host's secret manager. Digests of weak phrases can be guessed offline. Keep the host environment and database private.

Privately invoke the masked entry field with Ctrl + Alt + Space, or hold a page title for just over one second. Enter the sequence you chose. Publishing requires the one-use question challenge and your independent password before the 30-minute session opens. The password verifier uses a unique salt and 600,000 PBKDF2-SHA256 iterations. Piper uses its own configured sequence and session. End session signs out. Public messages to Piper use a separate endpoint. The bonus sequence opens the Bengaluru district. The city also opens through the editorial footer mark. Navigation and discovered public rooms are inspectable. Your own browser handles what you type, so use a trusted device.

## Companion and shelves

Set OPENAI_API_KEY in the server environment to enable conversational replies with public portfolio context. Recent turns stay briefly in server memory. Safety flags record a category without logging the conversation. OPENAI_MODEL selects the Responses-compatible model. Without a key, the receiver uses local search. The default global budget is 100 model requests per 24-hour window. PIPER_DAILY_LIMIT can lower it. This release runs one Node deployment with a persistent SQLite volume. Back up the volume to retain posts.

Optional public profile URLs are ATLAS_IMDB_URL, ATLAS_LETTERBOXD_URL, ATLAS_ANILIST_URL, ATLAS_STEAM_URL and ATLAS_EPIC_URL. Publish journal entries under Watching, Reading, Playing, Recommendation or Thought to stock the corresponding city venues. Configured profiles appear at their respective venues and on the rooftop. The site links directly to your activity on each service.
