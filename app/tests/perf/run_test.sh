#! /usr/bin/env bash

# Just call this script with 'smoke' or 'load' as 1st argument
[ ! -d 'results' ] && mkdir results

export PERF_MODE=$1 

# node test-guest.js
node test-reporter.js
k6 run k6-mutations.js
node test-admin.js

node parse_results.js

exit $?
