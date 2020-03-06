const dotenv = require('dotenv');
dotenv.config();

const wait = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = async () => {
  await wait(10000);
  console.log('I finished my job');
};
