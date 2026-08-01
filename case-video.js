/* Fantasy Moot — click a case photo to load its background video.
 *
 * Three states, driven by the data-video attribute on <figure class="case-media">:
 *
 *   attribute absent   → plain photo, no play button, no tag
 *   data-video=""      → plain photo plus a "video coming soon" tag
 *   data-video="url"   → photo becomes a play button
 *
 * The absent case matters: a card with a good photo and no video planned should
 * not advertise one.
 *
 * Accepts either a direct file (…/brown.mp4 → <video>) or a YouTube/Vimeo page
 * or embed URL (→ <iframe>). Nothing loads until the visitor clicks, so the
 * page costs no bandwidth up front.
 */
(function () {
  var figures = document.querySelectorAll('.case-media');
  if (!figures.length) return;

  // Turn a watch/share URL into an embeddable one. Returns null for direct files.
  function embedUrl(url) {
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) return 'https://www.youtube.com/embed/' + yt[1] + '?autoplay=1&rel=0';
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1';
    return null;
  }

  figures.forEach(function (fig) {
    var attr = fig.getAttribute('data-video');   // null when the attribute is absent
    var title = fig.getAttribute('data-title') || 'this case';

    if (attr === null) return;                   // photo only — nothing to advertise
    var src = attr.trim();

    if (!src) {
      var soon = document.createElement('p');
      soon.className = 'case-soon meta';
      soon.textContent = 'Background video coming soon';
      fig.appendChild(soon);
      return;
    }

    // The whole photo is the control, so it must be a real button for keyboard
    // and screen-reader users — not a click handler bolted onto the image.
    var play = document.createElement('button');
    play.type = 'button';
    play.className = 'case-play';
    play.setAttribute('aria-label', 'Play the case background video for ' + title);
    play.innerHTML = '<span class="case-play-icon" aria-hidden="true">&#9654;</span>' +
                     '<span class="case-play-label">Watch the background</span>';
    fig.appendChild(play);

    play.addEventListener('click', function () {
      var frame = document.createElement('div');
      frame.className = 'case-player';

      var embed = embedUrl(src);
      if (embed) {
        var iframe = document.createElement('iframe');
        iframe.src = embed;
        iframe.title = 'Case background: ' + title;
        iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.appendChild(iframe);
      } else {
        var video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('title', 'Case background: ' + title);
        frame.appendChild(video);
      }

      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'case-close';
      close.textContent = 'Close video';

      // Keep the poster in the DOM so closing restores it without a refetch.
      fig.classList.add('is-playing');
      fig.appendChild(frame);
      fig.appendChild(close);
      close.focus();

      function restore() {
        frame.remove();          // drops the <video>/<iframe>, stopping playback
        close.remove();
        fig.classList.remove('is-playing');
        play.focus();
        document.removeEventListener('keydown', onKey);
      }
      function onKey(e) { if (e.key === 'Escape') restore(); }

      close.addEventListener('click', restore);
      document.addEventListener('keydown', onKey);
    });
  });
})();
