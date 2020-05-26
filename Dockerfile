FROM registry.access.redhat.com/ubi8/s2i-core

ENV SUMMARY="An s2i builder image for the cas-ciip-portal project" \
    DESCRIPTION="This s2i builder image contains the development tool needed to build the ciip portal repository. The tools are installed via asdf (when available)"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="CAS CIIP Portal builder" \
      io.openshift.tags="s2i,cas,ciip,builder-image" \
      name="ubi8/cas-ciip-portal-tools" \
      version="1" \
      maintainer="Matthieu Foucault <matthieu@button.is>"

RUN echo $'[main]\n\
minrate=1k\n\
timeout=300s' >> /tmp/dnf.conf

# Base set of dependencies
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install git-core make gcc vim-common
# Postgres dependencies
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install libxml2-devel readline-devel
# Python dependencies
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install libffi-devel bzip2-devel openssl-devel
# Perl (currenly no asdf plugin for Perl).
# perl-DBD-Pg needs to be installed as a package (not a CPAN dependency)
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install perl-devel perl-CPAN perl-DBD-Pg

RUN git clone https://github.com/asdf-vm/asdf.git ${APP_ROOT}/asdf --branch v0.7.4
RUN pushd ${APP_ROOT}/asdf && git checkout v0.7.4 && popd
ENV BASH_ENV="${APP_ROOT}/asdf/asdf.sh"
COPY ./.tool-versions ${APP_ROOT}/.tool-versions
RUN chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT} &&\
    chmod ug+x ${APP_ROOT}/asdf/asdf.sh && rpm-file-permissions
USER 1001

# Because asdf is loaded via BASH_ENV, all commands using adsf need to be executed using /usr/bin/env bash -c
RUN /usr/bin/env bash -c "cat ${APP_ROOT}/.tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add"
RUN /usr/bin/env bash -c "asdf plugin-update --all"
# The nodejs release team keyring is needed to install the asdf node plugin
RUN /usr/bin/env bash -c "~/.asdf/plugins/nodejs/bin/import-release-team-keyring"

# POSTGRES_EXTRA_CONFIGURE_OPTIONS is used during asdf install
ENV POSTGRES_EXTRA_CONFIGURE_OPTIONS='--with-libxml'

RUN /usr/bin/env bash -c "asdf install"
RUN /usr/bin/env bash -c "asdf reshim"
