SHELL := /usr/bin/env bash
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
	helm template -f ./helm/cas-ciip-portal/values-dev.yaml cas-ciip-portal ./helm/cas-ciip-portal --validate; \
	helm template -f ./helm/cas-ciip-portal/values-test.yaml cas-ciip-portal ./helm/cas-ciip-portal --validate;
	helm template -f ./helm/cas-ciip-portal/values-prod.yaml cas-ciip-portal ./helm/cas-ciip-portal --validate;


.PHONY: install
install: whoami
install: OC_PROJECT=$(CIIP_NAMESPACE_PREFIX)-$(ENVIRONMENT)
install: GGIRCS_PROJECT=$(GGIRCS_NAMESPACE_PREFIX)-$(ENVIRONMENT)
install:
	@set -euo pipefail; \
	helm dep up ./helm/cas-ciip-portal; \
	if ! helm status --namespace $(OC_PROJECT) cas-ciip-portal; then \
		helm install --atomic --timeout 2400s --namespace $(OC_PROJECT) \
		--set route.insecure=true \
		--set image.schema.tag=$(GIT_SHA1) --set image.app.tag=$(GIT_SHA1) \
		--set ggircs.namespace=$(GGIRCS_PROJECT) \
		--values ./helm/cas-ciip-portal/values-$(ENVIRONMENT).yaml \
		cas-ciip-portal ./helm/cas-ciip-portal; \
	fi; \
	helm upgrade --install --atomic --timeout 2400s --namespace $(OC_PROJECT) \
	--set image.schema.tag=$(GIT_SHA1) --set image.app.tag=$(GIT_SHA1) \
	--set ggircs.namespace=$(GGIRCS_PROJECT) \
	--values ./helm/cas-ciip-portal/values-$(ENVIRONMENT).yaml \
	cas-ciip-portal ./helm/cas-ciip-portal;

.PHONY: install_test
install_test: OC_PROJECT=$(OC_TEST_PROJECT)
install_test: install

# Might need to install the bundle containing DB-Pg on a Mac
# perl -MCPAN -e 'install Bundle::DBD::Pg'
.PHONY: install_perl_tools
install_perl_tools:
	@@$(MAKE) -C schema install CPANM="cpanm --notest"

.PHONY: install_asdf_tools
install_asdf_tools:
	@cat .tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add || true
	@asdf plugin-update --all
	@bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
	@#MAKELEVEL=0 is required because of https://www.postgresql.org/message-id/1118.1538056039%40sss.pgh.pa.us
	@MAKELEVEL=0 POSTGRES_EXTRA_CONFIGURE_OPTIONS='--with-libxml' asdf install
	@asdf reshim
	@pip install -r requirements.txt
	@asdf reshim

.PHONY: install_dev_tools
install_dev_tools: $(call make_help,install_dev_tools,install development tools via asdf and Perl)
install_dev_tools: install_asdf_tools install_perl_tools

.PHONY: deploy_test_data
deploy_test_data: $(call make_help,deploy_data,deploys database schemas and data)
deploy_test_data:
	@bash ./.bin/deploy-data.sh --drop-db --dev-data
