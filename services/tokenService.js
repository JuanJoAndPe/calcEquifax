const axios = require('axios');
const { tokenApiUrl, tokenApiClient, tokenApiSecret } = require('../utils/config');

let cachedToken = null;
let tokenExpiresAt = null;

async function getToken() {
  const now = Date.now();

  if (cachedToken && tokenExpiresAt > now) {
    return cachedToken;
  }

  const auth = Buffer.from(`${tokenApiClient}:${tokenApiSecret}`).toString('base64');

  const res = await axios.post(tokenApiUrl, 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
  });

  cachedToken = res.data.access_token;
  tokenExpiresAt = now + res.data.expires_in * 1000;

  return cachedToken;
}

module.exports = { getToken };
