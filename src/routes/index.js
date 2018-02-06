const LiveGraph = require('./LiveGraph');

module.exports = [{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
}].concat(LiveGraph);
