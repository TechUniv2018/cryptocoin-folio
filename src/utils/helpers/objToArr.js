module.exports = (prices) => {
  const pricesArr = prices.map(price => [
    price.time,
    price.open,
    price.high,
    price.low,
    price.close,
    price.volumeto,
  ]);
  return pricesArr;
};

