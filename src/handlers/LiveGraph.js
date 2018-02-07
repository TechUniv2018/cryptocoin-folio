const https = require('https');

function fetchCoinValues(coinSymbol = 'BTC') {
  const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${coinSymbol}&tsym=USD`;
  const APIcall = new Promise((resolve, reject) => {
    https.get(url, (result) => {
      let data = '';
      result.setEncoding('utf8');

      result.on('data', (chunk) => {
        data += chunk;
      });
      result.on('error', (err) => {
        reject(err);
      });
      result.on('end', () => {
        const pricesObj = JSON.parse(data);
        const prices = pricesObj.Data;
        resolve(prices.slice(0, 1440));
      });
    });
  });
  return APIcall;
}

module.exports = fetchCoinValues;

