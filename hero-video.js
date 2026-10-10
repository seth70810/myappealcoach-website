/* Hero video — "Don't meet a hot bench cold." (Concept 2: video + timed overlay)
 *
 * - Autoplays MUTED and loops on all devices, phones included (browsers block
 *   autoplay with sound). A "Tap for sound" control (bottom-left, clearing the
 *   video's own "MyAppealCoach.com") unmutes and restarts the narrated spot from
 *   the top with native controls.
 * - The headline overlay (#hero-scrim) shows ONLY during the preparation section
 *   of the clip: it stays off through the opening "hot bench cold" card, fades in
 *   over the desk/portraits/writing beats, then fades out once the advocate steps
 *   to the bench and stays off through the closing card (repeats each loop).
 * - prefers-reduced-motion and Data-Saver opt out of autoplay: poster + a "Watch"
 *   button, preload="none" so nothing downloads until tapped.
 */
(function () {
  var v = document.getElementById('hero-video');
  if (!v) return;
  var btn = document.getElementById('hero-video-sound');
  var scrim = document.getElementById('hero-scrim');
  var txt = btn ? btn.querySelector('.hero-vid-btn-txt') : null;
  var ico = btn ? btn.querySelector('.hero-vid-btn-ico') : null;

  function mq(q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } }
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var saveData = false;
  try { saveData = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}

  // Overlay visible only in the preparation window (seconds into the clip).
  var OVL_IN = 3.3, OVL_OUT = 16.9;
  var soundOn = false;
  function overlayTick() {
    if (scrim && !soundOn) {
      var t = v.currentTime;
      if (t >= OVL_IN && t < OVL_OUT) scrim.classList.add('show');
      else scrim.classList.remove('show');
    }
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(overlayTick);
  }
  function startOverlay() {
    if (!scrim) return;
    if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(overlayTick);
    else setInterval(overlayTick, 150);
  }

  function showBtn(label, icon) {
    if (!btn) return;
    if (txt) txt.textContent = label;
    if (ico) ico.textContent = icon;
    btn.hidden = false;
  }

  // Fade the video in once there's a real frame on screen. Until then the hero
  // shows the navy backdrop, so the poster image never flashes before autoplay.
  function reveal() { v.classList.add('revealed'); }

  // Play with sound from the start, once, with native controls (user gesture).
  function enableSound() {
    soundOn = true;
    if (scrim) scrim.classList.remove('show');
    v.muted = false;
    v.loop = false;
    try { v.currentTime = 0; } catch (e) {}
    v.controls = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
    if (btn) btn.hidden = true;
  }
  // The sound button toggles sound only — don't let it trigger the launch click.
  if (btn) btn.addEventListener('click', function (e) { e.stopPropagation(); enableSound(); });

  // Clicking the video (anywhere but the sound button) opens the tool, same as
  // the "Launch the Tool" button. Once the viewer has turned sound on (native
  // controls showing), clicks drive the player instead.
  var LAUNCH_URL = 'https://app.myappealcoach.com/oral-arguments#moot';
  var hero = v.parentNode;
  if (hero) hero.addEventListener('click', function (e) {
    if (soundOn) return;
    if (btn && btn.contains(e.target)) return;
    window.open(LAUNCH_URL, '_blank', 'noopener');
  });

  if (reduce || saveData) {
    // Respect explicit user preferences: no autoplay. Reveal so the poster shows
    // behind the "Watch" button; nothing downloads until tapped.
    reveal();
    showBtn('Watch · 30 sec', '▶');
    return;
  }

  // Autoplay muted + loop everywhere; reveal on the first painted frame so the
  // poster never flashes. Overlay follows the content.
  v.addEventListener('playing', reveal, { once: true });
  var play = v.play();
  if (play && play.then) {
    play.then(function () { reveal(); showBtn('Tap for sound & replay', '🔊'); startOverlay(); })
        .catch(function () { reveal(); showBtn('Watch · 30 sec', '▶'); });
  } else {
    showBtn('Tap for sound & replay', '🔊');
    startOverlay();
  }
})();
