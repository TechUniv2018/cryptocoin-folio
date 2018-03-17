module.exports = (prices, coinId) => {
  const pricesArrayForBulkInsert = [];
  prices.forEach((price) => {
    const priceForBulkInsert = {};
    priceForBulkInsert.timeStamp = String(price.time);
    priceForBulkInsert.coinId = coinId;
    priceForBulkInsert.open = price.open;
    priceForBulkInsert.close = price.close;
    priceForBulkInsert.high = price.high;
    priceForBulkInsert.low = price.low;
    priceForBulkInsert.volume = price.volumeto;
    pricesArrayForBulkInsert.push(priceForBulkInsert);
  });
  return pricesArrayForBulkInsert;
};
