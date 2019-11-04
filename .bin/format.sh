#!/usr/bin/env bash

# TODO: actually run linter on CI as an enforced step
[[ $CI == 'true' ]] && echo 'Skipping "yarn format" on CI' && exit 0

(
pushd app || exit 1
files=("$@")
yarn format "${files[@]/#app\//}" # remove "app/" from the file names
)
