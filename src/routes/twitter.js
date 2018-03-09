module.exports = [{
  path: '/twitter/{coin}',
  method: 'GET',
  handler: (request, response) => {
    response(request.params.coin);
  },
}];

