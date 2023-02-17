SHELL := /usr/bin/env bash
PERL=perl
PERL_VERSION=${shell ${PERL} -e 'print substr($$^V, 1)'}
PERL_MIN_VERSION=5.10
CPAN=cpan
CPANM=cpanm
SQITCH=sqitch
SQITCH_VERSION=${word 3,${shell ${SQITCH} --version}}
SQITCH_MIN_VERSION=1.0.0
GREP=grep
AWK=awk
PSQL=psql -h localhost
# "psql --version" prints "psql (PostgreSQL) XX.XX"
PSQL_VERSION=${word 3,${shell ${PSQL} --version}}
PG_SERVER_VERSION=${strip ${shell ${PSQL} -tc 'show server_version;' || echo error}}
PG_MIN_VERSION=9.1
PG_ROLE=${shell whoami}
TEST_DB=ciip_portal_test
PG_PROVE=pg_prove -h localhost
PG_SHAREDIR=$(shell pg_config --sharedir)
DEPLOY_DEFAULT_DATA=deploy_dev_data
PGTAP_VERSION=1.2.0
ifeq ($(MAKECMDGOALS),$(filter $(MAKECMDGOALS),help whoami lint configure build_app build_schema build_tools build install install_test clean_old_tags))
include .pipeline/oc.mk
include .pipeline/make.mk
endif

# escape commas in function calls with $(,)
# see https://blog.jgc.org/2007/06/escaping-comma-and-space-in-gnu-make.html
, := ,

PATHFINDER_PREFIX := 09269b
PROJECT_PREFIX := cas-ciip-

THIS_FILE := $(lastword $(MAKEFILE_LIST))

.PHONY: help
help: $(call make_help,help,Explains how to use this Makefile)
	@@exit 0

.PHONY: targets
targets: $(call make_help,targets,Lists all targets in this Makefile)
	$(call make_list_targets,$(THIS_FILE))

.PHONY: whoami
whoami: $(call make_help,whoami,Prints the name of the user currently authenticated via `oc`)
	$(call oc_whoami)

.PHONY: project
project: whoami
project: $(call make_help,project,Switches to the desired $$OC_PROJECT namespace)
	$(call oc_project)

.PHONY: lint
lint: $(call make_help,lint,Checks the configured yml template definitions against the remote schema)
lint: whoami
lint:
	@set -euo pipefail; \
	helm dep up ./helm/cas-ciip-portal; \
	helm template -f ./helm/cas-ciip-portal/values-dev.yaml --set ggircs.namespace=lint --set ggircs.environment=lint --set ggircs.prefix=lint cas-ciip-portal ./helm/cas-ciip-portal --validate; \
	helm template -f ./helm/cas-ciip-portal/values-test.yaml --set ggircs.namespace=lint --set ggircs.environment=lint --set ggircs.prefix=lint cas-ciip-portal ./helm/cas-ciip-portal --validate; \
	helm template -f ./helm/cas-ciip-portal/values-prod.yaml --set ggircs.namespace=lint --set ggircs.environment=lint --set ggircs.prefix=lint cas-ciip-portal ./helm/cas-ciip-portal --validate;


.PHONY: install
install: whoami
install: OC_PROJECT=$(CIIP_NAMESPACE_PREFIX)-$(ENVIRONMENT)
install: GGIRCS_PROJECT=$(GGIRCS_NAMESPACE_PREFIX)-$(ENVIRONMENT)
install:
	@set -euo pipefail; \
	dagConfig=$$(echo '{"org": "bcgov", "repo": "cas-ciip-portal", "ref": "$(GIT_SHA1)", "path": "dags/cas_ciip_portal_dags.py"}' | base64 -w0); \
	helm dep up ./helm/cas-ciip-portal; \
	if ! helm status --namespace $(OC_PROJECT) cas-ciip-portal; then \
		helm install --atomic --wait-for-jobs --timeout 2400s --namespace $(OC_PROJECT) \
		--set route.insecure=true \
		--set nginx-sidecar.sslTermination=false \
		--set image.schema.tag=$(GIT_SHA1) --set image.app.tag=$(GIT_SHA1) \
		--set ggircs.namespace=$(GGIRCS_PROJECT) \
		--set ggircs.prefix=$(GGIRCS_NAMESPACE_PREFIX) \
		--set ggircs.environment=$(ENVIRONMENT) \
	  --set download-cas-ciip-portal-dags.dagConfiguration="$$dagConfig" \
		--values ./helm/cas-ciip-portal/values-$(ENVIRONMENT).yaml \
		cas-ciip-portal ./helm/cas-ciip-portal; \
	fi; \
	helm upgrade --install --atomic --wait-for-jobs --timeout 2400s --namespace $(OC_PROJECT) \
	--set image.schema.tag=$(GIT_SHA1) --set image.app.tag=$(GIT_SHA1) \
	--set ggircs.namespace=$(GGIRCS_PROJECT) \
	--set ggircs.prefix=$(GGIRCS_NAMESPACE_PREFIX) \
	--set ggircs.environment=$(ENVIRONMENT) \
	--set download-cas-ciip-portal-dags.dagConfiguration="$$dagConfig" \
	--values ./helm/cas-ciip-portal/values-$(ENVIRONMENT).yaml \
	cas-ciip-portal ./helm/cas-ciip-portal;

