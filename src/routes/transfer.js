// const transferToUser = require('../utils/helpers/transferToUser');
const getJWTpayload = require('../utils/helpers/getJWTpayload');
const getTransactionsForTransfers = require('../utils/helpers/getTransactionsForTransfers');
const getPayload = require('../utils/helpers/getUserFormPayload');
const getTransactionById = require('../utils/helpers/getTransactionById');
const verifyOtp = require('../utils/helpers/verifyOtp');
const approveTransaction = require('../utils/helpers/approveTransaction');
const Models = require('../../models');
const pusherFunction = require('../utils/helpers/pusherFunction');

module.exports = [{
  method: 'GET',
  path: '/transfer',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({
        message: 'Token Expired',
      }).code(401);
    } else {
      const { userId } = userData;
      getTransactionsForTransfers(userId).then((transactions) => {
        response(transactions).code(200);
      }).catch(() => {
        response('Error').code(500);
      });
    }
  },
},
{
  method: 'POST',
  path: '/transfer',
  handler: (request, response) => {
    const userData = getJWTpayload(request);
    if (userData.message === 'token expired') {
      response({ message: 'Token Expired' }).code(401);
    } else {
      const fromId = userData.userId;
      const payload = getPayload(request);
      const { transactionId } = payload;
      const { otp } = payload;
      const { status } = payload;
      const { toId, fromName } = payload;
      if (status === 0) {
        Promise.all([getTransactionById(transactionId, fromId), verifyOtp(fromId, otp)])
          .then(([transaction, otpObj]) => {
            if (transaction.length > 0 && otpObj.length > 0) {
              return approveTransaction(transaction[0].id, status);
            }
            throw new Error('Invalid request');
          })
          .then(() => {
            Models.notifications.create({
              userId: toId,
              text: `${fromName} has approved your request`,
              status: false,
            })
              .then(() => Models.users.findOne({
                where: {
                  id: toId,
                },
              }))
              .then((data) => {
                pusherFunction({
                  name: data.dataValues.fullName,
                  text: `${fromName} has approved your request`,
                  status: false,
                });
                response('Transaction Approved').code(201);
              });
          })
          .catch(() => {
            response('An Error occured').code(403);
          });
      } else {
        getTransactionById(transactionId, fromId)
          .then((transaction) => {
            if (transaction.length > 0) {
              return approveTransaction(transaction[0].id, status);
            }
            throw new Error();
          })
          .then(() => {
            Models.notifications.create({
              userId: toId,
              text: `${fromName} has rejected your request`,
              status: false,
            })
              .then(() => Models.users.findOne({
                where: {
                  id: toId,
                },
              }))
              .then((data) => {
                console.log(data.dataValues);
                pusherFunction({
                  name: data.dataValues.fullName,
                  text: `${fromName} has rejected your request`,
                  status: false,
                });
                response('Transaction Rejected').code(201);
              });
          })
          .catch(() => {
            response('An error occured').code(403);
          });
      }
    }
  },
}];
