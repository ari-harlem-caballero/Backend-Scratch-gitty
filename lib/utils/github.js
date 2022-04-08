const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    },
  })

    .then((token) => {
      return token;
    });
};

const getGithubProfile = (token) => {
  // TODO: Implement me!
  fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${token}`
    }
  })
  
    .then((profile) => {
      return profile;
    });
};

module.exports = { exchangeCodeForToken, getGithubProfile };
