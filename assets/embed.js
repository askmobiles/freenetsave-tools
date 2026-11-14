// freenetsave.com tools — shared helpers. Runs only in the visitor's browser; sends nothing anywhere.
(function(){
  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  if (inFrame || /[?&]embed=1/.test(location.search)) document.documentElement.classList.add('embedded');

  // Site header, logo and footer — shown only when a tool is opened on its own (not inside freenetsave.com)
  function addChrome(){
    if (document.documentElement.classList.contains('embedded') || document.querySelector('.fh')) return;
    document.body.insertAdjacentHTML('afterbegin', "<header class=\"fh\"><div class=\"fh-in\"><a class=\"fh-logo\" href=\"https://freenetsave.com/\" aria-label=\"freenetsave home\"><svg viewBox=\"0 0 512 512\" aria-hidden=\"true\"><defs><linearGradient id=\"fhg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3b82f6\"/><stop offset=\"1\" stop-color=\"#1d4ed8\"/></linearGradient></defs><rect x=\"16\" y=\"16\" width=\"480\" height=\"480\" rx=\"112\" fill=\"url(#fhg)\"/><path d=\"M150 140 h150 l92 92 a28 28 0 0 1 0 40 l-120 120 a28 28 0 0 1 -40 0 l-92 -92 V160 a20 20 0 0 1 10 -20 z\" fill=\"#fff\"/><circle cx=\"196\" cy=\"186\" r=\"22\" fill=\"url(#fhg)\"/><path d=\"M212 286 l40 40 l82 -96\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"30\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M398 84 l10 26 l26 10 l-26 10 l-10 26 l-10 -26 l-26 -10 l26 -10 z\" fill=\"#f97316\"/></svg><span>freenet<b>save</b></span></a><input type=\"checkbox\" id=\"fhT\" hidden><label class=\"fh-t\" for=\"fhT\">Menu <i></i></label><ul class=\"fh-menu\"><li class=\"dd\"><a href=\"#\" onclick=\"return false\">Money</a><ul class=\"fh-sub\"><li><a href=\"https://freenetsave.com/hst-calculator/\">HST calculator</a></li><li><a href=\"https://freenetsave.com/tip-calculator/\">Tip &amp; bill splitter</a></li><li><a href=\"https://freenetsave.com/percentage-calculator/\">Percent &amp; discount</a></li><li><a href=\"https://freenetsave.com/loan-calculator/\">Loan &amp; car payment</a></li></ul></li><li class=\"dd\"><a href=\"#\" onclick=\"return false\">Phone &amp; tech</a><ul class=\"fh-sub\"><li><a href=\"https://freenetsave.com/password-generator/\">Password maker</a></li><li><a href=\"https://freenetsave.com/imei-checker/\">IMEI checker</a></li><li><a href=\"https://freenetsave.com/word-counter/\">Word counter</a></li></ul></li><li class=\"dd\"><a href=\"#\" onclick=\"return false\">PDF &amp; pictures</a><ul class=\"fh-sub\"><li><a href=\"https://tools.freenetsave.com/pdf-editor/\">PDF editor</a></li><li><a href=\"https://tools.freenetsave.com/pdf-writer/\">PDF writer</a></li><li><a href=\"https://tools.freenetsave.com/pdf-smaller/\">Make PDF smaller</a></li><li><a href=\"https://tools.freenetsave.com/pdf-merge/\">Merge PDF</a></li><li><a href=\"https://tools.freenetsave.com/pictures-to-pdf/\">Pictures to PDF</a></li><li><a href=\"https://tools.freenetsave.com/picture-smaller/\">Make picture smaller</a></li></ul></li><li><a href=\"https://freenetsave.com/numerology-calculator/\">Fun</a></li><li><a href=\"https://tools.freenetsave.com/\">All tools</a></li><li class=\"fh-cta\"><a href=\"https://freenetsave.com/contact/\">Suggest a tool</a></li></ul></div></header>");
    document.body.insertAdjacentHTML('beforeend', "<footer class=\"ff\"><div class=\"ff-in\"><div class=\"ff-brand\"><a class=\"fh-logo\" href=\"https://freenetsave.com/\"><svg viewBox=\"0 0 512 512\" aria-hidden=\"true\"><defs><linearGradient id=\"ffg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3b82f6\"/><stop offset=\"1\" stop-color=\"#1d4ed8\"/></linearGradient></defs><rect x=\"16\" y=\"16\" width=\"480\" height=\"480\" rx=\"112\" fill=\"url(#ffg)\"/><path d=\"M150 140 h150 l92 92 a28 28 0 0 1 0 40 l-120 120 a28 28 0 0 1 -40 0 l-92 -92 V160 a20 20 0 0 1 10 -20 z\" fill=\"#fff\"/><circle cx=\"196\" cy=\"186\" r=\"22\" fill=\"url(#ffg)\"/><path d=\"M212 286 l40 40 l82 -96\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"30\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M398 84 l10 26 l26 10 l-26 10 l-10 26 l-10 -26 l-26 -10 l26 -10 z\" fill=\"#f97316\"/></svg><span>freenet<b>save</b></span></a><p>Free stuff that saves you time &amp; money. No sign-up, and nothing you type is ever saved.</p></div><div><h3>Money</h3><ul><li><a href=\"https://freenetsave.com/hst-calculator/\">HST calculator</a></li><li><a href=\"https://freenetsave.com/tip-calculator/\">Tip &amp; bill splitter</a></li><li><a href=\"https://freenetsave.com/percentage-calculator/\">Percent &amp; discount</a></li><li><a href=\"https://freenetsave.com/loan-calculator/\">Loan &amp; car payment</a></li></ul></div><div><h3>Phone &amp; tech</h3><ul><li><a href=\"https://freenetsave.com/password-generator/\">Password maker</a></li><li><a href=\"https://freenetsave.com/imei-checker/\">IMEI checker</a></li><li><a href=\"https://freenetsave.com/word-counter/\">Word counter</a></li><li><a href=\"https://freenetsave.com/numerology-calculator/\">Numerology</a></li></ul></div><div><h3>PDF &amp; pictures</h3><ul><li><a href=\"https://tools.freenetsave.com/pdf-editor/\">PDF editor</a></li><li><a href=\"https://tools.freenetsave.com/pdf-writer/\">PDF writer</a></li><li><a href=\"https://tools.freenetsave.com/pdf-smaller/\">Make PDF smaller</a></li><li><a href=\"https://tools.freenetsave.com/pdf-merge/\">Merge PDF</a></li><li><a href=\"https://tools.freenetsave.com/pictures-to-pdf/\">Pictures to PDF</a></li><li><a href=\"https://tools.freenetsave.com/picture-smaller/\">Make picture smaller</a></li></ul></div><div><h3>freenetsave</h3><ul><li><a href=\"https://freenetsave.com/about/\">About</a></li><li><a href=\"https://freenetsave.com/privacy-policy/\">Privacy policy</a></li><li><a href=\"https://freenetsave.com/contact/\">Contact</a></li></ul></div></div><div class=\"ff-bot\"><span>\u00a9 2026 freenetsave.com</span><span>\ud83d\udd12 Our tools run on your device</span></div></footer>");
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addChrome); else addChrome();

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
