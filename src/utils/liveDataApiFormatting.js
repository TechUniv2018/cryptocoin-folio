const formatFunction = (uneditedData) => {
  let uneditedDataJson = JSON.parse(uneditedData);
  uneditedDataJson = uneditedDataJson.RAW;
  const coins = Object.keys(uneditedDataJson);
  const editedData = {};
  for (let i = 0; i < coins.length; i += 1) {
    const coin = coins[i];
    const coinData = uneditedDataJson[coin].USD;
    const coinValue = Number(coinData.PRICE);
    const coinVolume = Number(coinData.VOLUME24HOUR);
    const coinChange = Number(coinData.CHANGEPCT24HOUR);
    editedData[coin] = {
      Price: coinValue,
      Volume: coinVolume,
      Change: coinChange,
    };
  }
  return (editedData);
};
module.exports = formatFunction;
