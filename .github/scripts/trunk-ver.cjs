const { execSync } = require('child_process');

const convertNumber = (n, len = 2) => n.toString().padStart(len, '0');

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = convertNumber(date.getMonth() + 1);
  const day = convertNumber(date.getDate());
  const hour = convertNumber(date.getHours());
  const minute = convertNumber(date.getMinutes());
  const second = convertNumber(date.getSeconds());
  const milliSecond = convertNumber(date.getMilliseconds(), 3);

  return `${year}${month}${day}${hour}${minute}${second}.${milliSecond}`;
};

const generateTrunkVer = (commitHash, buildId) => {
  const hash =
    commitHash?.slice(0, 7) ||
    execSync('git rev-parse --short=7 HEAD')

  return [
    formatDate(new Date()),
    hash.toString().replace(/\s+/g, ''),
    buildId,
  ]
    .filter((v) => !!v)
    .join('-');
};

module.exports = {
  generateTrunkVer,
};
