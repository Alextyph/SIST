const fs = require('node:fs');
const zlib = require('node:zlib');
const pdf = fs.readFileSync('C:/Users/Alex/Downloads/Documento general SIST-1.pdf').toString('latin1');
const objects = new Map([...pdf.matchAll(/(\d+) 0 obj\s*([\s\S]*?)endobj/g)].map(m => [m[1], m[2]]));
const decoded = new Map();
for (const [id, object] of objects) {
  const m = /stream\r?\n([\s\S]*?)\r?\nendstream/.exec(object);
  if (m) { try { decoded.set(id, zlib.inflateSync(Buffer.from(m[1], 'latin1')).toString('latin1')); } catch {} }
}
fs.writeFileSync('C:/Users/Alex/SIST/.tools/pdf-streams.txt', [...decoded].filter(([,x]) => /beginbfchar|beginbfrange|BT/.test(x)).map(([id,t]) => `OBJECT ${id}\n${t}`).join('\n\n'));
console.log('Decoded', decoded.size, 'PDF streams; inspect .tools/pdf-streams.txt');
