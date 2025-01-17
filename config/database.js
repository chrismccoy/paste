const migrations = {
    directory: "./db/migrations",
    tableName: "migrations"
};

const createConnectionConfig = (client, connection) => ({
    client,
    connection,
    migrations
});

const config = {
    production: createConnectionConfig('pg', process.env["DATABASE_URL"]),
    development: createConnectionConfig('pg', {
        host: "localhost",
        user: "pastie",
        password: "localdev",
        database: "pastie"
    }),
    development_sqlite: createConnectionConfig('sqlite3', {
        filename: "./db/development.sqlite"
    })
};

module.exports = config;
