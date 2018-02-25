module.exports = (data) => {
  if (typeof data.payload === 'string') {
    return JSON.parse(data.payload);
  }
  return data.payload;
};
