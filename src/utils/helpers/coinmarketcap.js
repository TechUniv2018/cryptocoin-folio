const axios = require('axios');
const fs = require('fs');


const coinmarketcap = coins => axios.get('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=200').then((data) => {
  const dataArray = data.data;
  const obj = {};
  let objLength = 0;
  for (let i = 0; i < dataArray.length; i += 1) {
    for (let j = 0; j < coins.length; j += 1) {
      if (dataArray[i].symbol === coins[j]) {
        obj[dataArray[i].symbol] = dataArray[i].name;
        objLength += 1;
        break;
      }
    }
    if (objLength === 50) {
      console.log(objLength);
      break;
    }
  }
  return obj;
});

const binance = () => axios.get('https://api.binance.com/api/v1/ticker/allPrices').then((data) => {
  const coins = ['BTC'];
  const dataArray = data.data;
  for (let i = 0; i < dataArray.length; i += 1) {
    const symbol = dataArray[i].symbol;
    if (symbol.indexOf('BTC') > 0) {
      coins.push(symbol.slice(0, symbol.indexOf('BTC')));
    }
  }
  console.log(coins);
  coinmarketcap(coins).then((dataToWrite) => {
    fs.writeFile('../constants/coin-dictionary.js', `module.exports =${JSON.stringify(dataToWrite)}`);
  });
});

binance();

