const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'ari_is_best',
    avatar_url: 'https://placekitten.com/300/300',
    email: 'gotcha@fake.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
