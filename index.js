const Hapi = require('hapi');
const Routes = require('./src/routes/');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8081,
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    console.log(err);
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
