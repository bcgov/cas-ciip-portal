# Application Release Process

When merging to the `develop` branch, the CIIP application is continuously deployed to our development environment at https://dev.ciip.gov.bc.ca/. This document describes the steps required to deploying the application to our test (QA) and production environments.

## 1 Release Pull Request

- 1.1 Create a chore/release branch
- 1.2 From the root of the repository, run `./app/node_modules/.bin/standard-version`. This will generate the [changelog](../CHANGELOG.md), increase the version number following [semantic versioning](https://semver.org/), commit the changes and tag that commit.
- 1.3 note the version number printed by standard-version (referred to as &`<version>` below)
- 1.4 run `cd schema/ && sqitch tag v<version>  -m "release v<version>"`
- 1.5 In helm/cas-ciip-portal/Chart.yaml, set `appVersion` to `<version>`, and increas the `version` patch number.
- 1.6 Commit with the chore(release) commit type.
- 1.7 Push using `git push --follow-tags`
- 1.8 Create a pull request from chore/release to develop.

### Possible improvements

Steps 1.2 could automate 1.3 to 1.6. See https://github.com/conventional-changelog/standard-version#can-i-use-standard-version-for-additional-metadata-files-languages-or-version-files

## 2 Release CI workflow

- 2.1 Go to https://app.circleci.com/pipelines/github/bcgov/cas-ciip-portal?branch=develop
- 2.2 Manually approve the `release_approval` job in the latest `release` workflow.
- 2.3 Once the `release` workflow has passed, fast-forward the master branch and push.
- 2.4 The CIIP application should be ready to be deployed to the test and productions environment via https://cas-shipit.pathfinder.gov.bc.ca/
- 2.5 Add a `CIIP <version>` tag to the YouTrack cards corresponding to the commits being released.
