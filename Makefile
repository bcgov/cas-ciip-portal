SHELL := /usr/bin/env bash
ifeq ($(MAKECMDGOALS),$(filter $(MAKECMDGOALS),help whoami lint configure build_app build_schema build_tools build install install_test))
include .pipeline/oc.mk
include .pipeline/make.mk
endif

PATHFINDER_PREFIX := wksv3k
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
lint: $(call make_help,lint,Checks the configured yml template definitions against the remote schema using the tools namespace)
lint: OC_PROJECT=$(OC_TOOLS_PROJECT)
lint: whoami
	$(call oc_lint)

.PHONY: configure
configure: $(call make_help,configure,Configures the tools project namespace for a build)
configure: OC_PROJECT=$(OC_TOOLS_PROJECT)
configure: whoami
	$(call oc_configure)


TOOLS_HASH=$(shell md5sum .tool-versions Dockerfile | md5sum | cut -d' ' -f1)
OC_TEMPLATE_VARS += TOOLS_HASH=$(TOOLS_HASH)
.PHONY: build_tools
build_tools: $(call make_help,build_schema,Builds a tools image in the tools openshift namespace)
build_tools: OC_PROJECT=$(OC_TOOLS_PROJECT)
build_tools: whoami
ifeq ($(shell $(OC) -n $(OC_TOOLS_PROJECT) get istag/$(PROJECT_PREFIX)portal-tools:$(TOOLS_HASH) --ignore-not-found -o name),)
	$(call oc_build,$(PROJECT_PREFIX)portal-tools)
else
	@echo "The $(PROJECT_PREFIX)portal-tools:$(TOOLS_HASH) tag already exists. Skipping build_tools."
endif

.PHONY: build_schema
build_schema: $(call make_help,build_schema,Builds the schema source into an image in the tools project namespace)
build_schema: OC_PROJECT=$(OC_TOOLS_PROJECT)
build_schema: whoami
	$(call oc_build,$(PROJECT_PREFIX)portal-schema)


.PHONY: build_app
build_app: $(call make_help,build_app,Builds the app source into an image in the tools project namespace)
build_app: OC_PROJECT=$(OC_TOOLS_PROJECT)
build_app: whoami
	$(call oc_build,$(PROJECT_PREFIX)ciip-portal-app)

.PHONY: build
build: $(call make_help,build,Builds the source into an image in the tools project namespace)
build: build_tools build_schema build_app

PREVIOUS_DEPLOY_SHA1=$(shell $(OC) -n $(OC_PROJECT) get job $(PROJECT_PREFIX)ciip-portal-schema-deploy --ignore-not-found -o go-template='{{index .metadata.labels "cas-pipeline/commit.id"}}')

.PHONY: install
install: whoami
install:
	$(call oc_promote,$(PROJECT_PREFIX)portal-schema)
	$(call oc_promote,$(PROJECT_PREFIX)portal-app)
	$(call oc_wait_for_deploy_ready,$(PROJECT_PREFIX)postgres-master)
	$(if $(PREVIOUS_DEPLOY_SHA1), $(call oc_run_job,$(PROJECT_PREFIX)portal-schema-revert,GIT_SHA1=$(PREVIOUS_DEPLOY_SHA1)))
	$(call oc_run_job,$(PROJECT_PREFIX)portal-schema-deploy)
	$(call oc_deploy)
	$(call oc_wait_for_deploy_ready,$(PROJECT_PREFIX)portal-app)

.PHONY: install_test
install_test: OC_PROJECT=$(OC_TEST_PROJECT)
install_test: install

.PHONY: watch
watch: $(call make_help,watch,configure and start the watchers & dev servers)
watch:
	watchman watch-project .
	watchman -j < .watch-schema-data.json
	watchman -j < .watch-status-schema.json
	watchman -j < .watch-app-yarn.json
	watchman -j < .watch-app-relay.json
	watchman -j < .watch-db.json
	watchman -j < .watch-server.json

.PHONY: unwatch
unwatch: $(call make_help,unwatch,shut down the watchers but leave the dev servers running)
unwatch:
	watchman watch-del-all
	watchman shutdown-server
	if command -v launchctl; then launchctl unload ~/Library/LaunchAgents/com.github.facebook.watchman.plist; fi
	kill -9 $(shell cat log/server.pid) || true # stop the watched app server
	pg_ctl stop || true # stop the watched database server

# TODO: delete this target
# ...but maybe it's helpful for debugging watchman itself on a mac?
.PHONY: watch_log
watch_log:
	tail -f /usr/local/var/run/watchman/$(shell whoami)-state/log

.PHONY: install_perl_tools
install_perl_tools:
	@@$(MAKE) -C schema install CPANM="cpanm --notest"

.PHONY: install_asdf_tools
install_asdf_tools:
	@cat .tool-versions | cut -f 1 -d ' ' | xargs -n 1 asdf plugin-add || true
	@asdf plugin-update --all
	@bash ./.bin/import-nodejs-keyring.sh
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
