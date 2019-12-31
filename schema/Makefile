PERL=perl
PERL_VERSION=${shell ${PERL} -e 'print substr($$^V, 1)'}
PERL_MIN_VERSION=5.10
CPAN=cpan
CPANM=cpanm
SQITCH=sqitch
SQITCH_VERSION=${word 3,${shell ${SQITCH} --version}}
SQITCH_MIN_VERSION=0.97
GREP=grep
AWK=awk
PSQL=psql -h localhost
# "psql --version" prints "psql (PostgreSQL) XX.XX"
PSQL_VERSION=${word 3,${shell ${PSQL} --version}}
PG_SERVER_VERSION=${strip ${shell ${PSQL} -tc 'show server_version;' || echo error}}
PG_MIN_VERSION=9.1
PG_ROLE=${shell whoami}
TEST_DB=ggircs_test
PG_PROVE=pg_prove -h localhost
PG_SHAREDIR=$(shell pg_config --sharedir)

.PHONY: test
test: | dropdb createdb deploy_ggircs deploy revert deploy_test_data prove_unit prove_style dropdb


.PHONY: unit
unit: | dropdb deploy_test_data prove_unit

.PHONY: deploy_test_data
deploy_test_data:
	# Deploy data in $(TEST_DB)
	@@PGDATABASE=$(TEST_DB) ./data/deploy-test-data.sh -d

.PHONY: deploy_ggircs
deploy_ggircs:
	# Deploy all SWRS changes to $(TEST_DB) using sqitch
	@@cd .cas-ggircs; sqitch deploy ${TEST_DB}; cd ..;

.PHONY: revert_ggircs
revert_ggircs:
	# Revert all SWRS changes to $(TEST_DB) using sqitch
	@@cd .cas-ggircs; sqitch revert -y ${TEST_DB}; cd ..;

.PHONY: deploy
deploy:
	# Deploy all CIIP changes to $(TEST_DB) using sqitch
	@@$(SQITCH) deploy $(TEST_DB);

.PHONY: prove_style
prove_style:
	# Run style-related test suite on all objects in db using pg_prove
	@@$(PG_PROVE) --failures -d $(TEST_DB) test/style/*_test.sql

.PHONY: prove_unit
prove_unit:
	# Run unit test suite using pg_prove
	@@$(PG_PROVE) --failures -d $(TEST_DB) test/unit/*_test.sql

.PHONY: revert
revert:
	# Revert all CIIP changes to $(TEST_DB) using sqitch
	@@$(SQITCH) revert -y $(TEST_DB);

.PHONY: createdb
createdb:
	# Ensure the $(TEST_DB) database exists
	-@@$(PSQL) -tc "SELECT 1 FROM pg_database WHERE datname = '$(TEST_DB)'" | \
		$(GREP) -q 1 || \
		$(PSQL) -c "CREATE DATABASE $(TEST_DB)";

.PHONY: dropdb
dropdb:
	# Drop the $(TEST_DB) database
	-@@$(PSQL) -tc "SELECT 1 FROM pg_database WHERE datname = '$(TEST_DB)'" | \
		$(GREP) -q 0 || \
		$(PSQL) -c "DROP DATABASE $(TEST_DB)";

define check_file_in_path
	${if ${shell which ${word 1,${1}}},
		${info ✓ Found ${word 1,${1}}},
		${error ✖ No ${word 1,${1}} in path.}
	}
endef

define check_min_version_num
	${if ${shell printf '%s\n%s\n' "${3}" "${2}" | sort -CV || echo error},
		${error ✖ ${word 1,${1}} version needs to be at least ${3}.},
		${info ✓ ${word 1,${1}} version is at least ${3}.}
	}
endef

.PHONY: verify_installed
verify_installed:
	$(call check_file_in_path,${PERL})
	$(call check_min_version_num,${PERL},${PERL_VERSION},${PERL_MIN_VERSION})

	$(call check_file_in_path,${CPAN})
	$(call check_file_in_path,${GIT})

	$(call check_file_in_path,${PSQL})
	$(call check_min_version_num,${PSQL},${PSQL_VERSION},${PG_MIN_VERSION})
	@@echo ✓ External dependencies are installed

.PHONY: verify_pg_server
verify_pg_server:
ifeq (error,${PG_SERVER_VERSION})
	${error Error while connecting to postgres server}
else
	${info postgres is online}
endif

ifneq (${PSQL_VERSION}, ${PG_SERVER_VERSION})
	${error psql version (${PSQL_VERSION}) does not match the server version (${PG_SERVER_VERSION}) }
else
	${info psql and server versions match}
endif

ifeq (0,${shell ${PSQL} -qAtc "select count(*) from pg_user where usename='${PG_ROLE}' and usesuper=true"})
	${error A postgres role with the name "${PG_ROLE}" must exist and have the SUPERUSER privilege.}
else
	${info postgres role "${PG_ROLE}" has appropriate privileges}
endif

	@@echo ✓ PostgreSQL server is ready

.PHONY: verify
verify: verify_installed verify_pg_server

.PHONY: verify_ready
verify_ready:
	# ensure postgres is online
	@@${PSQL} -tc 'show server_version;' | ${AWK} '{print $$NF}';

.PHONY: verify
verify: verify_installed verify_ready

pgtap:
	# clone the source for pgTAP
	git clone https://github.com/theory/pgtap.git && \
		cd pgtap && \
		git checkout v1.0.0;

.PHONY: install_pgtap
install_pgtap: pgtap
	$(info install pgTAP into postgres)
	@@$(MAKE) -C pgtap
	@@$(MAKE) -C pgtap install
	@@$(MAKE) -C pgtap installcheck

.PHONY: install_cpanm
install_cpanm:
ifeq ($(shell which $(word 1,$(CPANM))),)
	# install cpanm
	@@$(CPAN) App:cpanminus
endif

.PHONY: install_cpandeps
install_cpandeps:
	# install Perl dependencies from cpanfile
	$(CPANM) --installdeps .

.PHONY: postinstall_check
postinstall_check:
	@@printf '%s\n%s\n' "${SQITCH_MIN_VERSION}" "${SQITCH_VERSION}" | sort -CV ||\
 	(echo "FATAL: ${SQITCH} version should be at least ${SQITCH_MIN_VERSION}. Make sure the ${SQITCH} executable installed by cpanminus is available has the highest priority in the PATH" && exit 1);

.PHONY: install
install: install_cpanm install_cpandeps postinstall_check
