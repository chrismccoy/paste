Paste is based on Pastie Express with some tweaks

1. Refactored Most of the Code Base
2. Migrated from UUID to GfyCat Style Slugs
3. 1 Year TTL
4. SQlite DB Seeder
5. Minimal Languages
6. Singular Theme (shades of purple)
7. Added MySQL Support
8. Tweaked Build Script 

Setup:

1. git clone --recursive https://github.com/chrismccoy/paste
2. node build.js
3. edit config/database.js with your database connection details (sqlite,pg,mysql)
4. node db.js (to seed sqlite if you plan on using sqlite)
5. node app.js


