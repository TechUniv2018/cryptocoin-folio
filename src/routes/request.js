module.exports = [{
  method: 'POST',
  path: '/request',
  handler: (request, response) => {
    response('Request route').code(201);
  },
}];

