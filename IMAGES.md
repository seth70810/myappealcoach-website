# Images

**The Wix CDN dependency is gone.** Every image is now a local file under `img/`, served from
the same place as the site. Nothing breaks if the Wix account is cancelled.

The repo root is the deploy root, so `img/site/logo.jpg` is served at `/img/site/logo.jpg`.
There is no `.gitignore`, so anything committed here ships.

## Layout

```
img/
├── site/         logo, circuit map, homepage hero
├── justices/     20 portraits for the homepage bench strip
├── brown-court/  the 9 justices who decided Brown, shown on that card
└── fantasy/      Fantasy Moot case photos — Brown only so far
```

## Files

| Path | Used on | Notes |
|------|---------|-------|
| `img/site/logo.jpg` | all 9 pages | masthead, displayed at 172px wide |
| `img/site/circuit-map.png` | local-rules, recordings | 916×594 |
| `img/site/hero-courtroom.jpg` | index | homepage hero, 1600×1200, 354 KB |
| `img/justices/*.jpg` | index | 20 files: alito, barrett, brennan, breyer, ginsburg, gorsuch, jackson, kagan, kavanaugh, kennedy, marshall, oconnor, rehnquist, roberts, scalia, sotomayor, souter, stevens, thomas, white |
| `img/brown-court/*.jpg` | fantasy-moot | 9 files in seniority order: warren, black, reed, frankfurter, douglas, jackson, burton, clark, minton — 124 KB total |
| `img/fantasy/brown-v-board.jpg` | fantasy-moot | Nettie Hunt and daughter, May 1954 |

`img/brown-court/jackson.jpg` is **Robert H.** Jackson; `img/justices/jackson.jpg` is **Ketanji
Brown** Jackson. Separate folders keep the two from colliding.

### Headroom

Both sets are cropped to circles, and without extra space at the top the faces rode the
circle's upper arc and got clipped. Each file therefore has its canvas **extended at the top**:

| Set | Added |
|-----|-------|
| `justices/` (19 of 20) | **5%** |
| `justices/ginsburg.jpg` | **10%** — kept deliberately; she was well placed at that value |
| `brown-court/` (all 9) | **10%** — full seated portraits, they need more |

The added strip is a vertical stretch of the source's own top rows, so on studio backdrops and
painted grounds it is invisible. The one place to look twice is `souter.jpg`, where the red
curtain's folds streak slightly.

Paired with `object-position:50% 15%` in the CSS, faces land a little under halfway down the
circle. The two levers work together: **if you re-export any portrait from an original, add its
headroom back** or that face will sit high again. Originals for both sets are in
`D:\Documents\MyAppealCoach\Supreme Court images`, so any of these can be regenerated.

`brown-court` originals live in `D:\Documents\MyAppealCoach\Supreme Court images` and were
1.3 MB combined; resized to ≤400px and re-encoded they are ~130 KB.

Filenames are lowercase with no spaces or apostrophes. That matters: the originals arrived in
a folder called `Supreme Court Justices/` with a file named `O'Connor.jpg`, both of which need
percent-encoding in a URL and are a common source of 404s on case-sensitive Linux hosts.

## Notes

**The hero was resized.** It arrived at 4000×3000 / 7.96 MB, rendering in a column at most
~560 CSS pixels wide — roughly seven times more image than any visitor could see, in the
largest element above the fold. Now 1600×1200 at quality 82, **354 KB, a 95.6% saving**. The
4000px original is not in the repo; re-export from your own copy if you ever need it.

**The logo is a JPEG.** It works — the design is a solid black plaque, so there is no
transparency to lose, and it matches what Wix served. But JPEG compresses hard edges poorly,
and this is type and hairline rules at small size. A PNG or SVG export would be crisper.
Note the new logo also drops the "MAKE YOUR MOST IMPORTANT 20 MINUTES COUNT." tagline that
the Wix version carried, which appears intentional.

## Still to come

Six Fantasy Moot case photos. Filenames, suggested subjects and rights guidance are in
`img/fantasy/README.md`. Missing files degrade to alt text on a dark panel rather than a
broken-image icon, so the page is presentable in the meantime.
