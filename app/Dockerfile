FROM debian:10

ENV SUMMARY="An image for the cas-ciip-portal app" \
    DESCRIPTION="This image contains the compiled ciip portal node app"

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

COPY .bin/docker-entrypoint.sh ${CIIP_HOME}
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
ENTRYPOINT ["dumb-init", "--", "./docker-entrypoint.sh"]

ENV NODE_ENV=production
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 CYPRESS_INSTALL_BINARY=0 \
    yarn install --frozen-lockfile --production=false && \
    yarn build:relay && \
    yarn build:next && \
    yarn install --frozen-lockfile --production=true && \
    yarn cache clean && \
    # Make everything in the home group-writable to support OpenShift's restricted SCC
    # Needs to be done as root to chown
    # same layer as yarn install to keep re-chowned files from using up several hundred MBs more space
    useradd -ms /bin/bash -d ${CIIP_HOME} --uid ${USER_ID} -g root ciip && \
    chown -R ciip:0 ${CIIP_HOME} && \
    chmod g=u /etc/passwd && \
    chmod -R g+rwX ${CIIP_HOME}

EXPOSE 3000
USER ${USER_ID}
WORKDIR ${CIIP_HOME}

CMD ["yarn", "start"]
