/* freenetsave offline helper: keeps a copy of pages you opened on your own device so they work without internet. */
var C="fns-tools-v1";
self.addEventListener("install",function(){self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C;}).map(function(n){return caches.delete(n);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){if(res&&res.ok&&res.type==="basic"){var c=res.clone();caches.open(C).then(function(x){x.put(r,c);});}return res;})
  .catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match("/",{ignoreSearch:true});});}));});
