# IKNPro — static site

Plain HTML/CSS/vanilla JS. No build step, no npm.

    index.html   all pages (hash-routed) + the 10 dialogs
    styles.css   styles (navy #14223D / orange #FF6F00, Plus Jakarta Sans)
    app.js       routing, dialogs, catalog filter, calculators, forms
    assets/      logos + photos (copied unchanged from the React project)

## Preview

    cd static-site
    python3 -m http.server 8000     # then open http://localhost:8000

Opening index.html directly (file://) also works. Pages: `#beranda`, `#katalog`,
`#pengadaan` (new), `#verifikasi`, `#portfolio`, `#legalitas`.

## Notes
- Forms (contact, registration, booth) are front-end only, as in the original; nothing is sent anywhere.
- Speaker photos load from Unsplash (as in the original); initials are shown if they can't load.
- Fonts load from Google Fonts; system-ui is the fallback.
