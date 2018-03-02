const axios = require('axios');

const Binance = require('binance-api-node').default;


const orderBooks = (coin) => {
  const client = Binance();
  if (coin === 'BTC') {
    return client.book({ symbol: `${coin}USDT` }).then((data) => {
      // console.log(data.asks,data.bids);
      let newDataAsks = data.asks;
      const finalData = {};
      newDataAsks = newDataAsks.map((item) => {
        const newItem = {};
        newItem.price = Number(item.price).toFixed(8);
        newItem.quantity = item.quantity;
        newItem.total = ((item.price) * item.quantity).toFixed(8);
        return newItem;
      });
      finalData.asks = newDataAsks;
      newDataAsks = data.bids;
      newDataAsks = newDataAsks.map((item) => {
        const newItem = {};
        newItem.price = Number(item.price).toFixed(8);
        newItem.quantity = item.quantity;
        newItem.total = ((item.price) * item.quantity).toFixed(8);
        return newItem;
      });
      finalData.bids = newDataAsks;
      return finalData;
    });
  }
  return axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USDT').then((dataUSDT) => {
    const priceBTC = Number(dataUSDT.data.USDT);
    return client.book({ symbol: `${coin}BTC` }).then((data) => {
      // console.log(data.asks,data.bids);
      let newDataAsks = data.asks;
      const finalData = {};
      newDataAsks = newDataAsks.map((item) => {
        const newItem = {};
        newItem.price = Number(Number(item.price) * priceBTC).toFixed(8);
        newItem.quantity = item.quantity;
        newItem.total = ((item.price * priceBTC) * item.quantity).toFixed(8);
        return newItem;
      });
      finalData.asks = newDataAsks;
      newDataAsks = data.bids;
      newDataAsks = newDataAsks.map((item) => {
        const newItem = {};
        newItem.price = Number(Number(item.price) * priceBTC).toFixed(8);
        newItem.quantity = item.quantity;
        newItem.total = ((item.price * priceBTC) * item.quantity).toFixed(8);
        return newItem;
      });
      finalData.bids = newDataAsks;
      return finalData;
    });
  });
};
module.exports = orderBooks;
