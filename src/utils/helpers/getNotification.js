const Models = require('../../../models');

const getNotification = userId => Models.notifications.findAll({
  where: {
    userId,
  },
  order: [['updatedAt', 'DESC']],
})
  .then(result => result.map(notification => ({
    transactionId: notification.dataValues.transactionId,
    text: notification.dataValues.text,
    status: notification.dataValues.status,
  })));

module.exports = getNotification;
