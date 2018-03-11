const Client = require('../utils/constants/twitterClient');
const coinNames = require('../utils/constants/coin-dictionary');

module.exports = [{
  path: '/twitter/{coin}',
  method: 'GET',
  handler: (request, response) => {
    const coin = request.params.coin || 'BTC';
    Client.get('search/tweets', { q: coinNames[coin], lang: 'en', tweet_mode: 'extended' }, (error, tweets) => {
      if (error) {
        return response([]).code(500);
      }
      const newTweets = tweets.statuses.map(tweet => ({
        fullName: tweet.user.name,
        content: tweet.full_text,
        screenName: tweet.user.screen_name,
        profPic: tweet.user.profile_image_url,
      }));
      return response(newTweets);
    });
  },
}];
