#!/bin/sh

set -e

echo "building the site..."
bundle exec rake site:test
