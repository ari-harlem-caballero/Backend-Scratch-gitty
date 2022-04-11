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

  static insert({
    username, avatarUrl, email
  }) {
    return pool.query(
      `
      INSERT INTO
        users (username, avatar_url, email)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [username, avatarUrl, email]
    )

      .then(({ rows }) => new GithubUser(rows[0]));
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
      `,
      [email]
    );

    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  toJSON() {
    return { ...this };
  }
};
