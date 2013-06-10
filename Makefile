
default: all

BROWSERIFY = node_modules/.bin/browserify
UGLIFYJS = node_modules/.bin/uglifyjs
MOCHA = node_modules/.bin/mocha

test:
	$(MOCHA) --colors

test-w:
	$(MOCHA) --colors --watch

browser:
	mkdir browser/

fjs.js: browser
	$(BROWSERIFY) ./src/browser-index.js > browser/fjs.js

fjs-min.js: browser/fjs.js
	$(UGLIFYJS) browser/fjs.js --mangle --comments "all" > browser/fjs-min.js

build-browser: fjs.js fjs-min.js

loc:
	wc --lines src/*

clean:
	rm -rf browser

all: test clean build-browser

.PHONY: build-browser test test-w loc clean

