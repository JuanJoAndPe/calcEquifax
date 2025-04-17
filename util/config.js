require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  tokenApiUrl: process.env.TOKEN_API_URL,
  tokenApiClient: process.env.TOKEN_API_CLIENT,
  tokenApiSecret: process.env.TOKEN_API_SECRET,
  equifaxApiUrl: process.env.EQUIFAX_API_URL,
};
