# Fantasy Moot case images

Brown is in place (1024×819, 93 KB). The other five cases are currently **hidden** in
`fantasy-moot.html`, so their missing photos are not visible — but they still need one each
before those cards come back.

Photos are cropped to 16:9 by `object-fit: cover`, so a squarer original loses its top and
bottom. Brown's 5:4 frame survives a centre crop because the subjects sit mid-frame; check
each new photo the same way.

Landscape crops work best. The panel is roughly 16:9 on tablet and taller on desktop, and the
image is `object-fit: cover`, so keep the subject near the centre. Aim for ~1600px wide and
compress hard — six photos on one page adds up. They are `loading="lazy"`, so only the first
card or two costs anything up front.

| File | Case | Suggested subject |
|------|------|-------------------|
| ~~`brown-v-board.jpg`~~ | Brown v. Board of Education | **Added.** Nettie Hunt and her daughter Nickie on the Supreme Court steps, May 1954 |
| `gideon-v-wainwright.jpg` | Gideon v. Wainwright | Gideon's handwritten petition, or his prison mugshot |
| `miranda-v-arizona.jpg` | Miranda v. Arizona | The Warren Court bench portrait, or a period interrogation room |
| `loving-v-virginia.jpg` | Loving v. Virginia | Richard and Mildred Loving at home (Grey Villet's 1965 LIFE series is the famous one) |
| `youngstown-v-sawyer.jpg` | Youngstown Sheet & Tube v. Sawyer | An early-1950s steel mill, or Truman at his desk |
| `tinker-v-des-moines.jpg` | Tinker v. Des Moines | Mary Beth and John Tinker wearing their armbands |

## Rights

Check each one before publishing. Works produced by federal employees in the course of their
duties are generally public domain, and the National Archives, the Library of Congress
(loc.gov/free-to-use) and the Supreme Court's own collection are the safest starting points.
Press-agency and magazine photography from this era is usually **still under copyright** —
the Grey Villet Loving photographs and most LIFE material included. Licence those or choose
an alternative.

## Videos

Each `<figure class="case-media">` in `fantasy-moot.html` has an empty `data-video`
attribute. Fill it in and the photo becomes a play button:

```html
<figure class="case-media" data-video="https://youtu.be/XXXXXXXXXXX" data-title="…">
<figure class="case-media" data-video="img/fantasy/brown.mp4" data-title="…">
```

`case-video.js` accepts a YouTube or Vimeo link (loads an iframe) or a direct media file
(loads a `<video>`). Nothing is fetched until the visitor clicks. Leave the attribute empty
and the card shows a "Background video coming soon" tag instead.
