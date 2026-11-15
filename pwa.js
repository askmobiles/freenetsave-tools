/* freenetsave: install as an app (Android, iPhone, iPad, computer). Saves nothing about the visitor. */
(function(){
  var d=document,h=location.hostname,n=navigator;
  if(/translate\.goog$/.test(h))return;
  try{if(window.top!==window.self)return;}catch(e){return;}
  var home=(h==="freenetsave.com"||h==="www.freenetsave.com");
  var base=home?"https://tools.freenetsave.com":"";
  function link(rel,href){if(d.querySelector('link[rel="'+rel+'"]'))return;var l=d.createElement("link");l.rel=rel;l.href=href;d.head.appendChild(l);}
  link("manifest",home?base+"/home.webmanifest":"/manifest.webmanifest");
  link("apple-touch-icon",base+"/icons/apple-touch-icon.png");
  if(!d.querySelector('meta[name="theme-color"]')){var m=d.createElement("meta");m.name="theme-color";m.content="#2563EB";d.head.appendChild(m);}
  if(!home&&"serviceWorker" in n&&location.protocol==="https:"){n.serviceWorker.register("/sw.js").catch(function(){});}
  var alone=(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches)||n.standalone===true;
  if(alone)return;
  var closed=false;try{closed=sessionStorage.getItem("fnsAppX")==="1";}catch(e){}
  if(closed)return;
  var ua=n.userAgent||"",ios=/iphone|ipad|ipod/i.test(ua)||(n.platform==="MacIntel"&&n.maxTouchPoints>1),ask=null,box=null;
  function css(){if(d.getElementById("fnsAppCss"))return;var s=d.createElement("style");s.id="fnsAppCss";
    s.textContent=".fns-app{position:fixed;left:14px;bottom:14px;z-index:99990;display:flex;align-items:center;gap:6px;font:600 15px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}"
    +".fns-app button{font:inherit;cursor:pointer;border:0}"
    +".fns-app-go{display:flex;align-items:center;gap:8px;background:#172033;color:#fff;padding:12px 16px;border-radius:999px;box-shadow:0 6px 20px rgba(23,32,51,.28)}"
    +".fns-app-go:hover,.fns-app-go:focus-visible{background:#2563EB;outline:2px solid #fff;outline-offset:-4px}"
    +".fns-app-x{width:34px;height:34px;border-radius:50%;background:#fff;color:#172033;box-shadow:0 2px 10px rgba(23,32,51,.22);font-size:18px;line-height:1}"
    +".fns-app-tip{position:fixed;left:14px;right:14px;bottom:66px;max-width:360px;z-index:99991;background:#fff;color:#172033;border-radius:16px;padding:16px 18px;box-shadow:0 10px 34px rgba(23,32,51,.3);font:400 15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}"
    +".fns-app-tip b{display:block;font-size:17px;margin-bottom:6px}.fns-app-tip ol{margin:0;padding-left:20px}"
    +"@media print{.fns-app,.fns-app-tip{display:none!important}}";d.head.appendChild(s);}
  function hide(){if(box){box.remove();box=null;}var t=d.getElementById("fnsAppTip");if(t)t.remove();}
  function show(){if(box||!d.body)return;css();box=d.createElement("div");box.className="fns-app";box.setAttribute("translate","no");
    var go=d.createElement("button");go.type="button";go.className="fns-app-go";
    go.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg><span>Install app</span>';
    var x=d.createElement("button");x.type="button";x.className="fns-app-x";x.setAttribute("aria-label","Hide the install button");x.textContent="×";
    go.onclick=function(){if(ask){ask.prompt();if(ask.userChoice){ask.userChoice.then(function(){ask=null;hide();});}return;}
      var t=d.getElementById("fnsAppTip");if(t){t.remove();return;}
      t=d.createElement("div");t.id="fnsAppTip";t.className="fns-app-tip";t.setAttribute("role","status");
      t.innerHTML="<b>Add this to your iPhone or iPad</b><ol><li>Tap the Share button (the square with an arrow).</li><li>Tap <strong>Add to Home Screen</strong>.</li><li>Tap <strong>Add</strong>.</li></ol>";d.body.appendChild(t);};
    x.onclick=function(){try{sessionStorage.setItem("fnsAppX","1");}catch(e){}hide();};
    box.appendChild(go);box.appendChild(x);d.body.appendChild(box);}
  window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();ask=e;show();});
  window.addEventListener("appinstalled",function(){ask=null;hide();});
  if(ios){if(d.readyState==="loading"){d.addEventListener("DOMContentLoaded",show);}else{show();}}
})();
