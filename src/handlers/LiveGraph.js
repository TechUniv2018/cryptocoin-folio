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
        reject(err.message);
      });
      result.on('end', () => {
        const pricesObj = JSON.parse(data);
        const prices = pricesObj.Data;
        resolve(prices.slice(0, 1440));
      });
    }).on('error', () => {
      reject(new Error('500: Server Error'));
    });
  });
  return APIcall;
}

module.exports = fetchCoinValues;

