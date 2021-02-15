const config = {
  development: {
    client: "pg",
    connection: {
      connectionString:
        process.env.REACT_APP_DATABASE_URL ||
        `postgres://${process.env.USER}:${process.env.PW}@127.0.0.1:5432/notes`,
      ssl: process.env.REACT_APP_HAS_SSL
        ? { rejectUnauthorized: false }
        : undefined,
    },
    migrations: {
      directory: __dirname + "/../database/migrations",
    },
    seeds: {
      directory: __dirname + "/../database/seeds",
    },
    searchPath: "public",
  },
};

module.exports = config;
