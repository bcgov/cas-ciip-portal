#! /usr/bin/env bash

# Just call this script with 'smoke' or 'load' as 1st argument
[ ! -d 'results' ] && mkdir results

export PERF_MODE=$1 

node test-guest.js
node test-reporter.js
node test-admin.js
k6 run k6-mutations.js
k6 run k6-uploads.js

node parse_results.js

exit $?
