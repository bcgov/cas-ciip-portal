#!/usr/bin/env bash

(
pushd app || exit 1
files=("$@")
yarn format "${files[@]/#app\//}" # remove "app/" from the file names
)
