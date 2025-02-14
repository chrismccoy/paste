Paste is based on Pastie Express with some tweaks

1. Refactored Most of the Code Base
2. Migrated from UUID to GfyCat Style Slugs
3. 1 Year TTL
4. SQlite DB Creator and Seeder
5. Minimal Languages
6. Singular Theme (nord)
7. Build Script 
8. Added nginx.conf proxy example
9. Added apache.conf proxy example
10. Makefile 
11. Bash Script to List and Delete Pastes

Setup:

1. git clone --recursive https://github.com/chrismccoy/paste
2. npm run build
3. npm start

Rebuild the Database from Scratch:

1. npm run db

List and Delete Pastes

1. manage.sh with the arg list/delete will list and delete items in the sqlite database

