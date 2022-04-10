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
    function fetchQuotes(urlArr) {
      return Promise.all(urlArr.map((url) => fetch(url)))
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        });
    }

    // munge (if, return)
    function mungeQuotes(quote) {
      // prog q: en, futurama q: quote, quoteable q: content
      if (quote.en) return quote.en;
      if (quote[0].quote) return quote[0].quote;
      if (quote.content) return quote.content;
    }
    // tie together: fetch/munge/map (.thens)
  });
