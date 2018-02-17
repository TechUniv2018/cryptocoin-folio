const liveGraph = require('./liveGraph');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(liveGraph);
