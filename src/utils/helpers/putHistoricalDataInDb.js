const Models = require('./../../../models');

module.exports = data => Models.price.upsert(data);

