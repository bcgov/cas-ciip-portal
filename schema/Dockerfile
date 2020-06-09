# Docker build should be run from parent directory
FROM perl:5.26

ENV HOME=/usr/src/cas-ciip-portal-schema
COPY schema/* ${HOME}/
WORKDIR ${HOME}

RUN apt-get update && \
  apt-get install -y postgresql-client && \
  apt-get clean

RUN cpanm --notest -l extlib --installdeps .
COPY .bin/fix-permissions /usr/bin/fix-permissions
COPY .bin/deploy-data.sh /usr/bin/deploy-data
RUN chmod g=u /etc/passwd && fix-permissions ./

# CPAN can install scripts. They should be available from mod_perl too.
ENV PATH="$PATH:$HOME/extlib/bin"
# And we have to set Perl include path too because mod_perl's PerlSwitches
# does not apply to them.
ENV PERL5LIB=${HOME}/extlib/lib/perl5
