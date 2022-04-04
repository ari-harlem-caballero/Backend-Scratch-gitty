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

  static async insert({ title, text }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        posts (title, text)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [title, text]
    );

    return new Post(rows[0]);
  }
};
