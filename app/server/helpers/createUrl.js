module.exports = (url = '') => {
  return process.env.HOST + '/' + url;
};
