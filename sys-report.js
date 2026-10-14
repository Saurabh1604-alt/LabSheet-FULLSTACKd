// Task 5: OS module report
const os = require('os');

const toGB = (bytes) => (bytes / 1024 ** 3).toFixed(2) + ' GB';

console.log('===== System Report =====');
console.log('Platform     :', os.platform());
console.log('Architecture :', os.arch());
console.log('Total memory :', toGB(os.totalmem()));
console.log('Free memory  :', toGB(os.freemem()));
console.log('CPU cores    :', os.cpus().length);
console.log('Uptime       :', (os.uptime() / 60).toFixed(1), 'minutes');
