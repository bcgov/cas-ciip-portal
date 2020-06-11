# Docker build should be run from parent directory
FROM perl:5.26

ENV USER_ID=1001
ENV CIIP_HOME=/root
ENV HOME=/root
COPY schema/ ${HOME}/
WORKDIR ${HOME}

RUN apt-get update && \
  apt-get install -y postgresql-client && \
  apt-get clean

RUN cpanm --notest -l extlib --installdeps .

# CPAN can install scripts. They should be available from mod_perl too.
ENV PATH="$PATH:$HOME/extlib/bin"
# And we have to set Perl include path too because mod_perl's PerlSwitches
# does not apply to them.
ENV PERL5LIB=${HOME}/extlib/lib/perl5

COPY .bin/docker-entrypoint.sh ${CIIP_HOME}
COPY .bin/trigger-airflow-dag.sh ${CIIP_HOME}

# Make everything in the home group-writable, to accomodate anyuid (in OpenShift)
# /etc/passwd needs to be group-writable too -_-
# Needs to be done as root to chown
RUN useradd -ms /bin/bash -d ${CIIP_HOME} --uid ${USER_ID} ciip
RUN chown -R ciip:0 ${CIIP_HOME} && \
    chmod g=u /etc/passwd && \
    chmod -R g+rwX ${CIIP_HOME}

EXPOSE 3000
USER ${USER_ID}
WORKDIR ${CIIP_HOME}

ENTRYPOINT ["./docker-entrypoint.sh"]
