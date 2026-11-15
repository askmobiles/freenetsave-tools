# freenetsave-tools

Free, simple online tools for [freenetsave.com](https://freenetsave.com), served at **tools.freenetsave.com** (GitHub Pages).

- Every tool is one `index.html` in its own folder, plus the shared files in `assets/`.
- Everything runs in the visitor's browser. Nothing is sent to a server, nothing is stored (no cookies, no browser storage, no tracking).
- No outside libraries or fonts are loaded.

## Tools
| Folder | Tool |
|---|---|
| `hst/` | HST calculator (add / remove tax) |
| `tip-split/` | Tip calculator & bill splitter |
| `percentage/` | Percentage & discount calculator |
| `loan/` | Loan & car payment calculator |
| `password/` | Password generator |
| `imei/` | IMEI check-digit checker |
| `word-counter/` | Word & character counter |
| `numerology/` | Numerology calculator |
| `mortgage/` | Mortgage calculator |
| `affordability/` | How much house can I afford? |
| `payment/` | Payment calculator (payment, payoff time, amount) |
| `color/` | Colour picker — HEX, RGB, HSL, colour names |
| `pdf-editor/` | PDF editor (add text, cover up, rotate, delete pages) |
| `pdf-writer/` | Type text and save as PDF |
| `pdf-smaller/` | Make a PDF smaller |
| `pdf-merge/` | Merge PDFs |
| `pictures-to-pdf/` | Pictures to PDF |
| `picture-smaller/` | Make pictures smaller |

## Showing a tool on a website
```html
<iframe src="https://tools.freenetsave.com/hst/" style="width:100%;border:0" loading="lazy" title="HST calculator"></iframe>
```
Inside a frame the tool hides its own title and sends its height to the page (`postMessage`), so the page can size the frame.

## Language
Words in a tool can be translated by adding a new block next to `en` in that tool's `LANG` list (started in `numerology/`).

## Libraries (copied into `assets/lib`, nothing loaded from other websites)
- pdf-lib 1.17.1 — MIT licence
- pdf.js 6.5.438 (Mozilla) — Apache 2.0 licence

## Added 2026-11-15
qr-code, unit-converter, date-calculator, timer, savings-calculator, pay-calculator, fuel-cost, typing-test, flashcards, screen-test, data-usage, picture-converter, pdf-split, invoice-maker, word-search, printable-calendar, phone-plan-compare, handwriting-sheets.

Third-party code: `assets/lib/qrcode.js` (QR Code Generator by Kazuhiko Arase, MIT licence).
