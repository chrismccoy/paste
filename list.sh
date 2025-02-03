#!/bin/bash

# List all pastes in the SQLite database

DOMAIN="https://domain.com"
DB_FILE="db/db.sqlite"

# Check if sqlite3 is installed
if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 is not installed." >&2
    exit 1
fi

# Check if the database file exists
if [[ ! -f "$DB_FILE" ]]; then
    echo "Error: Database file '$DB_FILE' does not exist." >&2
    exit 1
fi

# Fetch pastes from the database and print their URLs
sqlite3 "$DB_FILE" "SELECT key FROM pastes;" | while read -r paste; do
    echo "$DOMAIN/$paste"
done
