#!/bin/bash
set -e

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname/../schema/data" > /dev/null

./deploy-data.sh "$@"

popd
