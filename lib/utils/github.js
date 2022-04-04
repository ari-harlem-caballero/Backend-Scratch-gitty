const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const token = fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    },
  });

  return token;
};

const getGithubProfile = async (token) => {
  // TODO: Implement me!
  const response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`
    }
  });
  
  return response;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
