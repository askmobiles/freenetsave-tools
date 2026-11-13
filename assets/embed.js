// freenetsave.com tools — shared helpers. Runs only in the visitor's browser; sends nothing anywhere.
(function(){
  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  if (inFrame || /[?&]embed=1/.test(location.search)) document.documentElement.classList.add('embedded');

  // Tell the freenetsave.com page how tall this tool is, so the frame fits with no scroll bar.
  function sendHeight(){
    if (!inFrame) return;
    var h = Math.ceil(document.documentElement.getBoundingClientRect().height);
    parent.postMessage({ fnsTool: location.pathname, height: h }, '*');
  }
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  if (window.ResizeObserver) new ResizeObserver(sendHeight).observe(document.documentElement);

  // Small helpers used by the tools
  window.$ = function(id){ return document.getElementById(id); };
  window.money = function(n){
    return isFinite(n) ? n.toLocaleString('en-CA', { style:'currency', currency:'CAD' }) : '–';
  };
  window.toast = function(msg){
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, 1600);
  };
  window.copyText = function(text){
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function(){ toast('Copied!'); }, function(){ toast('Could not copy'); });
    } else {
      var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); toast('Copied!'); } catch (e) { toast('Could not copy'); }
      ta.remove();
    }
  };
})();
