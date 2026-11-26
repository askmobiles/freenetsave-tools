/* freenetsave AI tools: shared helpers. Everything runs in the visitor's browser. Nothing is uploaded. */
const LIB = new URL("lib/ai/", import.meta.url).href;

export async function deviceInfo() {
  const info = { wasm: typeof WebAssembly === "object", webgpu: false, memory: navigator.deviceMemory || null, mobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) };
  try {
    if (navigator.gpu) { const a = await navigator.gpu.requestAdapter(); info.webgpu = !!a; }
  } catch (e) { info.webgpu = false; }
  return info;
}

/* Shows a short line about how well this device should handle the tool. */
export function deviceNote(el, info, opts = {}) {
  if (!el) return;
  if (!info.wasm) {
    el.className = "dev bad";
    el.innerHTML = "⚠️ This browser is too old for AI tools. Please use a recent Chrome, Edge, Safari or Firefox.";
    return false;
  }
  const low = info.memory && info.memory < 4;
  el.className = "dev " + (low ? "warn" : "ok");
  el.innerHTML = low
    ? "⚠️ This device has little memory. The tool may be slow or may stop. A computer or a newer phone works best."
    : "✅ Your device can run this." + (opts.slowHint ? " " + opts.slowHint : "");
  return true;
}

let TF = null;
/* Loads the AI library (Transformers.js 4.3.2, locked version, from jsDelivr) and points it at our own copies of its engine files. */
export async function loadAI() {
  if (TF) return TF;
  TF = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js");
  const ua = navigator.userAgent;
  const m = ua.match(/Version\/(\d+)[.\d]* .*Safari/);
  const oldSafari = !!m && !/Chrome|CriOS|Edg/.test(ua) && parseInt(m[1], 10) < 26;
  const hasGPU = !!navigator.gpu;
  const suf = oldSafari && !hasGPU ? "" : ".asyncify";
  TF.env.backends.onnx.wasm.wasmPaths = { mjs: LIB + "ort-wasm-simd-threaded" + suf + ".mjs", wasm: LIB + "ort-wasm-simd-threaded" + suf + ".wasm" };
  TF.env.backends.onnx.wasm.numThreads = 1;
  TF.env.allowLocalModels = false;
  TF.env.useBrowserCache = true;
  return TF;
}

/* Turns the library's download messages into one progress bar. */
export function progressTracker(onUpdate) {
  const files = {};
  return (p) => {
    if (p.status === "progress" || p.status === "download" || p.status === "initiate") {
      const f = files[p.file] || (files[p.file] = { loaded: 0, total: 0 });
      if (p.loaded != null) f.loaded = p.loaded;
      if (p.total) f.total = p.total;
    } else if (p.status === "done" && files[p.file]) {
      files[p.file].loaded = files[p.file].total || files[p.file].loaded;
    }
    let L = 0, T = 0;
    for (const k in files) { L += files[k].loaded; T += files[k].total; }
    onUpdate(T ? Math.min(100, Math.round(L / T * 100)) : 0, T, p.status === "ready");
  };
}

export function mb(bytes) { return bytes ? (bytes / 1e6).toFixed(0) + " MB" : ""; }
