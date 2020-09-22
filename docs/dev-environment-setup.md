Tools and environment
=====================

- Install ASDF (https://asdf-vm.com/#/)
    BC Gov Mac doc: https://apps.nrs.gov.bc.ca/int/confluence/display/DEVGUILD/One-time+Setup?

- `>$ pip3 install pre-commit`
- `>$ pre-commit run --all-files

- `>$ make install_asdf_tools`

- Start & configure psql server
    https://www.postgresql.org/download/macosx/ for an installer
    `>$ pg_ctl start`
    `>$ createdb <username>` where the username is your username on this mac (usually your IDIR, lowercase) (!! Important !!)
    `>$ psql`
        `psql$ create role postgres with LOGIN SUPERUSER CREATEROLE CREATEDB REPLICATION BYPASSRLS`

- Setup PERL env - DO NOT RELY ON SYSTEM PERL
    - make sure the latest xcode command line tools are installed (https://developer.apple.com/download/more/?=command%20line%20tools)
    - make sure homebrew is installed
    - `>$ brew install perl` ( or this https://learn.perl.org/installing/osx.html without homebrew )
    - you might have to configure perl env variables to point at local libraries (see here https://apple.stackexchange.com/questions/89271/how-to-install-modules-from-cpan-without-sudo)
    - And, make sure the PERL5LIB environment variable is properly set (wonky in my case)

    ```
    ~/.bashrc:
        export PERL5LIB=~/lib/perl5/lib/perl5/

        PERL_LOCAL_LIB_ROOT="/Users/pbastian/lib/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
        PERL_MB_OPT="--install_base \"/Users/pbastian/lib/perl5\""; export PERL_MB_OPT;
        PERL_MM_OPT="INSTALL_BASE=/Users/pbastian/lib/perl5"; export PERL_MM_OPT;
    ```

- Install Sqitch
    `>$ brew tap sqitchers/sqitch`
    `>$ brew install sqitch`

- Install Pgtap
    `>$ cd schema`
    `>$ make install_pgtap`

- Init git submodules
    `>$ git submodule init`
    `>$ git submodule update`


Troubleshooting
===============
    `>$ brew doctor` can be useful to fix homebrew dependencies


Database
========

> To reseed the database after a branch change
./.bin/deploy-data.sh -d -dev
cd schema && make deploy_test_data

./.bin/deploy-data.sh --help


Frontend
========
cd app
yarn --dev

yarn dev AS_REPORTER // member of the public, who is going to apply on behalf of the facility (operational representative)
         AS_ADMIN // analyst's boss - can do analyst + setting deadlines, sett
         AS_ANALYST // internal BC GOV - CAS reviewer, can create organizations for reporters, and put the reporter on the allow list for that org
         AS_CERTIFIER // similar to reporter, responsible for the financial, signs off on the data

