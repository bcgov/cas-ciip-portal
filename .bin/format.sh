#!/usr/bin/env bash

set -eo pipefail

# TODO: actually run linter on CI as an enforced step
[[ $CI == 'true' ]] && echo 'Skipping "yarn format" on CI' && exit 0

pushd app || exit 1
files=("$@")
files="${files[@]/#app\//}" # remove "app/" from the file names

yarn run prettier --write $files
yarn run eslint --ext .js,.jsx,.ts,.tsx $files
