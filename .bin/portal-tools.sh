#!/bin/bash

exec 2>&1
set -e
set -x

pushd /opt/app-root

git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.4
pushd ~/.asdf && git checkout v0.7.4 && popd
echo -e '\n. ~/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\nexport BASH_ENV="~/.asdf/asdf.sh"' >> ~/.bashrc
source ~/.bashrc

cat .tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add || true
asdf plugin-update --all

~/.asdf/plugins/nodejs/bin/import-release-team-keyring
POSTGRES_EXTRA_CONFIGURE_OPTIONS='--with-libxml' asdf install
asdf reshim
