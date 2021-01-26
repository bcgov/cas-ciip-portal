#!/usr/bin/env bash

set -eo pipefail

pushd app || exit 1
files=("$@")
files="${files[@]/#app\//}" # remove "app/" from the file names

yarn run prettier --write $files
yarn run eslint --quiet --ext .js,.jsx,.ts,.tsx $files
