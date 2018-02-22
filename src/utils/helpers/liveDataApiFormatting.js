const coinNames = require('../constants/index').namesDict;

const formatFunction = (uneditedData) => {
  let uneditedDataJson;
  try {
    uneditedDataJson = JSON.parse(uneditedData);
  } catch (err) {
    return 'invalid input';
  }
  uneditedDataJson = uneditedDataJson.RAW;
  const coins = Object.keys(uneditedDataJson);
  const editedData = [];
  for (let i = 0; i < coins.length; i += 1) {
    const coin = coins[i];
    const coinData = uneditedDataJson[coin].USD;
    const coinValue = Number(coinData.PRICE);
    const coinVolume = Number(coinData.VOLUME24HOUR);
    const coinChange = Number(coinData.CHANGEPCT24HOUR);
    editedData.push({
      Symbol: coin,
      Name: coinNames[coin],
      Price: coinValue,
      Volume: coinVolume,
      Change: coinChange,
    });
  }
  return (editedData);
};
module.exports = formatFunction;
