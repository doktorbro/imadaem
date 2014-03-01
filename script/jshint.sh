#!/bin/sh

set -e

echo "Linting with Jshint …"
jshint js/jquery.imadaem.js
jshint test/*.js
