module.exports = (longForm) => {
  const pattern = new RegExp(/<(.+)>$/);
  const match = pattern.exec(`${longForm}`);
  return match ? match[1] : '';
};
