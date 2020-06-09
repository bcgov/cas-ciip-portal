FROM debian:10

ENV SUMMARY="An image for the cas-ciip-portal app" \
    DESCRIPTION="This image contains the compiled ciip portal node app"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="CAS CIIP Portal tools" \
      io.openshift.tags="cas,ciip, node" \
      name="cas-ciip-portal-tools" \
      version="1" \
      maintainer="Matthieu Foucault <matthieu@button.is>"

RUN apt-get update && \
    apt-get install -y git gnupg curl && \
    apt-get clean


RUN useradd -ms /bin/bash ciip
USER ciip
COPY app/ /home/ciip/
WORKDIR /home/ciip

RUN git clone https://github.com/asdf-vm/asdf.git ~/asdf --branch v0.7.4
RUN cd ~/asdf && git checkout v0.7.4
ENV BASH_ENV="/home/ciip/asdf/asdf.sh"
# Because asdf is loaded via BASH_ENV, all commands using adsf need to be executed using /usr/bin/env bash -c
SHELL ["/usr/bin/env", "bash", "-c"]

COPY .tool-versions /home/ciip/.tool-versions
# The app only needs yarn and node
RUN sed -i -nr '/node|yarn/p' ~/.tool-versions
RUN cat ~/.tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add
RUN asdf plugin-update --all
# The nodejs release team keyring is needed to install the asdf node plugin
RUN ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

RUN asdf install
RUN asdf reshim

RUN yarn install --frozen-lockfile --production=false && \
    yarn build:relay && \
    yarn build:next && \
    yarn build:storybook && \
    yarn install --frozen-lockfile --production=true && \
    yarn cache clean


# Make everything in the tools home group-writable, to accomodate anyuid (in OpenShift)
USER root
COPY .bin/fix-permissions /usr/bin/fix-permissions
RUN fix-permissions /home/tools

ENTRYPOINT ["bash"]
