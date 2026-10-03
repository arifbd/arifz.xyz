# Verification — 4 October 2026

- Static checks passed for the homepage, CareDose page and policy: local links/assets exist, local fragment targets exist, no duplicate IDs, one H1 per page, valid JSON-LD.
- Sitemap XML parsed successfully; app and policy URLs are included.
- Title 27/30; short description 75/80; alternative short description 78/80; full description 2,923/4,000; first-release notes 247/500 (excluding trailing file newlines).
- Browser: desktop at 1440 and 1280 pixels, mobile at 390 pixels. No horizontal document overflow detected on the checked app/policy views; images loaded.
- Visual inspection: desktop hero, mobile gallery, FAQ, policy opening and desktop policy text.
- Interactions: FAQ expanded/collapsed; policy link and deletion section anchor worked; portfolio CareDose card navigated to the app page.
- Browser console: no errors returned for the tested tab.
- `git diff --check` passed.
- Supplied images copied unchanged; no replacement graphics generated.

Not verified by this task: fresh release AAB, Android device behaviour, reminder delivery, hosted production URLs, final Data safety declaration, Play approval, policy dark-mode rendering. These website checks do not substitute for the Android release checklist.
