#!/bin/bash

# Delete all pastes in the SQLite database

DB_FILE="db/db.sqlite"

if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 is not installed." >&2
    exit 1
fi

if [[ ! -f "$DB_FILE" ]]; then
    echo "Error: Database file '$DB_FILE' does not exist." >&2
    exit 1
fi

ids=$(sqlite3 "$DB_FILE" "SELECT id FROM pastes;")

if [[ -n "$ids" ]]; then
    while read -r id; do
        if sqlite3 "$DB_FILE" "DELETE FROM pastes WHERE id = $id;"; then
            echo "Successfully deleted item with ID $id from pastes"
        else
            echo "Failed to delete item with ID $id from pastes" >&2
        fi
    done <<< "$ids"
else
    echo "No IDs found in the pastes database."
fi
