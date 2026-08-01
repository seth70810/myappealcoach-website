(function(){
  var btn = document.getElementById('navtoggle');
  var menu = document.getElementById('primary-nav');
  if(!btn || !menu) return;
  function close(){ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  btn.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function(e){ if(e.target.closest('a')) close(); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menu.classList.contains('open')){ close(); btn.focus(); }
  });
  var mq = window.matchMedia('(min-width:1001px)');
  function sync(){ if(mq.matches) close(); }
  mq.addEventListener ? mq.addEventListener('change', sync) : window.addEventListener('resize', sync);
})();
