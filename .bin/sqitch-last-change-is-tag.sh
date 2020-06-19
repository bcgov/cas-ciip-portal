#!/usr/bin/env bash

# Usage sqitch-last-change-is-tag.sh path/to/schema/dir
# tests if the last change of the sqitch plan file is a tag

[[ "$(tail -1 "${1}"/sqitch.plan)" == @* ]]
