const Models = require('../../../models');

const markNotifications = userId => Models.notifications.update({
  status: true,
}, {
  where: {
    userId,
  },
});

module.exports = markNotifications;
