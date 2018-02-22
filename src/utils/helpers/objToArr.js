module.exports = (prices) => {
  const pricesArr = [];
  const volumeArr = [];
  for (let i = 0; i < prices.length; i += 1) {
    pricesArr.push([
      prices[i].time * 1000,
      prices[i].open,
      prices[i].high,
      prices[i].low,
      prices[i].close,
    ]);
    volumeArr.push([
      prices[i].time * 1000,
      prices[i].volumeto,
    ]);
  }
  return {
    prices: pricesArr,
    volume: volumeArr,
  };
};
