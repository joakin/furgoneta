
compile:

test:
	./node_modules/.bin/mocha \
		--colors

test-w:
	./node_modules/.bin/mocha \
		--colors \
		--watch

.PHONY: compile test test-w
