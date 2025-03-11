.PHONY: all-mock dev json

all-mock: 
	@echo "Starting servers..."
	(npm run dev & npx json-server ./data/dump.json --port 8888)

dev:
	@echo "Starting Next.js development server..."
	npm run dev

json:
	@echo "Starting JSON server..."
	npx json-server ./data/dump.json --port 8888