#!/bin/sh

set -e

echo "linting with Jslint …"
jslint js/jquery.imadaem.js

echo "linting with Jshint …"
jshint js/jquery.imadaem.js
