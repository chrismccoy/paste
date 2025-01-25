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

Setup:

1. git clone --recursive https://github.com/chrismccoy/paste
2. make
3. make run

Rebuild the Database:

1. make rebuild

Clean up by removing the sqlite database and node modules

1. make clean

