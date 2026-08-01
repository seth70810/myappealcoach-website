# MyAppealCoach.com

Static site. No build step.

## Files
- `index.html` — homepage
- `faq.html`, `write-your-brief.html`, `oral-argument.html` — main pages
- `local-rules.html`, `style-guides.html`, `recordings.html` — resource pages
- `contact.html` — contact form
- `style.css` — shared stylesheet for every page
- `nav.js` — mobile nav toggle

## Deploy (Cloudflare Pages)
1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: *(leave blank)*  Output directory: `/`
4. Test on the `*.pages.dev` URL before touching DNS.

## Contact form
`contact.html` posts to Formspree. Before launch:
1. Create a free account at formspree.io, add myappealcoach@gmail.com as the recipient.
2. Copy the form ID and replace `YOUR_FORM_ID` in `contact.html`.
3. Submit the form once and confirm the email arrives.
A hidden `_gotcha` honeypot field is already in place for spam.

## Checking links
`python3 check-links.py` — verifies every external URL and reports failures.

## Before launch
- [ ] Run check-links.py — the ~40 court URLs were reconstructed, not copied from Wix
- [ ] Confirm advertising notice wording (Tex. Disciplinary R. Prof'l Conduct 7.05)
- [ ] Wire up the Formspree endpoint in contact.html
- [ ] Add Writing Coach + Table of Authorities to the homepage (they appear only in pricing)
- [ ] Point Fantasy Moot / demo buttons at distinct destinations
- [ ] Copy images off the Wix CDN into `/img` before leaving Wix
- [ ] Set up redirects: /blank → write-your-brief.html, /blank-1 → oral-argument.html
