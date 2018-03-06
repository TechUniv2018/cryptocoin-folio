const coins = Object.keys(require('./coin-dictionary'));

module.exports = {
  EXTERNAL_LIVE_PRICE: 'https://min-api.cryptocompare.com/data/price?fsyms=BTC,ETH,XRP,LTC,NEO,XMR,ZEC,BCH,BTS,ETC&tsyms=USD',
  EXTERNAL_LIVE_PRICE_DETAIL: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${[...coins]}&tsyms=USD`,
};
