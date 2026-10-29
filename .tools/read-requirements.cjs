const fs = require('node:fs');
const { PDFParse } = require('./pdf-reader/node_modules/pdf-parse');
(async () => {
  const parser = new PDFParse({data:fs.readFileSync('C:/Users/Alex/Downloads/Documento general SIST-1.pdf')});
  const result = await parser.getText();
  fs.writeFileSync('C:/Users/Alex/SIST/.tools/requirements.txt', result.text);
  console.log(result.text);
  await parser.destroy();
})();
