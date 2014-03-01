#!/bin/sh

set -e

echo "Linting source …"
jshint js/jquery.imadaem.js

echo "Linting tests …"
jshint test/*.js
