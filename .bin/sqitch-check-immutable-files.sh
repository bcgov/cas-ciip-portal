#!/usr/bin/env bash
# We consider any sqitch change prior to a tag to be immutable, as it may already be released to production, and should not be reverted
# This script checks whether those changes were modified in the current dir since the base branch and returns an error if that is the case
# usage: sqitch-immutable-files.sh schema_dir base_branch

set -euo pipefail
# gets the list of modified files via git diff, and removes the schema/deploy prefix, and the .sql suffix to match the sqitch plan change name
modified_changes=$(git diff --name-only "${2}" -- "${1}"/deploy | sed -e "s/.*\/\(deploy\)\///g; s/@.*//g; s/\.sql$//g")

# finds the last tag in the sqitch plan in the base branch
last_tag_on_base_branch=$(git show "${2}":"${1}"/sqitch.plan | tac | sed '/^@/q' | cut -d' ' -f1 )

# reads the sqitch.plan from the end and stops at the last tag that was on the base branch
changes_after_last_tag=$(tac "${1}"/sqitch.plan | sed "/^$last_tag_on_base_branch/Q" | cut -d' ' -f1)

# comm compares two ordered files and returns three columns "-23" suppresses colums 2 and 3,
# so it only returns the first column (the lines unique to file 1)
immutable_modified_files=$(comm -23 <(echo "$modified_changes" | sort | uniq) <(echo "$changes_after_last_tag" | sort | uniq))
if [ -n "$immutable_modified_files" ]; then
  echo "The following sqitch changes are immutable as they are part of a tagged release. Please add incremental changes instead."
  echo "$immutable_modified_files"
  exit 1
fi
