// Task 9: create a big-ish file, then read it with a stream
const fs = require('fs');

const FILE = 'large.txt';

// build 100 lines
let content = '';
for (let i = 1; i <= 100; i++) {
  content += `Line ${i}: The quick brown fox jumps over the lazy dog.\n`;
}
fs.writeFileSync(FILE, content);
console.log(`Created ${FILE} with 100 lines`);

// small highWaterMark so we actually see multiple chunks
const stream = fs.createReadStream(FILE, { encoding: 'utf8', highWaterMark: 1024 });

let chunkNo = 0;
let total = 0;

stream.on('data', (chunk) => {
  chunkNo++;
  total += chunk.length;
  console.log(`Chunk ${chunkNo}: ${chunk.length} characters`);
});

stream.on('end', () => {
  console.log(`Finished. ${chunkNo} chunks, ${total} characters total.`);
});

stream.on('error', (err) => console.error('Stream error:', err.message));
