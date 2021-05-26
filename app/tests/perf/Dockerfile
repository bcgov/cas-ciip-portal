FROM debian:10

ENV SUMMARY="An image for load-testing the cas-ciip-portal app" \
  DESCRIPTION="This image contains the load-testing setup for cas-ciip-portal"

LABEL summary="$SUMMARY" \
  description="$DESCRIPTION" \
  io.k8s.description="$DESCRIPTION" \
  io.k8s.display-name="CAS CIIP Portal tools" \
  io.openshift.tags="cas,ciip,node" \
  name="cas-ciip-portal-tools" \
  version="1" \
  maintainer="Matthieu Foucault <matthieu@button.is>"

RUN apt-get update && \
  apt-get install -y git gnupg curl && \
  apt-get clean

RUN sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 && \
  echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list && \
  sudo apt-get update && \
  sudo apt-get install k6

ENV USER_ID=1001
ENV CIIP_HOME=/root
ENV HOME=/root

WORKDIR ${CIIP_HOME}

COPY app/ ${CIIP_HOME}/

RUN git clone https://github.com/asdf-vm/asdf.git ${CIIP_HOME}/asdf --branch v0.7.4
RUN cd ${CIIP_HOME}/asdf && git checkout v0.7.4
ENV BASH_ENV="${CIIP_HOME}/asdf/asdf.sh"
# Because asdf is loaded via BASH_ENV, all commands using adsf need to be executed using /usr/bin/env bash -c
SHELL ["/usr/bin/env", "bash", "-c"]

COPY .tool-versions ${CIIP_HOME}/.tool-versions
# The app only needs yarn and node
RUN sed -i -nr '/node|yarn/p' ${CIIP_HOME}/.tool-versions
RUN cat ${CIIP_HOME}/.tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add
RUN asdf plugin-update --all
# The nodejs release team keyring is needed to install the asdf node plugin
RUN ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

RUN asdf install
RUN asdf reshim

ENV NODE_ENV=production
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 CYPRESS_INSTALL_BINARY=0 \
  yarn install --frozen-lockfile --production=false && \
  yarn build:relay-persist && \
  yarn cache clean && \
  # Make everything in the home group-writable to support OpenShift's restricted SCC
  # Needs to be done as root to chown
  # same layer as yarn install to keep re-chowned files from using up several hundred MBs more space
  useradd -ms /bin/bash -d ${CIIP_HOME} --uid ${USER_ID} -g root ciip && \
  chown -R ciip:0 ${CIIP_HOME} && \
  chmod -R g+rwX ${CIIP_HOME}

USER ${USER_ID}
WORKDIR ${CIIP_HOME}

CMD ["yarn", "test:load"]
