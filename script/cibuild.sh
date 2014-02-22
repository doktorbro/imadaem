#!/bin/sh

set -e

echo "Testing the library …"
bundle exec rake qunit

echo "Testing the site …"
bundle exec rake site:test
