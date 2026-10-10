/* Hero video — "Don't meet a hot bench cold."
 *
 * Pattern: autoplay MUTED + looping (browsers block autoplay with sound), with
 * a prominent "Tap for sound" control that unmutes and restarts the narrated
 * spot from the beginning, with native controls.
 *
 * Bandwidth / respect: the video (preload="none") downloads nothing until we
 * actually play it. We skip autoplay — keeping just the poster photo and a
 * "Watch" button — for phones, Data-Saver, and prefers-reduced-motion, so those
 * visitors never pull ~20 MB they didn't ask for.
 */
(function () {
  var v = document.getElementById('hero-video');
  if (!v) return;
  var btn = document.getElementById('hero-video-sound');
  var txt = btn ? btn.querySelector('.hero-vid-btn-txt') : null;
  var ico = btn ? btn.querySelector('.hero-vid-btn-ico') : null;

  function mq(q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } }
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var narrow = mq('(max-width: 600px)');
  var saveData = false;
  try { saveData = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}

  function showBtn(label, icon) {
    if (!btn) return;
    if (txt) txt.textContent = label;
    if (ico) ico.textContent = icon;
    btn.hidden = false;
  }

  // Play with sound from the start, once, with native controls. Runs from the
  // button click (a user gesture), so audio is allowed.
  function enableSound() {
    v.muted = false;
    v.loop = false;
    try { v.currentTime = 0; } catch (e) {}
    v.controls = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
    if (btn) btn.hidden = true;
  }

  if (btn) btn.addEventListener('click', enableSound);

  if (reduce || narrow || saveData) {
    // No autoplay: keep the poster, offer a play button (nothing downloads yet).
    showBtn('Watch · 30 sec', '▶');
    return;
  }

  // Autoplay muted + loop; offer an unmute control once it's rolling.
  var play = v.play();
  if (play && play.then) {
    play.then(function () { showBtn('Tap for sound', '🔊'); })
        .catch(function () { showBtn('Watch · 30 sec', '▶'); });
  } else {
    showBtn('Tap for sound', '🔊');
  }
})();