.PHONY: install_test
install_test: OC_PROJECT=$(OC_TEST_PROJECT)
install_test: install

.PHONY: install_load_test
install_load_test: whoami
install_load_test: OC_PROJECT=$(CIIP_NAMESPACE_PREFIX)-dev
install_load_test: GGIRCS_PROJECT=$(GGIRCS_NAMESPACE_PREFIX)-dev
install_load_test:
	@set -euo pipefail; \
	helm dep up ./helm/cas-ciip-portal; \
	helm upgrade --install --atomic --timeout 2400s --namespace $(OC_PROJECT) \
	--set image.schema.tag=$(GIT_SHA1) --set image.app.tag=$(GIT_SHA1) \
	--set loadTesting.image.tag=$(GIT_SHA1) \
	--set ggircs.namespace=$(GGIRCS_PROJECT) \
	--set ggircs.prefix=$(GGIRCS_NAMESPACE_PREFIX) \
	--set ggircs.environment=dev \
	--values ./helm/cas-ciip-portal/values-dev.yaml \
	--values ./helm/cas-ciip-portal/values-load-testing.yaml \
	cas-ciip-portal ./helm/cas-ciip-portal;



.PHONY: install_asdf_tools
install_asdf_tools:
	@cat .tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add || true
	which node
	@asdf plugin-update --all
	which node
	@#MAKELEVEL=0 is required because of https://www.postgresql.org/message-id/1118.1538056039%40sss.pgh.pa.us
	@MAKELEVEL=0 POSTGRES_EXTRA_CONFIGURE_OPTIONS='--with-libxml' asdf install
	@asdf reshim
	@pip install -r requirements.txt
	@asdf reshim

.PHONY: install_pgtap
install_pgtap: ## install pgTAP extension into postgres
install_pgtap: start_pg
install_pgtap:
	@$(PSQL) -d postgres -tc "select count(*) from pg_available_extensions where name='pgtap' and default_version='$(PGTAP_VERSION)';" | \
		grep -q 1 || \
		(git clone https://github.com/theory/pgtap.git --depth 1 --branch v$(PGTAP_VERSION) && \
		$(MAKE) -C pgtap && \
		$(MAKE) -C pgtap install && \
		$(MAKE) -C pgtap installcheck && \
		rm -rf pgtap)

.PHONY: install_cpanm
install_cpanm: ## install the cpanm tool
install_cpanm:
ifeq ($(shell which $(word 2,$(CPANM))),)
	# install cpanm
	@$(CPAN) App::cpanminus
endif

.PHONY: install_cpandeps
install_cpandeps: ## install Perl dependencies from cpanfile
install_cpandeps:
	@$(CPANM) --installdeps .
	@rm -rf $(__DIRNAME)/.cpanm

.PHONY: postinstall_check
postinstall_check: ## check that the installation was successful and that the correct sqitch version is available in the PATH
postinstall_check:
	@printf '%s\n%s\n' "${SQITCH_MIN_VERSION}" "${SQITCH_VERSION}" | sort -CV ||\
 	(echo "FATAL: sqitch version should be at least ${SQITCH_MIN_VERSION}. Make sure the sqitch executable installed by cpanminus is available has the highest priority in the PATH" && exit 1);

.PHONY: install_perl_tools
install_perl_tools: ## install cpanm and sqitch
install_perl_tools: install_cpanm install_cpandeps postinstall_check

.PHONY: install_dev_tools
install_dev_tools: ## install development tools
install_dev_tools: stop_pg install_asdf_tools install_perl_tools install_pgtap

.PHONY: start_pg
start_pg: ## start the database server if it is not running
start_pg:
	@pg_ctl status || pg_ctl start

.PHONY: stop_pg
stop_pg: ## stop the database server. Always exits with 0
stop_pg:
	@pg_ctl stop; true

.PHONY: deploy_test_data
deploy_test_data: $(call make_help,deploy_data,deploys database schemas and data)
deploy_test_data:
	@bash ./.bin/deploy-data.sh --drop-db --dev-data

.PHONY: release
release: ## Tag a release using release-it
release:
	@yarn
	@yarn release-it
