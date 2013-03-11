
compile:
	./node_modules/.bin/coffee -o lib/ src/

test:
	./node_modules/.bin/mocha \
		--compilers coffee:coffee-script \
		--colors

test-w:
	./node_modules/.bin/mocha \
		--compilers coffee:coffee-script \
		--colors \
		--watch

.PHONY: compile test test-w
