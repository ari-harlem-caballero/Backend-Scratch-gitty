const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  text;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.text = row.text;
    this.createdAt = row.created_at;
  }

  static insert({ title, text }) {
    return pool.query(
      `
      INSERT INTO
        posts (title, text)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [title, text]
    )

      .then(({ rows }) => {
        new Post(rows[0]);
      });
  }

  static getAllPosts() {
    return pool.query(
      `
      SELECT
        *
      FROM
        posts
      `
    )

      .then(({ rows }) => rows.map((row) => new Post(row)));
  }
};
