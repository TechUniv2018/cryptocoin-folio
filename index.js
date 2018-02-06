const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8081,
});

server.route({
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply('Hello world!');
  },
});

if (!module.parent) {
  server.start((err) => {
    console.log(err);
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
