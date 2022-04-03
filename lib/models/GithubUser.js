const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatarURL;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatarURL = row.avatar_url;
  }

  static async insert({
    username, avatarUrl, email
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        users (username, avatar_url, email)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [username, avatarUrl, email]
    );

    return new GithubUser(rows[0]);
  }
};
