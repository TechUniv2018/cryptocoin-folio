const axios = require('axios');
const fs = require('fs');


const coinmarketcap = () => axios.get('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=50').then((data) => {
  const dataArray = data.data;
  const obj = {};
  for (let i = 0; i < dataArray.length; i += 1) {
    obj[dataArray[i].symbol] = dataArray[i].name;
  }
  return obj;
});

coinmarketcap().then((data) => {
  fs.writeFile('../constants/coin-dictionary.js', `module.exports =${JSON.stringify(data)}`);
});
