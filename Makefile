.PHONY: all install rebuild clean run

all: install

install:
	@if [ -f build.js ]; then \
		echo "Build file exists. Starting to build..."; \
		node build.js; \
	else \
		echo "No build.js file found."; \
	fi

rebuild:
	@if [ -f db/db.sqlite ]; then \
		echo "Database file exists. Removing..."; \
		rm -f db/db.sqlite; \
		echo "Building new db.sqlite..."; \
		node db.js; \
	else \
		echo "No database file found."; \
	fi

run:
	@if [ -f db/db.sqlite ]  && [ -d node_modules ]; then \
		echo "Node Modules and Database exists. Running..."; \
		node app.js; \
	else \
		echo "Please build the app before attempting to run it."; \
	fi

clean:
	@{ \
		if [ -f db/db.sqlite ]; then \
			echo "Database file exists. Proceeding to remove..."; \
			rm -f db/db.sqlite; \
		else \
			echo "No database file found."; \
		fi; \
		if [ -d node_modules ]; then \
			echo "Node Modules exist. Proceeding to remove..."; \
			rm -rf node_modules; \
		else \
			echo "No node modules found."; \
		fi; \
	}
