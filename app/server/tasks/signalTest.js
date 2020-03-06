const dotenv = require('dotenv');
dotenv.config();

const wait = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = async () => {
  await wait(24 * 3600 * 1000);
  console.log('I finished my job');
};
