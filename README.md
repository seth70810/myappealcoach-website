# MyAppealCoach.com

Static site. No build step.

## Files
- `index.html` — homepage
- `fantasy-moot.html` — historic cases to argue; linked from both homepage Fantasy Moot buttons
- `faq.html`, `write-your-brief.html`, `oral-argument.html` — main pages
- `local-rules.html`, `style-guides.html`, `recordings.html` — resource pages
- `contact.html` — contact page (email link, no form)
- `style.css` — shared stylesheet for every page
- `nav.js` — mobile nav toggle
- `case-video.js` — Fantasy Moot only: click a case photo to load its video
- `justice-bios.js` — hover biographies for the justice portraits (homepage + Brown card)
- `img/` — all images, served locally; no CDN dependency (see `IMAGES.md`)

## Justice biographies
`justice-bios.js` holds a name, dates of service and three sentences for all 29 portraits, and
shows them in one shared panel on hover. Entries are keyed by the last two path segments of the
image — `justices/jackson.jpg` is Ketanji Brown Jackson, `brown-court/jackson.jpg` is Robert H.
Jackson, so the folder is part of the key.

Edit the text in that file; no HTML changes are needed. The portraits carry no `title`
attribute on purpose — a native tooltip would fire on top of the panel.

**Hover only.** Touch devices and keyboard-only users will not see the biographies; names remain
available to screen readers via `alt`. Ask if you want a tap/click-to-open variant.

## Fantasy Moot
Six cases are written into the page — Brown, Gideon, Miranda, Loving, Youngstown and Tinker —
but **only Brown is currently showing.**

### Bringing the other five back
1. Delete the `hidden` attribute from each of the five `<li class="case-card" hidden>`.
2. Delete `is-solo` from `<div class="fm-column is-solo">`.

That restores the two-up grid at full column width. Each of the five also needs a photo
(`img/fantasy/README.md`) and a working "Argue the Case" link (below).

### Case photos and videos
`<figure class="case-media">` reads `data-video`, and `case-video.js` gives three states:

| Attribute | Result |
|---|---|
| absent | plain photo — what Brown uses today |
| `data-video=""` | plain photo plus a "video coming soon" tag |
| `data-video="url"` | photo becomes a play button (YouTube, Vimeo, or a direct media file) |

**"Argue the Case" links.** The app exposes per-case demos at `/demo/<slug>`, which redirect
to `/oral-arguments#demo=<slug>`. Only `brown-v-board` exists today, and Brown's card points
at it. The other five fall back to the general moot tool (`/oral-arguments#moot`), so the
button works but does not open that case.

As each demo is built, swap the card's href to `/demo/<slug>`. Verified 404 as of the last
check: gideon-v-wainwright, miranda-v-arizona, loving-v-virginia, youngstown-v-sawyer,
tinker-v-des-moines.

## Deploy (GitHub → Netlify)

Static files, no build step. Repo root is the publish root.

**Netlify site settings**
- Build command: *(leave blank)*
- Publish directory: `.`
- Branch: `main`

Every push to `main` redeploys. Pull requests get their own preview URL.

### First-time setup
1. Push this repo to `github.com/seth70810/myappealcoach-website`.
2. Netlify → **Add new site** → **Import an existing project** → GitHub → pick the repo.
3. Accept the settings above and deploy. You get a `something.netlify.app` URL.
4. **Test everything on that URL before touching DNS.** Nothing is live yet, so there is no
   cost to finding problems here.

### Custom domain
Registering the domain and pointing it are separate. You do **not** have to move the
registration away from Wix to host here — pointing DNS is enough.

1. Netlify → Domain management → add `myappealcoach.com`.
2. Either change the nameservers at your registrar to the four Netlify gives you, or keep
   your current DNS and add the A / CNAME records Netlify shows. Use the values from the
   dashboard rather than any written down here; they change.
3. Netlify issues a Let's Encrypt certificate automatically once DNS resolves.

> **Before changing nameservers, copy your MX records.** Switching nameservers moves *all*
> DNS, and any mail on the domain stops until MX is recreated at the new provider.

Leave the Wix site running until the Netlify one is confirmed live on the real domain. All
images are local now (see `IMAGES.md`), so cancelling Wix breaks nothing.

## Contact page
`contact.html` has no form. It links straight to myappealcoach@gmail.com via `mailto:`.

This is deliberate: a static site cannot receive a POST, so any working form needs a
server-side endpoint. Rather than take on a form-handling vendor, the page relies on the
email link — nothing to break, no spam surface, works in every browser.

If a form is wanted later it needs somewhere to post to. The `.form`, `.field`, `.hp` and
`.or-rule` rules are now unused but left in `style.css`, so the markup can be restored
without restyling. (`.form-note` is still used — it styles the disclaimer line.)

## Checking links
`python3 check-links.py` — verifies every external URL and reports failures.

## Before launch
- [x] Run check-links.py — every court URL checked and corrected; the remaining
      failures it reports are bot-blocks (403) and servers that reject HEAD but
      answer GET, not dead links
- [x] Contact page — form removed in favour of the `mailto:` link
- [x] Point Fantasy Moot / demo buttons at distinct destinations — both now go to
      `fantasy-moot.html`; "Full Screen Demo" still goes to the video
- [x] Copy images off the Wix CDN into `/img` — done, all 23; Wix can be cancelled
- [x] Shrink `img/site/hero-courtroom.jpg` — 7.96 MB → 354 KB (1600px wide)
- [ ] Add the six Fantasy Moot case photos (see `img/fantasy/README.md`)
- [ ] Add Writing Coach + Table of Authorities to the homepage (they appear only in pricing)
- [ ] Set up redirects: /blank → write-your-brief.html, /blank-1 → oral-argument.html
