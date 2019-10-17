#!/usr/bin/env bash

(
pushd app || exit 1
yarn format "$@"
)
