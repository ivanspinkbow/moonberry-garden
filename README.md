# Ren's Strawberry Birthday Adventure

Open index.html in a browser to play. There are no dependencies or build steps. For a local HTTP preview, run python -m http.server 8000 from this folder and open http://localhost:8000. Browser progress is saved per origin, so the preview and deployed site have separate inventories.

## Make it personal

- Edit js/config.js for the protagonist's name, intro dialogue, birthday letter, keepsake captions, and achievements.
- The Fortnite memory quiz uses the three entries in `quizClips` in js/config.js. Put your MP4s in assets/videos/ as clip1.mp4, clip2.mp4, and clip3.mp4, or edit each `video` path. Set `pauseAt` to the question cue in seconds, including decimals if needed, and edit the question, four choices, and both feedback lines. The `answer` index runs from 0 (A) to 3 (D). The photo frames play clips 4–8 from the `memories` configuration.
- Put screenshots, MP4 clips, or music in assets/. Set the corresponding image, video, or music property to a relative path such as ./assets/favorite-match.mp4. The default music is an original synthesized loop that starts when the sound button is pressed. Update the browser-tab title in index.html if you change the name.
- Edit the palette variables at the top of css/style.css. Garden and sprite colors live in js/art.js.
- The site stores the berry inventory, achievements, and cake in localStorage. Use Reset progress in the footer to start fresh.

## GitHub Pages

The deployment target is https://github.com/ivanspinkbow/moonberry-garden. Authenticate as **ivanspinkbow** before committing or pushing, and set the commit name and email locally for this repository. Check `git remote -v`, `git config user.name`, `git config user.email`, and the authenticated account before each upload.

1. After the account and commit identity are verified and the upload is approved, push the site files to the repository's `main` branch. Keep index.html, .nojekyll, css/, js/, and assets/ at the repository root.
2. Open the repository's Settings → Pages. Set the source to Deploy from a branch, select main and /(root), and save.
3. Wait for the Pages deployment to finish. The expected URL is https://ivanspinkbow.github.io/moonberry-garden/. Verify the deployed page, video playback, and navigation before sharing it.

Keep all asset paths relative, such as `assets/videos/clip1.mp4` or `./css/style.css`, so they resolve under `/moonberry-garden/`. The site uses static files and needs no build step. The `.nojekyll` file tells Pages to serve them directly.

For later updates, edit and test locally, review `git diff`, confirm the same account and remote, then commit and push the intended changes to `main`. Pages republishes that branch automatically. Verify the new deployment after each upload.

Browser progress stays in localStorage on the device and origin where it was created. Local preview progress does not transfer to GitHub Pages. Future deployments keep progress on the same Pages origin unless the user clears it. The site does not upload player progress.

The repository and Pages website are public. Published dialogue and videos are downloadable by visitors. Keep credentials and original-video backups outside the project. Use H.264 video with AAC audio in MP4 files for broad browser compatibility, and keep MP4 metadata at the beginning of each file for streaming.

The cake is available from the first visit to the garden, including with zero strawberries. Five berries come from Strawberry Hunt and five are hidden around the scenes. The inventory includes hints. Catch six real presents to complete Present Catcher. Replays keep the same persistent rewards.
