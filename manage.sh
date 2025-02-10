#!/bin/bash

# List or Delete Pastes

DB_FILE="db/db.sqlite"

check_sqlite() {
    if ! command -v sqlite3 &> /dev/null; then
        echo "Error: sqlite3 is not installed." >&2
        exit 1
    fi
}

check_db_file() {
    if [[ ! -f "$DB_FILE" ]]; then
        echo "Error: Database file '$DB_FILE' does not exist." >&2
        exit 1
    fi
}

list_pastes() {
    sqlite3 "$DB_FILE" <<EOF
.headers on
.mode column
SELECT id, language, uuid, expires_at FROM pastes;
EOF
}

delete_pastes() {
    local ids
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
}

check_sqlite
check_db_file

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 {list|delete}" >&2
    exit 1
fi

case $1 in
    list)
        list_pastes
        ;;
    delete)
        delete_pastes
        ;;
    *)
        echo "Invalid option: $1" >&2
        echo "Usage: $0 {list|delete}" >&2
        exit 1
        ;;
esac
