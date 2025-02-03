Paste is based on Pastie Express with some tweaks

1. Refactored Most of the Code Base
2. Migrated from UUID to GfyCat Style Slugs
3. 1 Year TTL
4. SQlite DB Creator and Seeder
5. Minimal Languages
6. Singular Theme (shades of purple)
7. Build Script 
8. Added nginx.conf proxy example
9. Added apache.conf proxy example
10. Makefile 
11. Bash Script to List and Delete Pastes

Setup:

1. git clone --recursive https://github.com/chrismccoy/paste
1. make or node build.js
3. make run or node app.js

Rebuild the Database:

1. make rebuild or node db.js after removing db.sqlite file

Clean up:

1. make clean or rm -f db/db.sqlite && rm -rf node_modules

List and Delete Pastes

1. manage.sh with the arg list/delete will list and delete items in the sqlite database

