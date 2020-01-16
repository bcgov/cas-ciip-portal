#!/usr/bin/env bash
set -e

__dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
pushd "$__dirname/../schema/deploy" > /dev/null

for dir in $(ls -d */)/; do
  echo ------------------
  echo  $dir
  echo \# Files Deployed:
  find $dir/ -type f | wc -l
  echo \# Files Tested:
  find ../test/unit/$dir -type f | wc -l
  echo ------------------
done

popd
