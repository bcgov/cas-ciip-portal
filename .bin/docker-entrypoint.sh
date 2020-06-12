#!/usr/bin/env bash

set -e

# Fix OpenShift fail
# see https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html
if ! whoami &> /dev/null; then
  if [ -w /etc/passwd ]; then
    echo "${USER_NAME:-ciip}:x:$(id -u):0:${USER_NAME:-ciip} user:${CIIP_HOME}:/sbin/nologin" >> /etc/passwd
  fi
fi

exec "$@"
