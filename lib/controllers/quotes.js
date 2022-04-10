const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router()
  .get('/', (req, res) => {
    // set all quote urls to fetch/munge
    const urlArr = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random'
    ];
    // fetch urls from the arr (map through/promise response)
    // munge (if, return)
    // tie together: fetch/munge/map (.thens)
  });
