const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    })
  })

    .then((token) => {
      return token.json();
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
  
    .then((profileResponse) => {
      return profileResponse.json();
    })
    .then((profile) => {
      const newProfile = {
        username: profile.login,
        avatar: profile.avatar_url,
        email: profile.email,
      };

      return newProfile;
    });
};

module.exports = { exchangeCodeForToken, getGithubProfile };
