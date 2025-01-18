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
    production: createConnectionConfig('sqlite3', {
        filename: "./db/db.sqlite"
    }),
    development: createConnectionConfig('sqlite3', {
        filename: "./db/db.sqlite"
    }),
    development_pg: createConnectionConfig('pg', {
        host: "localhost",
        user: "username",
        password: "password",
        database: "paste"
    }),
    development_mysql: createConnectionConfig('mysql', {
        host: "localhost",
        user: "username",
        password: "password",
        database: "paste"
    })
};

module.exports = config;
