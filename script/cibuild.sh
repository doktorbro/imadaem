#!/bin/sh

set -e

echo "Testing the library …"
bundle exec rake test

echo "Testing the site …"
bundle exec rake site:test
