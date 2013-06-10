
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

furgoneta.js: browser
	$(BROWSERIFY) ./src/browser-index.js > browser/furgoneta.js

furgoneta-min.js: browser/furgoneta.js
	$(UGLIFYJS) browser/furgoneta.js --mangle --comments "all" > browser/furgoneta-min.js

build-browser: furgoneta.js furgoneta-min.js

loc:
	wc --lines src/*

clean:
	rm -rf browser

all: test clean build-browser

.PHONY: build-browser test test-w loc clean

