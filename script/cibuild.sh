#!/bin/sh

set -e

echo "Testing the library …"
phantomjs "test/index.html"

echo "Testing the site …"
bundle exec rake site:test
