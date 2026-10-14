// Task 2: CRUD on a text file (callback style)
const fs = require('fs');

const NAME = 'Your Name';          // <-- change this
const ROLL_NO = 'Your Roll No';    // <-- change this

fs.writeFile('student.txt', `Name: ${NAME}\nRoll No: ${ROLL_NO}\n`, (err) => {
  if (err) return console.error('Write failed:', err.message);
  console.log('1. student.txt created and written');

  fs.appendFile('student.txt', 'Course: Full Stack Web Development\n', (err) => {
    if (err) return console.error('Append failed:', err.message);
    console.log('2. Course name appended');

    fs.readFile('student.txt', 'utf8', (err, data) => {
      if (err) return console.error('Read failed:', err.message);
      console.log('3. File content:\n' + data);

      fs.rename('student.txt', 'profile.txt', (err) => {
        if (err) return console.error('Rename failed:', err.message);
        console.log('4. Renamed student.txt -> profile.txt');
      });
    });
  });
});
