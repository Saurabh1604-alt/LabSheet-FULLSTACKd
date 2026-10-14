// Task 3: directory operations
const fs = require('fs');
const path = require('path');

const dir = 'uploads';
const files = ['file1.txt', 'file2.txt', 'file3.txt'];

// recursive:true so re-running the script doesn't fail if folder exists
fs.mkdir(dir, { recursive: true }, (err) => {
  if (err) return console.error('mkdir failed:', err.message);
  console.log(`Folder "${dir}" ready`);

  let created = 0;
  files.forEach((f) => {
    fs.writeFile(path.join(dir, f), '', (err) => {
      if (err) return console.error('Create failed:', err.message);
      created++;
      if (created === files.length) listThenDelete();
    });
  });
});

function listThenDelete() {
  fs.readdir(dir, (err, list) => {
    if (err) return console.error('readdir failed:', err.message);
    console.log('Files in uploads:', list);

    fs.unlink(path.join(dir, 'file2.txt'), (err) => {
      if (err) return console.error('unlink failed:', err.message);
      console.log('Deleted file2.txt');

      fs.readdir(dir, (err, after) => {
        if (err) return console.error(err.message);
        console.log('Remaining files:', after);
      });
    });
  });
}
