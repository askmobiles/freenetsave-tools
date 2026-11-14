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

// ---------- File helpers (PDF & picture tools). Files are read in the browser only — never uploaded. ----------
(function(){
  window.fmtSize = function(b){
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b/1024).toFixed(0) + ' KB';
    return (b/1048576).toFixed(b < 10485760 ? 2 : 1) + ' MB';
  };
  window.saveFile = function(blob, name){
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 4000);
  };
  // Make a box clickable + drag-and-drop. onFiles(FileList-as-array)
  window.setupDrop = function(box, onFiles){
    var input = box.querySelector('input[type=file]');
    box.addEventListener('click', function(e){ if (e.target !== input) input.click(); });
    box.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
    input.addEventListener('change', function(){ if (input.files.length) onFiles([].slice.call(input.files)); input.value = ''; });
    ['dragenter','dragover'].forEach(function(t){ box.addEventListener(t, function(e){ e.preventDefault(); box.classList.add('over'); }); });
    ['dragleave','drop'].forEach(function(t){ box.addEventListener(t, function(e){ e.preventDefault(); box.classList.remove('over'); }); });
    box.addEventListener('drop', function(e){ if (e.dataTransfer.files.length) onFiles([].slice.call(e.dataTransfer.files)); });
  };
  window.baseName = function(n){ return n.replace(/\.[^.]+$/, ''); };
})();
