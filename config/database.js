const createConnectionConfig = (client, connection) => ({
    client,
    connection,
    useNullAsDefault: true
});

const config = {
    production: createConnectionConfig('sqlite3', {
        filename: "./db/db.sqlite"
    }),
    development: createConnectionConfig('sqlite3', {
        filename: "./db/db.sqlite"
    })
};

module.exports = config;
