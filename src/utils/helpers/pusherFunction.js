const Pusher = require('pusher');

const pusherFunction = (messageInJson) => {
  console.log(messageInJson);
  const pusher = new Pusher({
    appId: '495535',
    key: '2f14d98336c0adcbc97b',
    secret: '31897676600e891b3260',
    cluster: 'ap2',
    encrypted: true,
  });

  pusher.trigger(
    'my-channel', 'my-event',
    messageInJson,
  );
};

module.exports = pusherFunction;
