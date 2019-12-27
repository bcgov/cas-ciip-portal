FROM registry.access.redhat.com/ubi8/s2i-core

ENV SUMMARY="An s2i builder image for the cas-ciip-portal project" \
    DESCRIPTION="This s2i builder image contains the development tool needed to build the ciip portal repository. The tools are installed via asdf (when available)"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="CAS CIIP Portal builder" \
      io.openshift.tags="s2i,cas,ciip,builder-image" \
      name="ubi8/cas-ciip-portal-builder" \
      version="1" \
      maintainer="Matthieu Foucault <matthieu@button.is>"

RUN echo $'[main]\n\
minrate=1k\n\
timeout=300s' >> /tmp/dnf.conf

RUN dnf -yb --nodocs --config=/tmp/dnf.conf install git-core make gcc vim-common
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install libxml2-devel readline-devel
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install libffi-devel bzip2-devel openssl-devel
RUN dnf -yb --nodocs --config=/tmp/dnf.conf install perl

RUN chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT} && \
    rpm-file-permissions

USER 1001

COPY ./.bin/portal-tools.sh /tmp/tools.sh
COPY ./.tool-versions ${APP_ROOT}/.tool-versions
RUN /tmp/tools.sh
