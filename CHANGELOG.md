# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.4.0...v1.4.1) (2020-08-06)


### Bug Fixes

* coalesce null energy product values with 0 ([f80148a](https://github.com/bcgov/cas-ciip-portal/commit/f80148af6c732d69de08c422c45d8524b4cf19a9))
* prod hardcoded data should be deployed in *-test environment ([9ab8ee0](https://github.com/bcgov/cas-ciip-portal/commit/9ab8ee0dbb18001b360cba48233278056a019eda))
* remove raised exceptions from incentive function ([adb737b](https://github.com/bcgov/cas-ciip-portal/commit/adb737b55fd20788b318e7fff760b25d0d7d3bcd))

## [1.4.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.3.0...v1.4.0) (2020-08-06)


### Features

* add override column to application_revision table ([2f13ed0](https://github.com/bcgov/cas-ciip-portal/commit/2f13ed03041a4cffd961215a513ec43e0e3c8061))
* add override notification component ([931d08e](https://github.com/bcgov/cas-ciip-portal/commit/931d08e7ba00209a221b6b67c57214f84e4c3f55))
* add override notification to certifier view ([51af3bb](https://github.com/bcgov/cas-ciip-portal/commit/51af3bbbf4c7136cb73dd748b22f9d8d96b5cc6b))
* add override notification to top of reviewer page ([f650253](https://github.com/bcgov/cas-ciip-portal/commit/f650253d1c52fc191a98705d6f795f5c05cab25b))
* create add/remove functionality with mutations for override justification ([13193a0](https://github.com/bcgov/cas-ciip-portal/commit/13193a0d2c7ed853f3d547b96dfced6032a06513))
* UI component to "override and justify" application errors ([42251f5](https://github.com/bcgov/cas-ciip-portal/commit/42251f5540f9d3298200ca956140709cf1307e8d))
* update override ui / messages ([7c79da0](https://github.com/bcgov/cas-ciip-portal/commit/7c79da07125c8c1361ebf31592c171ba30d68f90))


### Bug Fixes

* add a state check if ApplicationDetailsContainer has rendered or not & use that to balance state problem with hasErrors ([da8d74d](https://github.com/bcgov/cas-ciip-portal/commit/da8d74d800f9631d818b6e90ce9da1ff1e8a4d63))
* add computed column to application to display user's edit permission ([91b23a3](https://github.com/bcgov/cas-ciip-portal/commit/91b23a3134048a7023df2a81e5c846ba26d136d9))
* add function that applies select true RLS policies to a user on all ggircs_portal tables ([c3875a0](https://github.com/bcgov/cas-ciip-portal/commit/c3875a03a28b6e57bbeca979a8ea13b2483d4339))
* add missing return in OverrideNotificationCard ([2f583d3](https://github.com/bcgov/cas-ciip-portal/commit/2f583d399d53b565aaf8b7583a1fe8fbee78f189))
* add read_only_user_policies function call to app-users cronjob ([1f23c5e](https://github.com/bcgov/cas-ciip-portal/commit/1f23c5eefd381b1c8a55c4f5d00740a6b76a02b3))
* application_revision_ciip_incentive shouldn't throw with amount=0 ([1b11548](https://github.com/bcgov/cas-ciip-portal/commit/1b1154823c0eba2bec796ceaf25a54b743509919))
* delete override justification if exists & application has no errors ([4ca7f0a](https://github.com/bcgov/cas-ciip-portal/commit/4ca7f0acfbf121eeecf167ed0b7a150baefa2904))
* hide override justification box if hasErrors is false ([644c6de](https://github.com/bcgov/cas-ciip-portal/commit/644c6ded718623e20766769b50281c6b59ec100f))
* implement redirect in ApplicationWizard for users with no edit permission (certifier) ([3251091](https://github.com/bcgov/cas-ciip-portal/commit/3251091b8ff2e72a0275537d3729348f60b75ec6))
* increment chart version ([24188cf](https://github.com/bcgov/cas-ciip-portal/commit/24188cfb8a53c54279102ebe6c832f0d50747f8b))
* no null textarea ([9751878](https://github.com/bcgov/cas-ciip-portal/commit/9751878e306745447f6d63afeb7c0ac7bde9c078))
* production amount and emissions allocated should be allowed to be 0 ([5f1f86b](https://github.com/bcgov/cas-ciip-portal/commit/5f1f86b71b2bd5670ed383cd13621cf0543bae9c))
* remove old placeholder error message from ApplicationWizard & redirect to 404 page from application if no application is present ([bb314d7](https://github.com/bcgov/cas-ciip-portal/commit/bb314d7da328a6175b2e88452ddeb5c0e610dc1e))
* remove signature component from certify page & replace with 'certified' alert if signature is valid ([92b797e](https://github.com/bcgov/cas-ciip-portal/commit/92b797e0e9911ae79f191d1436b935d0dd3036e2))
* set hasErrors useState default to null, use explicit hasErrors===false for condition check ([68943d5](https://github.com/bcgov/cas-ciip-portal/commit/68943d517422a0d111295c6e5b4b223b398a391a))
* update certification messages at bottom of summary page ([cb5a16e](https://github.com/bcgov/cas-ciip-portal/commit/cb5a16ec4d450b59c98ac14d3b059a1aed89bfef))
* update rls to only hide 'internal' comments from industry user role ([f45ae7d](https://github.com/bcgov/cas-ciip-portal/commit/f45ae7d030675b56c610fd355b5abe7ae4bc35d7))

## [1.3.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.2.0...v1.3.0) (2020-07-29)


### Features

* add explanatory text, filter out 'DRAFT' and current status from dropdown, add confirmation modal for status change ([7b6b3ed](https://github.com/bcgov/cas-ciip-portal/commit/7b6b3ed0f2d41d4ea2f969afdc2dc61eb2a04207))
* add new row for status change message to better match design ([b0eadfe](https://github.com/bcgov/cas-ciip-portal/commit/b0eadfe4cb758ff2094863711eeabc6cc13bbb77))
* redirect user to a more friendly page if keycloak auth fails ([e947938](https://github.com/bcgov/cas-ciip-portal/commit/e947938af7631b7ddc65f1f29236ccb15ad2245c))


### Bug Fixes

* Require certifier email before submitting for certification ([0a1d7be](https://github.com/bcgov/cas-ciip-portal/commit/0a1d7bec245243e046aca1ff5fa97b14b05edb61))
* **acme-renewal:** name of cron job and container should be acme-renewal ([9b72fbc](https://github.com/bcgov/cas-ciip-portal/commit/9b72fbcdf7af40f0afcc0787edaa17c66989612e))
* add ggircs_portal schema to portal_read_only user's privileges ([18a4114](https://github.com/bcgov/cas-ciip-portal/commit/18a411461d6c55539a5fbd069b97400f0def2675))
* disable apply button on click ([80d5fb6](https://github.com/bcgov/cas-ciip-portal/commit/80d5fb6b2e3dcf92f6344a520308e4944aa13e93))

## [1.2.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.1.0...v1.2.0) (2020-07-27)


### Features

* add cron job template to renew https certificate ([b2b9efa](https://github.com/bcgov/cas-ciip-portal/commit/b2b9efa2d8fc7551376ae0fb5deba93f3dc05c4c))
* add http request logging with morgan ([71c690e](https://github.com/bcgov/cas-ciip-portal/commit/71c690e322124360f729a696ab38a5536e311d8d))
* add onBlur support to all custom widgets and fields ([4688b32](https://github.com/bcgov/cas-ciip-portal/commit/4688b32b81ce4de5212be5be5ac702d568c50c39))
* application form fields are validated on blur ([aebadc2](https://github.com/bcgov/cas-ciip-portal/commit/aebadc22824171610b854e7844a45d6134e30bc0))
* disable graphile worker signal handling and add SIGTERM listeners ([25f7be1](https://github.com/bcgov/cas-ciip-portal/commit/25f7be163dffb5028d0d2a87ac2f975a7cd9d423))
* improve rendering of summary emission form ([4775c25](https://github.com/bcgov/cas-ciip-portal/commit/4775c25a11f88aff7dad9281a448d3e31605d09d))
* prevent toastify from creating too many toasts ([b19c463](https://github.com/bcgov/cas-ciip-portal/commit/b19c463a9368e0ae1502c1feae5b14b632d45fad))
* read-only form fields should not be marked as required ([a188335](https://github.com/bcgov/cas-ciip-portal/commit/a188335aa57e0afb1a0ad6d3a932434a4e15b27d))
* use recommended postgraphile options in development and production ([0569dbb](https://github.com/bcgov/cas-ciip-portal/commit/0569dbbc671a8d59f83a73eb123a342ab746ff19))


### Bug Fixes

* do not set padding on svg elements and remove list-style on errors ([9f5581b](https://github.com/bcgov/cas-ciip-portal/commit/9f5581b7b342157e1ad50580b207d7312fb39435))
* subheader active link changes depending on the route ([eef241f](https://github.com/bcgov/cas-ciip-portal/commit/eef241fda0908cd629dd72892e3e3b57236288ef))

## [1.1.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.3...v1.1.0) (2020-07-22)


### Features

* fix grammar ([024d8bb](https://github.com/bcgov/cas-ciip-portal/commit/024d8bb36a8433657356911fe541414db8bd7737))
* loading table shows loading animation in its center ([842c9b5](https://github.com/bcgov/cas-ciip-portal/commit/842c9b5c3503c2ea26298cce0813ef2a47cc12c2))
* paginated tables make cells invisible when loading new page ([4530bd2](https://github.com/bcgov/cas-ciip-portal/commit/4530bd2a02e078b39ee3dbc8d0da7d11f41e02cb))
* update form UX to be more clear about how/when data is saved ([c6fe797](https://github.com/bcgov/cas-ciip-portal/commit/c6fe7973eefc5637fea060938c1ee275ce714515))


### Bug Fixes

* Correct legal typos ([71932d9](https://github.com/bcgov/cas-ciip-portal/commit/71932d97ae8ed7726903f0d3def96ea874ccfacf))
* Correct typos and update application disclaimer text ([dba1425](https://github.com/bcgov/cas-ciip-portal/commit/dba14250f812797b170dba197c331e8f214e729c))
* Immediately remove requested org from access dropdown ([4f1ceef](https://github.com/bcgov/cas-ciip-portal/commit/4f1ceef01b9e0220ed25e996cedd201f5c77aa7d))
* request_for_organisation_access doesn't need to query facilities ([287aa8c](https://github.com/bcgov/cas-ciip-portal/commit/287aa8cd676690305b1c63719597a532ccc4a96a))
* Update text on certification redirect page ([e24b3ea](https://github.com/bcgov/cas-ciip-portal/commit/e24b3ea4def777e644c3826b96ff8cdcfa7f83db))

### [1.0.3](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.2...v1.0.3) (2020-07-20)


### Bug Fixes

* Only list orgs in dropdown to which the user hasn't requested or been given access ([c69d165](https://github.com/bcgov/cas-ciip-portal/commit/c69d165101fdf4cb30764ebf92f944b9a906b8db))
* search_products function returns the correct values for add options ([e1748d2](https://github.com/bcgov/cas-ciip-portal/commit/e1748d23857fca68e216b8583e0f11a329a7a6f0))

### [1.0.2](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.1...v1.0.2) (2020-07-16)


### Bug Fixes

* Error on Safari in header ([cf615af](https://github.com/bcgov/cas-ciip-portal/commit/cf615af720aab740163d580ee5eb0a9ca509479b))

### [1.0.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0...v1.0.1) (2020-07-16)


### Bug Fixes

* fix redirection loop when redirected to analyst/pending ([da063e5](https://github.com/bcgov/cas-ciip-portal/commit/da063e5fa8bdd20343feb5bd9937bd9666c9b985))

## [1.0.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.12...v1.0.0) (2020-07-16)


### Features

* Add documentation for reporters ([52b0077](https://github.com/bcgov/cas-ciip-portal/commit/52b0077b52f817d3717ceef01772eacbc4ef9e28))
* add PageRedirectHandler HOC ([9154469](https://github.com/bcgov/cas-ciip-portal/commit/91544693a375991319486ea0360d2242aa82ef23))


### Bug Fixes

* PageRedirectHandler should always checkSessionAndGroups ([ca417dc](https://github.com/bcgov/cas-ciip-portal/commit/ca417dc152d47e4a2bdc00d1fc027ab1e3462986))
* unauthenticated graphql requests should use the ciip_guest role ([555957e](https://github.com/bcgov/cas-ciip-portal/commit/555957e29c38bb5104c9db92a474b2e197f6022b))

## [1.0.0-rc.12](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.11...v1.0.0-rc.12) (2020-07-15)


### Features

* "Exported heat/electricity" --> "Sold heat/electricity" ([1d33735](https://github.com/bcgov/cas-ciip-portal/commit/1d33735eb9c6b93b8667aaeb30db23c9b26638e3))
* add conditional PVC and update values files ([a9bac46](https://github.com/bcgov/cas-ciip-portal/commit/a9bac46e70a2657b26b5b4171e6838566c33f91a))
* Favicons and <title> for appearance in tabs + search ([f18804c](https://github.com/bcgov/cas-ciip-portal/commit/f18804c4f3fe127d837c5c3b5a9adb38a2b32a62))
* only deploy cron if restoreFromProd.enable is true ([94c000d](https://github.com/bcgov/cas-ciip-portal/commit/94c000d56bb9a9e7c2722f2f418a9fc6a3a61c53))
* remove recovery_target from command (appears to be default set somewhere) ([07c0ff9](https://github.com/bcgov/cas-ciip-portal/commit/07c0ff91f2458fc7bbe8db504524d09fc4db0e1c))
* restore prod data all the way to the last backup ([dae917b](https://github.com/bcgov/cas-ciip-portal/commit/dae917bf7d9bcd099fa049c9a79755ad378f6292))
* Sitewide notice banner for dev and test (configurable for prod as well) ([0652514](https://github.com/bcgov/cas-ciip-portal/commit/065251407a5178a1b118081bdf92c9cc9af0dfee))


### Bug Fixes

* ApplyButtonContainer should handle null openedReportingYear ([82a51bb](https://github.com/bcgov/cas-ciip-portal/commit/82a51bbd9bc28ed53b3b8992899a9430809c2868))
* default-layout should redirect to landing route before registration ([c31f3c4](https://github.com/bcgov/cas-ciip-portal/commit/c31f3c416b20ffec5995aca38c752894729d7496))
* Ensure landing page login button submits ([afadb57](https://github.com/bcgov/cas-ciip-portal/commit/afadb57224497bad9fb1c2299bdaa08469ad394a))
* pending analysts should not be allowed on user/profile page ([dc9ab4a](https://github.com/bcgov/cas-ciip-portal/commit/dc9ab4a5b64003bcefb0c11419cc8d897ce75ab1))
* Responsive layout for site header ([c7b3f46](https://github.com/bcgov/cas-ciip-portal/commit/c7b3f463779b4fade969b97731d8d49e9186fb0c))

## [1.0.0-rc.11](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.10...v1.0.0-rc.11) (2020-07-13)


### Features

* 404 page ([e170f65](https://github.com/bcgov/cas-ciip-portal/commit/e170f6504fdb7ecd34730706706925b19f24dffa))
* add comments field to every form, rendered by ProblemReportField ([8658189](https://github.com/bcgov/cas-ciip-portal/commit/865818999aadd776a584ba8c92fe82f83fb5ab01))
* add report_id column to application table ([e351d83](https://github.com/bcgov/cas-ciip-portal/commit/e351d83ce49addf52ce1a341348232a302834705))
* creating an application adds the report id the application table ([00077d9](https://github.com/bcgov/cas-ciip-portal/commit/00077d975ba050a7c3d6edab8bd83f7286c751c8))
* enable analytics in prod namespace ([d7b0e78](https://github.com/bcgov/cas-ciip-portal/commit/d7b0e788891ee86d1e98663fb238b2fcd5cdaa70))
* error-boundary doesn't render the stack trace in prod builds ([cfd3e9a](https://github.com/bcgov/cas-ciip-portal/commit/cfd3e9a1f54d73dd93b89f43496bf63cc4e15020))
* move test data to dev ([f5a5b25](https://github.com/bcgov/cas-ciip-portal/commit/f5a5b258fdfb4fb94ef2f4bd2863b597d06bdead))
* relay errors are thrown and rendered by error-boundary ([94a6ca4](https://github.com/bcgov/cas-ciip-portal/commit/94a6ca47969fcf3c724273d6bb1b397a4163b2f6))
* test deployment uses prod keycloak namespace ([92fc271](https://github.com/bcgov/cas-ciip-portal/commit/92fc27117c61fa3c280e14158c450d283d5de5bc))
* triggered airflow dag name is defined in values.yaml ([1bf64e6](https://github.com/bcgov/cas-ciip-portal/commit/1bf64e62d9f3c9d3babb8ae59c6e516263e39f64))
* update graphql schema ([5fa0bcf](https://github.com/bcgov/cas-ciip-portal/commit/5fa0bcf9f76de5daad669267dd853c7aba4aba86))
* update ProblemReportField text and cancel button behavior ([3cb1b1f](https://github.com/bcgov/cas-ciip-portal/commit/3cb1b1f71ed9162013d88a9b4a6cd076a7c8fe3e))


### Bug Fixes

* only load graphiql when in local environment ([0c9fd24](https://github.com/bcgov/cas-ciip-portal/commit/0c9fd2459d9f43adda13ac8e1dbe95176358daad))
* use NODE_ENV to decide whether to run graphiql ([0a027e0](https://github.com/bcgov/cas-ciip-portal/commit/0a027e0018b02b36688fb3f2b56227aea863ac33))

## [1.0.0-rc.10](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.9...v1.0.0-rc.10) (2020-07-07)


### Features

* Register button leads directly to SSO registration ([cdb53cc](https://github.com/bcgov/cas-ciip-portal/commit/cdb53cc3355e96fb52eec941d105acfe2174e861))
* Update snowplow collector to prod origin ([94f20dd](https://github.com/bcgov/cas-ciip-portal/commit/94f20ddb3107f0b0068ab2b3fb62605e505e89b7))


### Bug Fixes

* hide jsonschema titles with css ([c83342f](https://github.com/bcgov/cas-ciip-portal/commit/c83342f71ab3f01efc775632458d9e309e791b2d))

## [1.0.0-rc.9](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.8...v1.0.0-rc.9) (2020-07-06)


### Features

* 'Industry'/'Admin' header link --> 'Dashboard' ([3bf2a8b](https://github.com/bcgov/cas-ciip-portal/commit/3bf2a8b74f4ee7b45d7bc91728b7a3362d39a98f))
* add a success toast on signed cert request & redirect to requests list ([1138aa0](https://github.com/bcgov/cas-ciip-portal/commit/1138aa001ca2c6d98777e1e9365f416a9c9b2c18))
* add cypress axe tests for certifier & guest ([1d90b96](https://github.com/bcgov/cas-ciip-portal/commit/1d90b96cff2e2fb4ba00b588b221fb7ba50700ad))
* Add pages from DevHub for footer links ([dd8bfef](https://github.com/bcgov/cas-ciip-portal/commit/dd8bfeff47abf1dc9da103c4c7e52ea21a02b3d6))
* create accessibility cypress tests for reporter, analyst, admin ([a81b9be](https://github.com/bcgov/cas-ciip-portal/commit/a81b9bea12ca85c072af4c822484420fa73d6d0c))
* Ensure test analytics module only present in test env ([6ab9b25](https://github.com/bcgov/cas-ciip-portal/commit/6ab9b2511c0e48a624dab2993e9bb8912cd0d744))
* initial install deploys with insecure route first to issue cert ([5a65085](https://github.com/bcgov/cas-ciip-portal/commit/5a6508508574d21adcfe07ed7d45f34e1ed7b935))
* Install test analytics module ([1a1dd2e](https://github.com/bcgov/cas-ciip-portal/commit/1a1dd2eebd1c53883220a33193a965de8f92dfae))
* Set robots directives in header for non-prod environments ([7482c96](https://github.com/bcgov/cas-ciip-portal/commit/7482c965bb3451d7da4910514f8d350d75546321))
* Updated factsheet for 2020 on landing page ([ff72c03](https://github.com/bcgov/cas-ciip-portal/commit/ff72c0320b825a886050a92ea93a6c222c2b2aa5))
* updated keycloak realm exports ([ec5c0ec](https://github.com/bcgov/cas-ciip-portal/commit/ec5c0eccf690bcfe3fe7ad02b7417ecde4d00f74))
* use happo instead of Percy for e2e snapshots ([a244a00](https://github.com/bcgov/cas-ciip-portal/commit/a244a004e14ac8c51bd54a5bc04bef94f89b8882))


### Bug Fixes

* add swrs_facility_id value to unnamed facilities in dropdown ([270ee51](https://github.com/bcgov/cas-ciip-portal/commit/270ee5144cfffbdaf8ac3f9d68b1818e3111c0db))
* add uindex to application (fixes multiple 'apply' button clicks bug) ([c6ecdee](https://github.com/bcgov/cas-ciip-portal/commit/c6ecdee3a3c30da69cf566378a5727f8464fd79e))
* await searchField state change before setting searchValue state ([b38adc1](https://github.com/bcgov/cas-ciip-portal/commit/b38adc135e243f18ec05df1832f5478dba25e4ed))
* Capitalize SWRS acronym ([5ced885](https://github.com/bcgov/cas-ciip-portal/commit/5ced8850999e54ef62ad69ddb7de366b252134f4))
* Certifier clipboard URL should have protocol ([1449a0e](https://github.com/bcgov/cas-ciip-portal/commit/1449a0e90b225a657597436e4f0c4f00931e756b))
* Ensure certification redirect page diverts through login ([87ff2ec](https://github.com/bcgov/cas-ciip-portal/commit/87ff2ecbb4656dc9515a3b72504a95f9b13b036a))
* Ensure login redirects processed before non-permissible redirects ([79f6268](https://github.com/bcgov/cas-ciip-portal/commit/79f6268d3fa46b66cddf1e24796ed05a086a1a40))
* Ensure redirect URL encoded to preserve all query params ([6998fb6](https://github.com/bcgov/cas-ciip-portal/commit/6998fb6372d673074c6f95249fdd4098c4d4df6f))
* handle null facility names in search dropdown ([f87c79d](https://github.com/bcgov/cas-ciip-portal/commit/f87c79ddfa51456cc2b6a8a18c19d023aa7afac3))
* helm status should be run on the correct namespace ([5abf5ac](https://github.com/bcgov/cas-ciip-portal/commit/5abf5ac075561d2653244e4d81818b0188c51bca))
* parse zeroes as data rather than falsey when populating diff table ([336e955](https://github.com/bcgov/cas-ciip-portal/commit/336e955161413953bd61c6eb69ae24eaccf48479))
* set searchField & searchValue state at the same time ([fc858e4](https://github.com/bcgov/cas-ciip-portal/commit/fc858e41e6a00125a9405cb932e2a5ec20eb6767))
* static assets should not use relative url ([9b3c683](https://github.com/bcgov/cas-ciip-portal/commit/9b3c6836b913a8bfd533319215090a19cea0a9ea))
* update CO2 gas types to match SWRS data and update gas descriptions ([6e5c241](https://github.com/bcgov/cas-ciip-portal/commit/6e5c241d0f45fe194ae354e97b7ca4eef6df34b8))
* update logic with nullish coalescing ([71de797](https://github.com/bcgov/cas-ciip-portal/commit/71de797b82fe610490d924e88aec1093fa45b1cc))
* update typescript definitions for handleEvent ([4214670](https://github.com/bcgov/cas-ciip-portal/commit/4214670381e47f537d51c1c0c9b2e8f856960adf))
* User Profile header link should be nextjs Link ([e5a4cec](https://github.com/bcgov/cas-ciip-portal/commit/e5a4cec53ef7d45020aed78ed5fad9bdbb77391d))

## [1.0.0-rc.8](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.7...v1.0.0-rc.8) (2020-06-26)


### Features

* 'CIIP' should appear early in all email subject lines ([ef12328](https://github.com/bcgov/cas-ciip-portal/commit/ef12328c0e0dd875defecb1055f1af35ced165e7))
* 'Draft application started' email ([19b4bc5](https://github.com/bcgov/cas-ciip-portal/commit/19b4bc54f5b2ae79da6e2eb20f3fcd924aea0864))
* Add 'union' merge strategy for sqitch.plan ([e1cf92a](https://github.com/bcgov/cas-ciip-portal/commit/e1cf92a49a13ba6669a51ffa3f2cb75813d2079b))
* add duplicate data warning ([7d3e3ad](https://github.com/bcgov/cas-ciip-portal/commit/7d3e3ad3269a8ec40fc6a32d9108bafab5ba107e))
* add mailhog helm chart ([2ce1cef](https://github.com/bcgov/cas-ciip-portal/commit/2ce1cef7fa98a1a69a9dacffa0497ab407c59fbf))
* add migration changes to graphile_worker_job_definer() ([fbcfbef](https://github.com/bcgov/cas-ciip-portal/commit/fbcfbef5f12459734b5ec188df9aad9380d30e46))
* add missin report modal that allows continue or cancel with consequences in text ([ba0d142](https://github.com/bcgov/cas-ciip-portal/commit/ba0d14297c12f9773d7049ca33ceeede8a536205))
* add page / component for analyst to add an operator ([363fd27](https://github.com/bcgov/cas-ciip-portal/commit/363fd279ec6c60e9383c6240e6ff312a970c47be))
* add proper user/fsgroup for test instance ([741fd9f](https://github.com/bcgov/cas-ciip-portal/commit/741fd9fb99135a1313b55ccce6fc1e8924161aac))
* add rls to private graphile_worker_timestamp table ([fdbe15c](https://github.com/bcgov/cas-ciip-portal/commit/fdbe15c0059a43fdd4003811ae797511c26b283e))
* add route template for mailhog ([aef6a5e](https://github.com/bcgov/cas-ciip-portal/commit/aef6a5ef80c6a22903759ca15122d13c0eb3fff8))
* add swrs_report_id column to org/facility display ([89f0c31](https://github.com/bcgov/cas-ciip-portal/commit/89f0c31f7b7648266b802352084a12475c646db1))
* add table for timestamped tracking of calls to graphile_worker.addjob() ([bf1c224](https://github.com/bcgov/cas-ciip-portal/commit/bf1c22459581c50fa884e0ede222bd78f625367e))
* allow analyst to create new facilities ([1095c51](https://github.com/bcgov/cas-ciip-portal/commit/1095c517c0e5c0ef8a9dd456bd56071361eea122))
* define resource limits, fix smtp string ([1063ab7](https://github.com/bcgov/cas-ciip-portal/commit/1063ab73a9f30a2f89a9cf0fa6cf4ede5599bbc8))
* Email notifying admin of submitted applications ([35bc0b3](https://github.com/bcgov/cas-ciip-portal/commit/35bc0b373c449f175d44f9d29b8dec4bf695dcb0))
* Email to notify admin of org access requests ([ab2c649](https://github.com/bcgov/cas-ciip-portal/commit/ab2c649f12641b3280eb8b0f30923221cebcd77e))
* Finalize application status change email ([62fba12](https://github.com/bcgov/cas-ciip-portal/commit/62fba127a1357fc72fabb84e15379b614b7e1dc2))
* Finalize certification notification email ([a95e838](https://github.com/bcgov/cas-ciip-portal/commit/a95e8383ae11e120a579fa7e6bd8a03f2ef28ea4))
* Finalize certification request email ([fd36579](https://github.com/bcgov/cas-ciip-portal/commit/fd365798883ae52386032dd18a25d79251f5af00))
* Finalize recertification request email ([6c2739c](https://github.com/bcgov/cas-ciip-portal/commit/6c2739c1b839df6f95cbcdfcfedb7761b7f4cd2d))
* Finalize welcome email message ([5ca8374](https://github.com/bcgov/cas-ciip-portal/commit/5ca83742da126f1b64938d500257d0eac9a7e59a))
* finish splitting add org/facilities modal & remove old add facility code from FacilitiesListContainer ([998e09b](https://github.com/bcgov/cas-ciip-portal/commit/998e09baca0342b30fa10a6074a7418ae8ae53c2))
* host/route updates from PR review ([ed089f1](https://github.com/bcgov/cas-ciip-portal/commit/ed089f1d9aa09a647307289dc5e3124ad69cb2e5))
* More actionable links for emails ([a6ca3ce](https://github.com/bcgov/cas-ciip-portal/commit/a6ca3ceb7167308c9843f994a94544e51a1f5487))
* nuke the siteminder session cookie on logout ([59773d7](https://github.com/bcgov/cas-ciip-portal/commit/59773d777f034a5298dcc880efa2b0da438f945f))
* Organisation access approved email ([36b2a2c](https://github.com/bcgov/cas-ciip-portal/commit/36b2a2c401d2a64925e97d0decb223a5facd4a96))
* Organisation access requested email ([48692e2](https://github.com/bcgov/cas-ciip-portal/commit/48692e2ab56761d2838096710fc01168daae3ae7))
* remove appHost from values files ([2e12bf1](https://github.com/bcgov/cas-ciip-portal/commit/2e12bf169001c6ac606b2614307a01eb1f201076))
* remove local mailhog chart & try using chart directly from helm hub ([738a5f5](https://github.com/bcgov/cas-ciip-portal/commit/738a5f5b59ce3be77b0059cce5009c5ca61121f4))
* Reply contact address specified in body of all emails ([f31e365](https://github.com/bcgov/cas-ciip-portal/commit/f31e365a17ea7d86a9a002848ce1fb42258a0aa6))
* rewrite has_swrs_report function to check current reporting year instead of taking it as a param ([3022cd4](https://github.com/bcgov/cas-ciip-portal/commit/3022cd4f40cab53415733b972578dfc63e152116))
* Send separate emails for approved, rejected, changes requested ([5a4bc6f](https://github.com/bcgov/cas-ciip-portal/commit/5a4bc6ff93ffff248b8354006995591cdc130993))
* update developer-guide with sqitch / incremental db changes documentation ([9bc4f6e](https://github.com/bcgov/cas-ciip-portal/commit/9bc4f6e082409b7f76a95d5bad43f407a0fcaa9a))
* update function logic ([1b264ea](https://github.com/bcgov/cas-ciip-portal/commit/1b264ea6bdad8b916e0a6fe51009cd8d86d03680))
* update mailhog host/port values ([64b5c6f](https://github.com/bcgov/cas-ciip-portal/commit/64b5c6fcf3040494dd72226f9fb1d8f0e4e13d9f))
* update reporter organisations page with a contact cas option if they can't find their operator ([3b6e10b](https://github.com/bcgov/cas-ciip-portal/commit/3b6e10bc9a42027a8e9070cf2a8fe5840806c51b))
* update schema ([094df43](https://github.com/bcgov/cas-ciip-portal/commit/094df43de7faf11456ca0d80eb0c1b328ab99bef))
* update smtp route ([f259928](https://github.com/bcgov/cas-ciip-portal/commit/f2599287f50acdae66554df475aab4b67b843b97))
* use https in all environments ([dccc1f7](https://github.com/bcgov/cas-ciip-portal/commit/dccc1f7a7facfb08a6a5f92bb469715ac971250c))
* use secure cookie session backed by connect-pg-simple ([fa1de35](https://github.com/bcgov/cas-ciip-portal/commit/fa1de3545b7196e7079181cb789a0f12983b88b7))
* use sqitch rework to add sqitch plan change to graphile_worker_job_definer() ([249c285](https://github.com/bcgov/cas-ciip-portal/commit/249c2852c75a572aa78160d716e9342115200d44))
* yarn start uses --unhandled-rejections=strict option ([3659db8](https://github.com/bcgov/cas-ciip-portal/commit/3659db84501d837a8728fddd1fbed4db92b0130f))


### Bug Fixes

* add drop index to revert files ([2049677](https://github.com/bcgov/cas-ciip-portal/commit/2049677a82d92854f0419ca4a86933cb2cb41342))
* add missing uindex to facility table ([816142f](https://github.com/bcgov/cas-ciip-portal/commit/816142f0cdf6304de1f9b8acee2974bd8ec41769))
* add unique index to organisation table ([88820b6](https://github.com/bcgov/cas-ciip-portal/commit/88820b600d46e37d4437156b17396dd41f9b3d5f))
* adds guard if clauses to protect against null data ([9332e8f](https://github.com/bcgov/cas-ciip-portal/commit/9332e8ff85b70de64a6f31a43a91e4f6237891ac))
* canonical list of reserved words ([3756e6f](https://github.com/bcgov/cas-ciip-portal/commit/3756e6febb2b96cefcc9769b6b4266b4502aaee4))
* change dropdb call to psql -c... call ([7e00215](https://github.com/bcgov/cas-ciip-portal/commit/7e002154e8759798d52029f9ed14cfab70fce4da))
* change target port to string ([58cd79b](https://github.com/bcgov/cas-ciip-portal/commit/58cd79b7a80c8d116f50b67fc8b57cad2366304c))
* ciip user needs to be dropped on dev ([3f2ff43](https://github.com/bcgov/cas-ciip-portal/commit/3f2ff43458b6cfbfc61a04855019a9b61359cf6a))
* Clean up landing page, icons, image swap for GCPE ([53fb4a5](https://github.com/bcgov/cas-ciip-portal/commit/53fb4a5f6e8fc8ddf8e74a4224f00e67ce30370a))
* Correct some typos on Add facility page ([7ac892e](https://github.com/bcgov/cas-ciip-portal/commit/7ac892e268dd01b9e9abd9f70d5a9b9fd20cfff5))
* Correct wording of draftApplicationStarted email ([a9547d2](https://github.com/bcgov/cas-ciip-portal/commit/a9547d2cd001c35e979e04c230155068651b088f))
* Email env vars should be in long format ([46a3855](https://github.com/bcgov/cas-ciip-portal/commit/46a3855dce1cf3108336064596bd3adb5af0262e))
* fix borked rebase ([0145ff7](https://github.com/bcgov/cas-ciip-portal/commit/0145ff7fb469a8a71874a2b2fa3249e42adce5e0))
* fix borked rebase ([376c8fe](https://github.com/bcgov/cas-ciip-portal/commit/376c8fe35c9af6af5c45d24255724fce4625baa4))
* Fix broken certifierUrl missing protocol in href ([750db9f](https://github.com/bcgov/cas-ciip-portal/commit/750db9f5dd5991847009e4a76fad8596077b8909))
* in dev, preInitDb should kill active connections to the db ([3f44890](https://github.com/bcgov/cas-ciip-portal/commit/3f44890faa0bf6d959123cd6179c66403d7fde5a))
* include private schema in table test search path ([046e05e](https://github.com/bcgov/cas-ciip-portal/commit/046e05ee02b54b50f4b031b592e5e1dc7f0954aa))
* misnamed import ([52a1de1](https://github.com/bcgov/cas-ciip-portal/commit/52a1de19aa5ff614cd2eee1413aa3923ebaca496))
* multiline string values should be using the `indent` function ([3cea5b5](https://github.com/bcgov/cas-ciip-portal/commit/3cea5b58e3dfaefcfc201b1fdbb9e09252a33e0f))
* remove extra slash from mailhog.host ([0427785](https://github.com/bcgov/cas-ciip-portal/commit/0427785cf98dd0aca8e9bfc446387c52d77e0351))
* remove helper function from schema ([c29eeee](https://github.com/bcgov/cas-ciip-portal/commit/c29eeee76dc35f4b71e55b03d1b5250824d12ac0))
* require org-request approved for applications ([2cdffec](https://github.com/bcgov/cas-ciip-portal/commit/2cdffec1a09f8df5a49f2fe2bc866610809dfb14))
* rework org/facility import function with new on conflict keys ([d247720](https://github.com/bcgov/cas-ciip-portal/commit/d24772066435162165a6463d2b334d197535c5e3))
* session was a reserved word in SQL-92; worth avoiding ([bd512e6](https://github.com/bcgov/cas-ciip-portal/commit/bd512e644ed66ff6b73ef0798252cb618e257da7))
* sqitch-check-immutable-files was silently failing ([32cd893](https://github.com/bcgov/cas-ciip-portal/commit/32cd893bf02d10995c2ad0743d7d4a03c9e0c483))
* syntax error ([cacc23c](https://github.com/bcgov/cas-ciip-portal/commit/cacc23ce3ff015d88e000b793932b7d8a0ce35ac))
* update facility_policies to check org request is approved ([6e325a3](https://github.com/bcgov/cas-ciip-portal/commit/6e325a30912b897b39c068c3d24beb5ec4a3f1fc))
* use fully qualified name for drop index statements ([827f34d](https://github.com/bcgov/cas-ciip-portal/commit/827f34d244cf48919f91880876554a78fd81f206))
* when dropping the ciip db, all roles should be dropped ([29df7bd](https://github.com/bcgov/cas-ciip-portal/commit/29df7bd21fa78f7df8b6fefc0453634af1c86a6c))
* **sqitch-ci:** ignore changes created by sqitch rework ([8e125e3](https://github.com/bcgov/cas-ciip-portal/commit/8e125e3fde056e68c67b32b9a76536676411c835))
* **sqitch-ci:** uniq should be applied on sorted text ([18e7347](https://github.com/bcgov/cas-ciip-portal/commit/18e73475eb149d77d7438712f8c3f434a5c4fc7c))

## [1.0.0-rc.7](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.6...v1.0.0-rc.7) (2020-06-18)


### Features

* helm hook for first cert provision ([2ddee1b](https://github.com/bcgov/cas-ciip-portal/commit/2ddee1b51c5a3adf0d8c97414cc33b32c519f15c))


### Bug Fixes

* liveness needs to be checked using https ([ea9749c](https://github.com/bcgov/cas-ciip-portal/commit/ea9749c4862afc7d20620d37d886013d792271ba))

## [1.0.0-rc.6](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.5...v1.0.0-rc.6) (2020-06-17)


### Bug Fixes

* acme requires .well-known to be accessible ([286c237](https://github.com/bcgov/cas-ciip-portal/commit/286c23799337667d9cc370005cbe1471487378e1))
* init db should be run as the superuser ([1057133](https://github.com/bcgov/cas-ciip-portal/commit/105713349f9bdf579f874b14b54f60be686e509b)), closes [/github.com/zalando/spilo/issues/188#issuecomment-440279726](https://github.com/bcgov//github.com/zalando/spilo/issues/188/issues/issuecomment-440279726)

## [1.0.0-rc.5](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.4...v1.0.0-rc.5) (2020-06-17)


### Features

* use acme.sh to provision ssl certificates ([52235b3](https://github.com/bcgov/cas-ciip-portal/commit/52235b3b8fd8bf01eab899b94bbbde62adf831b0))


### Bug Fixes

* add missing key in cron-init-db template ([37963fb](https://github.com/bcgov/cas-ciip-portal/commit/37963fbc7ba872fd264024430cbce13094a5d2a1))
* cron charts should be pre-install/upgrade hooks ([f178f9e](https://github.com/bcgov/cas-ciip-portal/commit/f178f9e3af784a4363d0c48a5839aa8fc468b19b))
* deploy-data script always deploys the latest sqitch changes ([115ce1c](https://github.com/bcgov/cas-ciip-portal/commit/115ce1cf2b5c3b33234eae2119b34e371c285278))
* Fix block layout of site header on Safari ([2740b62](https://github.com/bcgov/cas-ciip-portal/commit/2740b6246ee867491db3b8b7eab968740d3f6ed0))
* grant access to swrs schema to ciip user roles on every deploy ([f12ab4e](https://github.com/bcgov/cas-ciip-portal/commit/f12ab4e2a5d55fa3c817519ca67188dc11a175ea))
* ignore non-equivalent eslint rules ([66d81b2](https://github.com/bcgov/cas-ciip-portal/commit/66d81b26c33526a95d1c772a2d26d109398905a7))
* increase acme challenge PVC size to be above 20Mi min ([eb74d22](https://github.com/bcgov/cas-ciip-portal/commit/eb74d22e6b9ad74222f00b7e52d8cae68a00b596))

## [1.0.0-rc.4](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.2...v1.0.0-rc.4) (2020-06-15)


### Features

* add a computed column to retrieve linked products ([04e5837](https://github.com/bcgov/cas-ciip-portal/commit/04e58371331b6deccb9fc6b387e2ee98bf084373))
* add dummy data for product_link table ([e725d90](https://github.com/bcgov/cas-ciip-portal/commit/e725d90a0885fa876ab06338ad86eb742e69f47f))
* add is_deleted column to product_link table, order computed column results by product_link table id ([e995bdb](https://github.com/bcgov/cas-ciip-portal/commit/e995bdb89996d20664e0973f9818eb212d42d9fd))
* add new column for linking products ([d5910d8](https://github.com/bcgov/cas-ciip-portal/commit/d5910d8b706bf7cb2db909c27925c247f4736f69))
* add placeholder modal for linking products ([1fcd156](https://github.com/bcgov/cas-ciip-portal/commit/1fcd1560bb7fcbfbae154fe5167a8df290897363))
* add policies file for product_link table ([f22487e](https://github.com/bcgov/cas-ciip-portal/commit/f22487e34b1c046a2d55a150b054e2bcef9100dc))
* add product_link table ([0134f42](https://github.com/bcgov/cas-ciip-portal/commit/0134f423cdfd3a23ff5558a3574ccd66dd3d2870))
* add remove product link mutation ([fc69a9e](https://github.com/bcgov/cas-ciip-portal/commit/fc69a9e860097f1a12f7bba3f71271fb81a56c94))
* can create links between products ([ef6d452](https://github.com/bcgov/cas-ciip-portal/commit/ef6d452973d380c76358c3ecb34b90af70615f84))
* clean-up ui functions, close modal on save ([18476aa](https://github.com/bcgov/cas-ciip-portal/commit/18476aa845e4c20711c646d4f73cd8fef38807d3))
* dev and test routes are subdomains of ciip.gov.bc.ca ([5a7cb50](https://github.com/bcgov/cas-ciip-portal/commit/5a7cb50a8fde2d9cc7c2b5e21bb686365858e90a))
* filter energy products out of link choices ([ea46cc5](https://github.com/bcgov/cas-ciip-portal/commit/ea46cc504d6627deeb641ccd5d61795fb193f054))
* prod deployment temporarily creates an insecure route ([d0bff35](https://github.com/bcgov/cas-ciip-portal/commit/d0bff3538c13178c771f94948249a5363ed9566e))
* prod route is https://ciip.gov.bc.ca ([b1ceba6](https://github.com/bcgov/cas-ciip-portal/commit/b1ceba641a3fa3abae4fff534d026d4a905ff137))
* remove link by rowId wip ([a381e7d](https://github.com/bcgov/cas-ciip-portal/commit/a381e7d91c7a298a8463f6b73cecff251f1e35fa))
* render modalButtons ([e99433b](https://github.com/bcgov/cas-ciip-portal/commit/e99433b7fd343cf01476d09b4c9de9abe765395c))
* show warning in production tab if linked products are missing ([b2b0671](https://github.com/bcgov/cas-ciip-portal/commit/b2b0671871e9820ccf09f0db9ca1d9b4782bfae3))
* style the product link modal ([ff06627](https://github.com/bcgov/cas-ciip-portal/commit/ff06627915922c7321f4cb50166ec1515fb42daf))
* update schema ([2969ace](https://github.com/bcgov/cas-ciip-portal/commit/2969acec46069269784531f9a8e4a16c8331e2b4))
* update schema after rebase ([324bb0a](https://github.com/bcgov/cas-ciip-portal/commit/324bb0a6a8e6bfda1c39345e6cced7ed303ac429))
* use passthrough termination for router ([b2ec81a](https://github.com/bcgov/cas-ciip-portal/commit/b2ec81a5189e2f6caf9c18c52408155b8b8de222))


### Bug Fixes

* airflow dag trigger should not be a hook during install ([30d7aa3](https://github.com/bcgov/cas-ciip-portal/commit/30d7aa3aacdd260e36886983c0349e9c4798b1fe))
* airflow-dag-trigger job should be a hook to allow upgrade ([ecde3fc](https://github.com/bcgov/cas-ciip-portal/commit/ecde3fce07aa82b8b7282cd363a798523fc56a3d))
* Fix landing page copy and logo for GCPE ([bd68181](https://github.com/bcgov/cas-ciip-portal/commit/bd68181d9f883b16708679aa45ce58e088de3730))
* fix some typos ([88efc6a](https://github.com/bcgov/cas-ciip-portal/commit/88efc6abf88797fedc13881fc84d11c58d7910e7))
* helm values namespace was -dev instead of -test ([280ae79](https://github.com/bcgov/cas-ciip-portal/commit/280ae79df88b8209763af6efb0b92079240fe345))
* routes must conform to DNS 952 form ([354dc1f](https://github.com/bcgov/cas-ciip-portal/commit/354dc1f5eb5a2cecb732df98fb8df316f3aee014))
* trigger-airflow-dag.sh handles failed state ([913617c](https://github.com/bcgov/cas-ciip-portal/commit/913617cb7176fd4acffdd7a97e68a2ffa8b78268))

## [1.0.0-rc.3](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2020-06-12)


### Bug Fixes

* airflow-dag-trigger job should be a hook to allow upgrade ([ecde3fc](https://github.com/bcgov/cas-ciip-portal/commit/ecde3fce07aa82b8b7282cd363a798523fc56a3d))
* helm values namespace was -dev instead of -test ([280ae79](https://github.com/bcgov/cas-ciip-portal/commit/280ae79df88b8209763af6efb0b92079240fe345))

## [1.0.0-rc.2](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2020-06-12)


### ⚠ BREAKING CHANGES

* portal schema does not support s2i builds

### Features

* "Select All" --> controlled input ([9b22557](https://github.com/bcgov/cas-ciip-portal/commit/9b22557c6224079831a0724ddb39e47c66a5d13d))
* /admin/user-list --> /admin/users ([39cf005](https://github.com/bcgov/cas-ciip-portal/commit/39cf005efd6b92cb8ed0c817f8ee1e95f9d6123a))
* /reporter/ciip-application --> /reporter/application ([18319e1](https://github.com/bcgov/cas-ciip-portal/commit/18319e1ad989daaaf0df8acf2f899b9d1a831f73))
* /reporter/ciip-application-legal-disclaimer --> /reporter/new-application-disclaimer ([ea51257](https://github.com/bcgov/cas-ciip-portal/commit/ea5125700b52178bfd517cd99abf4656a48df120))
* /reporter/ciip-application-swrs-import --> /reporter/application-swrs-import ([1749d7c](https://github.com/bcgov/cas-ciip-portal/commit/1749d7c6bf9d6f81aceca5dbc57561515942d4d0))
* /reporter/facilities-list --> /reporter/facilities ([2c1e78e](https://github.com/bcgov/cas-ciip-portal/commit/2c1e78ed6aeb1482fe4748cbd746a016727207ed))
* /reporter/user-dashboard --> /reporter ([e2690cd](https://github.com/bcgov/cas-ciip-portal/commit/e2690cd60bb54f8c5506cc4ea7a35ed2321aed38))
* /user-profile --> /user/profile ([8ff1640](https://github.com/bcgov/cas-ciip-portal/commit/8ff16400b7ca2fbf565d917438261f1fe5424bbc))
* add comment to energy_product.sql prod deploy file ([69de869](https://github.com/bcgov/cas-ciip-portal/commit/69de869cd1fa95500696dec362bda2f9a648f02f))
* add hydrofluorocarbons to industrial process emissions ([ba9f973](https://github.com/bcgov/cas-ciip-portal/commit/ba9f97328cc3c7ea0c6acef8b5a46c617d6dc0b5))
* add jq to schema image ([0bb6254](https://github.com/bcgov/cas-ciip-portal/commit/0bb62540702a96e32fec63f40884a2e9043b722c))
* Add localhost shortcut to login as certifier ([a29d2b5](https://github.com/bcgov/cas-ciip-portal/commit/a29d2b50b1ac4644a53b50b5014d8e165d757dff))
* airflow-dag-trigger job waits for the dag to complete ([14f18c4](https://github.com/bcgov/cas-ciip-portal/commit/14f18c4f4c205c98046bd9eff9038e4f0c1b6742))
* airflow-dag-trigger shouldn't be a hook ([28c2908](https://github.com/bcgov/cas-ciip-portal/commit/28c29083af35da2c2f05987ed00c9ce1d0f0b3b0))
* build app docker image ([a9a5d54](https://github.com/bcgov/cas-ciip-portal/commit/a9a5d5428d8b923412d9c80f6e3a4749072a028a))
* build app docker image on circle ([999ec52](https://github.com/bcgov/cas-ciip-portal/commit/999ec524dea31954deb07bec1c8845509a14de7b))
* build schema docker image on CircleCI and push to gcp-gcr ([56af560](https://github.com/bcgov/cas-ciip-portal/commit/56af5603cfeb086b84791181280d13d266c70566))
* deploy ciip portal with helm chart ([75f8bad](https://github.com/bcgov/cas-ciip-portal/commit/75f8badebe333632b86c642f303feb6cf1eb84dc))
* enable wal-g in ciip patroni db ([899684b](https://github.com/bcgov/cas-ciip-portal/commit/899684bafd49535a68b514fb4e99b40f1f92c730))
* Only certifiable requests can be selected ([6ccfe0d](https://github.com/bcgov/cas-ciip-portal/commit/6ccfe0d733536c4585fd818981e33fb5ee75c674))
* remove schema/.s2i ([47588d4](https://github.com/bcgov/cas-ciip-portal/commit/47588d43e9a8e564aa7e818e6d1a00e77d18ce0d))
* Reusable component for signature disclaimer ([acd13e9](https://github.com/bcgov/cas-ciip-portal/commit/acd13e962c34281b07423c62ab8167f511c3b70a))
* schema image uses docker-entrypoint.sh ([b530194](https://github.com/bcgov/cas-ciip-portal/commit/b530194a9df22e64b1a701defd3b65f41b01676b))
* Select all certification requests in list ([ffb6c94](https://github.com/bcgov/cas-ciip-portal/commit/ffb6c949a8ff49b6262e55ca3eea7fd5a6fdd1c1))
* Selections are updated on query change ([8e644d3](https://github.com/bcgov/cas-ciip-portal/commit/8e644d3606f9e612472fe755faf84129eb4cad26))
* throw validation errors if required energy products are not reported ([d2b4275](https://github.com/bcgov/cas-ciip-portal/commit/d2b42752d67b75ca637ba4f740d3cdb75f33ffc4))
* update cron-deploy-data and add airflow-dag-trigger ([403c778](https://github.com/bcgov/cas-ciip-portal/commit/403c778e01eeb605192b0d946a190246d5e6d758))
* Update link to application disclaimer on certify page ([67bdd2b](https://github.com/bcgov/cas-ciip-portal/commit/67bdd2b7e180990e79d74a5e187e4241596fd749))
* Update table rows after certifying ([6ef447f](https://github.com/bcgov/cas-ciip-portal/commit/6ef447f9a05fe88201c9b3efc39a4935c62cc7d9))
* Update URL for application disclaimer text ([95d7f11](https://github.com/bcgov/cas-ciip-portal/commit/95d7f1165c87c9ebd44c05caac40521e21eb2a05))


### Bug Fixes

* add deploy-data script in schema docker image ([292e8af](https://github.com/bcgov/cas-ciip-portal/commit/292e8af8d739775a45a8b88630a686de3421c4f2))
* app dockerfile works with any uid ([28bb4d2](https://github.com/bcgov/cas-ciip-portal/commit/28bb4d2aa6f09e4e557cef4511743776c17024d0))
* expose port in app docker image ([16aded1](https://github.com/bcgov/cas-ciip-portal/commit/16aded1fa46360ed48bc85fda0f2309634f6ff29))
* fix app dockerfile files ownership ([2b861b4](https://github.com/bcgov/cas-ciip-portal/commit/2b861b43dafc2c6b36bd40ba21c26d80c33e0e70))
* fix app dockerfile typo and try to create ciip group ([6d9e426](https://github.com/bcgov/cas-ciip-portal/commit/6d9e426b35f7da81857ea41285a66d411435caee))
* Fix cert request sorting by certifier surname ([ed41a33](https://github.com/bcgov/cas-ciip-portal/commit/ed41a33c418f663cbea4c3790008f61446e79dce))
* fix credentials in cron jobs ([182e57b](https://github.com/bcgov/cas-ciip-portal/commit/182e57bd16f1d0012d47aae5c49bc53b75ae5286))
* fix deploy-data cronjob name ([9a96e19](https://github.com/bcgov/cas-ciip-portal/commit/9a96e19fac96a36dfd8c9772511ba0e946639286))
* fix helm templates config ([884eab0](https://github.com/bcgov/cas-ciip-portal/commit/884eab0fe42a0d9902746dae64029ac59fcb47f0))
* fix issues in circleci config ([c112bd6](https://github.com/bcgov/cas-ciip-portal/commit/c112bd6d4cdde2223a6fda89360941ee77407d5c))
* fix make install command ([0407107](https://github.com/bcgov/cas-ciip-portal/commit/0407107971ef234f4bbc192f5226fa821a5dd98f))
* fix makefile install command ([30b7c37](https://github.com/bcgov/cas-ciip-portal/commit/30b7c37f48f8ef9a050fa6fdc76ae57ec53ec310))
* fix-permissions should be done by root user ([899d87d](https://github.com/bcgov/cas-ciip-portal/commit/899d87d9624b424a290661892df1590e8878950d))
* increase deployment timeout to 40m ([797089e](https://github.com/bcgov/cas-ciip-portal/commit/797089efa3a18bd2337faa03f167eb6251cc0c13))
* remove hardcoded 'limit' value in search functions ([4a5173e](https://github.com/bcgov/cas-ciip-portal/commit/4a5173e4531c8e7cfe8a3b0996c93302eaf9f2aa))
* shipit timeout should be a number of seconds ([4a55f0e](https://github.com/bcgov/cas-ciip-portal/commit/4a55f0e047eb69aae4cab05dd037e774eb13288b))
* update dockerfile multiline command ([45ca090](https://github.com/bcgov/cas-ciip-portal/commit/45ca0900163787d89d3272f074d9d21922145907))

## [1.0.0-rc.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-alpha.2...v1.0.0-rc.1) (2020-06-05)


### ⚠ BREAKING CHANGES

* **product:** make necessary column name changes to all references to ggircs_portal.product in other files
* **product:** create enum for product_state & update product table

### Features

* (wip) update computed column to be searchable ([546d1b4](https://github.com/bcgov/cas-ciip-portal/commit/546d1b44e60673d3eb4cbd99b72f0d76b88117ff))
* add a foreign key to the search_certification_result type on application_id ([674cea8](https://github.com/bcgov/cas-ciip-portal/commit/674cea85f8ef751377ce08b1a4790ea2b32bdab2))
* add a function to validate existence of energy products if required ([0081256](https://github.com/bcgov/cas-ciip-portal/commit/0081256ccdb561d760c6f889514c51da23bdde92))
* add computed column has_certification_requests to return boolean true if certification requests exist for user ([d179b3e](https://github.com/bcgov/cas-ciip-portal/commit/d179b3e0187bf7211234af1ec855afbd12b533fa))
* add email trigger for 'create application' & fix trigger not to send an email when version = 0 ([3d78c12](https://github.com/bcgov/cas-ciip-portal/commit/3d78c1250ad5a42b0033d710195972c9b955c565))
* add missing return in PaginationBar ([f9e581b](https://github.com/bcgov/cas-ciip-portal/commit/f9e581bd65e15dd1c481b2f03a5ae7bd0fb566c9))
* add more columns to the incentive calculator ([a6513f6](https://github.com/bcgov/cas-ciip-portal/commit/a6513f6ff8ec36990a3636c3e60dc3fe45ff6335))
* add pagination to certifier requests page ([4e078b5](https://github.com/bcgov/cas-ciip-portal/commit/4e078b5bec8ba915839c94fa432d2a84d2afdb5e))
* add return type for search function ([790c79b](https://github.com/bcgov/cas-ciip-portal/commit/790c79be4b9220ef48b2eaf9484d1e8372951ede))
* Add swrs_deadline column to reporting_year ([1b3df5c](https://github.com/bcgov/cas-ciip-portal/commit/1b3df5ca2436808ae153114830e52adc5113a48a))
* add trigger for org access request email ([481d8b8](https://github.com/bcgov/cas-ciip-portal/commit/481d8b8bf7ac9f2193d6063ef40dffdeaf966b42))
* add trigger for organisation access approved email ([796c8ee](https://github.com/bcgov/cas-ciip-portal/commit/796c8eede93434fe8de968ae36ff864751c561da))
* create common component for pagination ([8b551e7](https://github.com/bcgov/cas-ciip-portal/commit/8b551e72995d61299f03d88c87b98177af0f3e82))
* create new requestsContainer for search function ([1732c47](https://github.com/bcgov/cas-ciip-portal/commit/1732c47edcb71fdf27c330cbbb0a75598945d198))
* create standalone search function for certificaiton requests ([cda877b](https://github.com/bcgov/cas-ciip-portal/commit/cda877be31e0da6ab62feface7416a140bde95a6))
* Diff URLs for application & site disclaimers ([a97c882](https://github.com/bcgov/cas-ciip-portal/commit/a97c8822142296f30147f911c48d3a25807e8c3c))
* Finalize copy on application summary page ([d6ceb9d](https://github.com/bcgov/cas-ciip-portal/commit/d6ceb9de4fbfe3a3d507a0e370f27bf6038f1179))
* Finalize copy on certifier redirect page ([0178915](https://github.com/bcgov/cas-ciip-portal/commit/0178915ec392b998b322a47d1e895be7b8737877))
* Finalize copy on reporter dashboard ([5aadd83](https://github.com/bcgov/cas-ciip-portal/commit/5aadd8315c21b912bdf7e44f55725cf83cb48fc1))
* Finalize copy on the certification page ([bf56840](https://github.com/bcgov/cas-ciip-portal/commit/bf56840b9243bbf62c6a9a9f4d8fd3f65b02db02))
* Finalize landing page copy ([dfb347b](https://github.com/bcgov/cas-ciip-portal/commit/dfb347bb98a042a093f9653bc59f50e940b6e03d))
* Finalize legal disclaimer, 1-step consent ([da6376b](https://github.com/bcgov/cas-ciip-portal/commit/da6376b31cee0f0ea1e3b31768096dad8311505f))
* fix syntax errors / relay naming bugs ([82b2903](https://github.com/bcgov/cas-ciip-portal/commit/82b29032ebb7a9299b83663ac97e4b97fef7a1e9))
* Link to batch certify page from dash + email ([4e9c250](https://github.com/bcgov/cas-ciip-portal/commit/4e9c25066cb4e980a9a881bcacf874cf1030a609))
* Mock current_timestamp reflects this year ([edd7245](https://github.com/bcgov/cas-ciip-portal/commit/edd7245aaab270634b70b2adaeba800f1cf29c5a))
* Remove disclaimer checklist before signature ([2a2e876](https://github.com/bcgov/cas-ciip-portal/commit/2a2e876ee943a2a378778ee81dc820b31a06be3d))
* Remove operator DUNS from application form ([17d8937](https://github.com/bcgov/cas-ciip-portal/commit/17d893760b43d76f34eeba94793596b92f7c9e99))
* Remove unecessary facility info from form ([9a662ab](https://github.com/bcgov/cas-ciip-portal/commit/9a662abc47761207590e783a1230181774cf07db))
* Update additional date in reg/login prompt ([e1050b2](https://github.com/bcgov/cas-ciip-portal/commit/e1050b26a2ffbe31ec74808afd65c331668c164b))
* update certification_requests computed column to be searchable ([9743e15](https://github.com/bcgov/cas-ciip-portal/commit/9743e154d84d9b5686b46ee4831f1b7c39a4280f))
* update schema ([d163d08](https://github.com/bcgov/cas-ciip-portal/commit/d163d0871e7fef57b9b3cb8714f81ed95ffa8c5a))
* update triggers to also notify analyst/admin on org request / app submission ([67250d8](https://github.com/bcgov/cas-ciip-portal/commit/67250d834e62ba59109b120c8a170414dd28b1d8))
* use common PaginationBar component in FacilitiesList ([45f9d5b](https://github.com/bcgov/cas-ciip-portal/commit/45f9d5bc51e01d0674994640979fcaece5544670))
* **benchmark:** add past benchmarks to modal as a table ([f24ef43](https://github.com/bcgov/cas-ciip-portal/commit/f24ef43b39e5803bc8d8b28308786fba18b9fbaa))
* **benchmark:** update graphql schema ([fd29022](https://github.com/bcgov/cas-ciip-portal/commit/fd29022541520490201e1a14ea13ffb394f4b8ae))
* **benchmark:** update schema & sqitch plan ([e8f54d0](https://github.com/bcgov/cas-ciip-portal/commit/e8f54d0af630a9aefa117211d772974495e771d2))
* **certification:** update submit certification request UI ([a6525f3](https://github.com/bcgov/cas-ciip-portal/commit/a6525f3b287aa5efe5185768a0f77f5be27aa86c))
* **emission:** add emission category 'Other, non-carbontaxed' & make sure it is not selected in init_application_emission_form_result.sql ([145859b](https://github.com/bcgov/cas-ciip-portal/commit/145859b9ba9e401c576ef30c38bb5d7daef10042))
* **emission:** ignore fuels with non-carbontaxed emission category in the carbon tax calculation ([5f07be7](https://github.com/bcgov/cas-ciip-portal/commit/5f07be7a761c0b0e1f652d03a43595bee04c5ade))
* **emission:** update join to ignore fuels that fall into the non carbon-taxed category ([36d8087](https://github.com/bcgov/cas-ciip-portal/commit/36d808746908965a295cd60225f8fe21a1c2afa4))
* **fuel-form:** add fuel emission category and import from SWRS ([48bacc3](https://github.com/bcgov/cas-ciip-portal/commit/48bacc389a3fa329310b6d59cf5947c1418fed7b))
* **keycloak:** add conditional for null project (local) ([785d4e4](https://github.com/bcgov/cas-ciip-portal/commit/785d4e42a6aa54bbe7061b64798d47bee324ca49))
* **keycloak:** add export files for test/prod & add explicit filename for dev export ([ffeda7f](https://github.com/bcgov/cas-ciip-portal/commit/ffeda7fd5c51df1cb00ab6914ce497025ea8d971))
* **keycloak:** dynamic auth-server-url by namespace ([108fcc7](https://github.com/bcgov/cas-ciip-portal/commit/108fcc7d3a027767f75a0075c4c8ae5dd3c5217c))
* **keycloak:** ignore export files in 'detect secrets' step ([0868704](https://github.com/bcgov/cas-ciip-portal/commit/0868704c9720b80e607038878cc949f42a5c65ea))
* **keycloak:** update pre-commit excludes with proper pattern ([7ef7e30](https://github.com/bcgov/cas-ciip-portal/commit/7ef7e30a77b3278d1b1ee572cf6b941a87f29d9b))
* Update key dates for landing page ([919d38f](https://github.com/bcgov/cas-ciip-portal/commit/919d38fef4ea3ba2d0d6a85cb5b931ce62d0a6fb))
* **organisation requests:** add row level security permissions for ciip_analyst on ciip_user_organisation table ([40038c5](https://github.com/bcgov/cas-ciip-portal/commit/40038c5e19899114a60cf5eadb4129d95e4ac410))
* **organisation requests:** allow analyst group access via front-end to organisations-request page ([7628656](https://github.com/bcgov/cas-ciip-portal/commit/7628656a1cf91a20363aa8e9332be66927ace359))
* **product:** Add a reminder to check guidance on emission allocation if any product in the form requires emission allocation ([ada8690](https://github.com/bcgov/cas-ciip-portal/commit/ada86908afada6366e047b68006c93c7b5c66b09))
* **product:** add is_read_only boolean column to product table & update protect_read_only trigger function to raise an exception if true ([026a26a](https://github.com/bcgov/cas-ciip-portal/commit/026a26a821ee0b924a57aa963e9f2974658de7ca))
* **product:** add partial index on product table where product_state=published ([d906c31](https://github.com/bcgov/cas-ciip-portal/commit/d906c31b36d411ef26baf04b56892c6eab9a5ada))
* **product:** add tooltips on hover to edit benchmark/product icons ([652f9e4](https://github.com/bcgov/cas-ciip-portal/commit/652f9e4be80131b429f26f3959e875e2b4432524))
* **product:** add trigger function to protect read-only product rows/columns ([0f0deec](https://github.com/bcgov/cas-ciip-portal/commit/0f0deec755f67ff893ed091d1a66c9f87f05eaaf))
* **product:** allow benchmark editing for read-only products, split state=archived from read-only ([18bbdc6](https://github.com/bcgov/cas-ciip-portal/commit/18bbdc661fe037a2ed1a61e9dd85a03a6d16fd46))
* **product:** create enum for product_state & update product table ([95ba5f5](https://github.com/bcgov/cas-ciip-portal/commit/95ba5f534cc9d8b80fd04135b16f5a526e0851a4))
* **product:** fix enum comparison (capitalize) ([a37844d](https://github.com/bcgov/cas-ciip-portal/commit/a37844d5abbb852e7333c06cc4fbc45cf3ec41a4))
* **product:** only check if the allocation reminder should show when on the production form ([e14565b](https://github.com/bcgov/cas-ciip-portal/commit/e14565bcea88b81a1ce8073cbdb0dac44789abac))
* **product:** remove future benchmarks ([848720f](https://github.com/bcgov/cas-ciip-portal/commit/848720f07fb90a75ba7985e61f1c31f8d5d62591))
* **product:** remove unnecessary boolean check (archived state is always read-only) ([c2628a7](https://github.com/bcgov/cas-ciip-portal/commit/c2628a7f9adb5cdb797625850e5d15b783069299))
* **product:** rename name -> productName in json schema, close modal on save & use updateProductCount hack to ensure data refresh ([36d0ad0](https://github.com/bcgov/cas-ciip-portal/commit/36d0ad09145c397975223999961a3d64c041f653))
* **product:** split deploy_data files for product: energy products stay in prod/ all other products moved to test/ ([d5f3388](https://github.com/bcgov/cas-ciip-portal/commit/d5f3388120c48703a5b89cd493e3c7c3f8962366))
* **product:** update edit/view icons & disable form in modal based on productState ([ec6da7f](https://github.com/bcgov/cas-ciip-portal/commit/ec6da7f463a525007714a9863d57df05f483bc84))
* **product:** update modal fields to be disabled if isReadOnly=true & update search function to include new column ([b51b4a3](https://github.com/bcgov/cas-ciip-portal/commit/b51b4a31e7d7435bbb504c83f28d8c92f07ad071))
* **product:** update product data & set all energy products to read_only=true ([4c72b25](https://github.com/bcgov/cas-ciip-portal/commit/4c72b2581048be17465040cc71f81a158e7c2c6d))
* **product:** update protect_read_only_products trigger to automatically set is_read_only to true if state changes to archived ([903a0fa](https://github.com/bcgov/cas-ciip-portal/commit/903a0fad66db1b8d1aca80e0597cb206f4826642))
* add toast messages on mutation success/failure ([1764a3a](https://github.com/bcgov/cas-ciip-portal/commit/1764a3a0718b5d96390f1cfb93b2c8afa6495752))
* Admin view + edit reporting period details ([0d49207](https://github.com/bcgov/cas-ciip-portal/commit/0d492072044247b3bfb91cd391b06c4047e804e8))
* Certifier page lists certification requests ([d594323](https://github.com/bcgov/cas-ciip-portal/commit/d5943238ada398cd0fdafda645d0dcdacfcb3215))
* import dev data to eccc_xml_file table ([6c575e9](https://github.com/bcgov/cas-ciip-portal/commit/6c575e9480abb0143e6dc3cac88c5395ef05e5d5))
* Query user certification requests by email ([301585f](https://github.com/bcgov/cas-ciip-portal/commit/301585f701deacf2e0f145fb7bf1215c2df90f52))
* **product:** update logic in trigger function & misnamed schema in product table ([6c743b3](https://github.com/bcgov/cas-ciip-portal/commit/6c743b3d3e26f5749437a6585432378ed16998cf))
* **product:** update product/benchmark modals & add custom widget ([17ad580](https://github.com/bcgov/cas-ciip-portal/commit/17ad58058fcd4dd2e6b6428d2ca6cdb75dde17cb))
* **product:** update search_products.sql to align with new benchmark creation strategy ([ecb9cd8](https://github.com/bcgov/cas-ciip-portal/commit/ecb9cd8a989d383e0c90eb62c03785f64c252bfa))
* **product:** update table headers ([38c52b2](https://github.com/bcgov/cas-ciip-portal/commit/38c52b2fc6914d3dc72d994b25e075a6a6aeada3))
* **product:** update the retrieval of current/past benchmarks for a product ([b24b122](https://github.com/bcgov/cas-ciip-portal/commit/b24b1220a3db028904233e1a1132061d77201eef))
* **product:** use moment.js to convert modified column to a more readable format ([4e02607](https://github.com/bcgov/cas-ciip-portal/commit/4e02607dbaed1c62ad1c0e2a4aba92940b733782))
* facility table displays type, ghg id and last swrs report year ([67815d6](https://github.com/bcgov/cas-ciip-portal/commit/67815d6b497d20b91ab9fe985e043a04ead7b7ae))


### Bug Fixes

* add AS_CERTIFIER flag to index ([6438131](https://github.com/bcgov/cas-ciip-portal/commit/64381317c55b6e68277460685e22a6d66ada7721))
* add column 'is_energy_product' to product table ([3750784](https://github.com/bcgov/cas-ciip-portal/commit/3750784bd942cc0a5063216b169f9e7f575c53dd))
* add comment on security definer function ([9108056](https://github.com/bcgov/cas-ciip-portal/commit/9108056442af08b97251f1c6dee7e26a52c5ffa7))
* add fkey to search_certification_requests return type ([847facb](https://github.com/bcgov/cas-ciip-portal/commit/847facb7ba9c6b8e5ece87f73f3c823de25838b9))
* add guard clause to return null if there are no certificationUrls to display ([6421898](https://github.com/bcgov/cas-ciip-portal/commit/6421898378cd5358c04664d91c2b1b16f8fe37d1))
* add missing comma (syntax error) ([0a52160](https://github.com/bcgov/cas-ciip-portal/commit/0a521604a0ee8e22f127aa181deae0a3a62e5afb))
* Add omitted word from reporter dash copy ([91204e3](https://github.com/bcgov/cas-ciip-portal/commit/91204e3a1d9570abc8958079657b3f5cf5d76d26))
* add security definer to certifier access to facilities function ([744862e](https://github.com/bcgov/cas-ciip-portal/commit/744862ef10c5fcdd0ec7e3044c3ce401ee812d7a))
* add validation error for conflicting products where requires_emission_allocation = false ([089b327](https://github.com/bcgov/cas-ciip-portal/commit/089b327ca77579ff9edcd8acb23c62be96450194))
* allow industry users to view details of other users ([58500c8](https://github.com/bcgov/cas-ciip-portal/commit/58500c846e41e6635e18dc0509b369af1ad60510))
* Correct DST timezone offset for seed dates ([122db24](https://github.com/bcgov/cas-ciip-portal/commit/122db24b9201df6599dd99ba68e4931050dd5d01))
* Fix application ID in cert. redirect URL ([6e1352f](https://github.com/bcgov/cas-ciip-portal/commit/6e1352f6484a61297af6076e9c2cf17bbbc3a7d8))
* Fix user foreign key ref on certification_url ([121dd8c](https://github.com/bcgov/cas-ciip-portal/commit/121dd8cd467b47d47fc39aabbd8f9e7d8aa97d55))
* incentive payment uses incremental portion of CT ([a2f5ab9](https://github.com/bcgov/cas-ciip-portal/commit/a2f5ab970ea048e2557e6acf852a7af15682b978))
* remove a hardcoded value ([c22d0a8](https://github.com/bcgov/cas-ciip-portal/commit/c22d0a8ca53640b7c9ec9efaaaca1cceb9cfe73d))
* remove extra select/end ([b278db6](https://github.com/bcgov/cas-ciip-portal/commit/b278db69e38acc1ce86f467b3ba4e088e7265f43))
* roll back markdown-to-jsx version in resolutions ([60d1e2d](https://github.com/bcgov/cas-ciip-portal/commit/60d1e2dda64d36911eae3a19237bf9679bd457a7))
* show max possible incentive for product, update incentive segment ([f2b21e1](https://github.com/bcgov/cas-ciip-portal/commit/f2b21e15973cf3b9d813a2ec19cbbd25239366b9))
* throw exception in application_revision_ciip_incentive if incorrect number of products are reported ([0f4b994](https://github.com/bcgov/cas-ciip-portal/commit/0f4b99456896c434a7ea2dc1de48ad415c4f3cde))
* typescript was angry at the rowId key, pass it the id of the certificationUrl instead ([eabb5dd](https://github.com/bcgov/cas-ciip-portal/commit/eabb5dd9dcab8b0dd7a59e6b58fe8bd6bc792ef1))
* use asdf-node "import-relase-keyring" in tools docker image ([ca03f80](https://github.com/bcgov/cas-ciip-portal/commit/ca03f802a2094116fe3b358684472e028cbb9822))
* use asdf-node "import-release-keyring" ([6fc6251](https://github.com/bcgov/cas-ciip-portal/commit/6fc62510ade3ad7226f5b47ecead7462ca349184))
* **certifier:** fix 'uncheckable' checkbox in optional email for certifier ([3aa2657](https://github.com/bcgov/cas-ciip-portal/commit/3aa2657b02140d3b5d19a65378b88c33cc01388b))
* **facility:** remove extra join condition on created_at column ([4c2ae00](https://github.com/bcgov/cas-ciip-portal/commit/4c2ae008faa1c54afab92510a8bc4911504f7e20))
* **product:** add 'hidden-title' style to productCreatorContainer to hide jsonschemaform titles like in the ProductRowItemContainer ([075629e](https://github.com/bcgov/cas-ciip-portal/commit/075629efc79a4f23374a74fed454bbea2828435f))
* **search tables:** fixed cut off table headers for button columns / bad ordering in user-organisation table header ([b2862c3](https://github.com/bcgov/cas-ciip-portal/commit/b2862c39f364bb5e11c6693995d479d306a82e5d))


* **product:** make necessary column name changes to all references to ggircs_portal.product in other files ([a8c2c69](https://github.com/bcgov/cas-ciip-portal/commit/a8c2c691daa40c8df986ae271bc1f7dfcc12273e))

## [1.0.0-alpha.2](https://github.com/bcgov/cas-ciip-portal/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2020-05-01)


### Features

* **admin-form:** remove fax number from admin form ([c6f1f4c](https://github.com/bcgov/cas-ciip-portal/commit/c6f1f4c091c4cfe709414567292bfbb44014be52))
* set HOST env variable when deploying the app ([c0a724f](https://github.com/bcgov/cas-ciip-portal/commit/c0a724f4590d80a067879158f75d5b98bac97348))
* **email:** add support for HOST env variable ([#587](https://github.com/bcgov/cas-ciip-portal/issues/587)) ([056f2d6](https://github.com/bcgov/cas-ciip-portal/commit/056f2d61eae30fb24dfecc500bf1b9a04b758648))
* error boundary shows a useful error message ([a398042](https://github.com/bcgov/cas-ciip-portal/commit/a39804215f90f8160f903c8560cd3f75770ca2d7))
* **fuel-form:** fuel units is a read-only field ([4a8e9be](https://github.com/bcgov/cas-ciip-portal/commit/4a8e9be2791fe11e94e475f01d54d4e5a420d499))
* **fuel-form:** remove methodology from fuel form ([0b68551](https://github.com/bcgov/cas-ciip-portal/commit/0b68551e2b286b1099007c2b75ab896f86df5f59))
* **keycloak:** remove bceid identity provider ([1cc40c6](https://github.com/bcgov/cas-ciip-portal/commit/1cc40c6ca849ec11253bef5efbfd570b071cdcc3))
* **product:** add EIO emissions as a product  ([8d22f60](https://github.com/bcgov/cas-ciip-portal/commit/8d22f60937065f086ecfc4b007cf211df8d5d885))
* **product:** add optional chaining for state-check ([9bd005b](https://github.com/bcgov/cas-ciip-portal/commit/9bd005bf7d28c02ef06e1df6dd953edeec9d4723))
* **product:** do not allow selection of inactive products from dropdown ([ad1ecff](https://github.com/bcgov/cas-ciip-portal/commit/ad1ecffd53d138eaacebd38b06f5a6f4ef00bfee))
* **product:** ensure that although we now fetch all products regardless of state, that inactive products cannot be selected ([d43479d](https://github.com/bcgov/cas-ciip-portal/commit/d43479d816eb90e4716855dd544d097eb109b851))
* **product:** show warning for deprecated/archived products & don't show them as options from the product dropdown ([29549e9](https://github.com/bcgov/cas-ciip-portal/commit/29549e99e2dc51cde13d90e4fb89c625f644b79c))
* **product:** update schema ([5c227b4](https://github.com/bcgov/cas-ciip-portal/commit/5c227b4e65a0a57e3dd0586b3d5f357f932dda8a))
* 1-step form validation ([48318d1](https://github.com/bcgov/cas-ciip-portal/commit/48318d1912c200daf38785e307c471f6512a17f8))
* Validate BC Corporate Registry Number format ([d6a1afd](https://github.com/bcgov/cas-ciip-portal/commit/d6a1afd31a59993a5fe6c2c04ff7605bf1fbaf38))


### Bug Fixes

* use 0 for undefined values ([d8a3542](https://github.com/bcgov/cas-ciip-portal/commit/d8a35426cef8667bbffbef4c973747898293bedf))
* use decimal.js-light library to fix inaccurate javascript decimal issue ([b981f2b](https://github.com/bcgov/cas-ciip-portal/commit/b981f2b18272188b43e76f9a7326b8e3b300ed6f))
* **ci:** fix misnamed ci job ([c9fc187](https://github.com/bcgov/cas-ciip-portal/commit/c9fc1872d9cadd213309d2dcae0e69139f5ee75f))
* **dependency:** add missing dependency for pg-8.0.2 -> graphile-build-pg ([2c3dcb7](https://github.com/bcgov/cas-ciip-portal/commit/2c3dcb72dde020b4ef9ea381b73bf2b70110a86d))
* **emissions-form:** fix typo in N2O gas name (was N20) ([0d20aec](https://github.com/bcgov/cas-ciip-portal/commit/0d20aec06166f8895554ac211594eefae13c536a))
* **facility:** pagination bar cannot go past last page ([11f3a94](https://github.com/bcgov/cas-ciip-portal/commit/11f3a945e9f5057dc5e1c279b9933cf5259d83ce))
* **facility:** provide organisationRowId as a variable to the search facilities function ([d787828](https://github.com/bcgov/cas-ciip-portal/commit/d787828f39c565130c4f21d474a21c030cac9539))
* **facility:** update search function to filter facilities by organisationRowId if organisationRowId is not null ([b30251d](https://github.com/bcgov/cas-ciip-portal/commit/b30251d3db598af4bd0d5d58cb5e044e195da81a))
* **revision status:** add a boolean value to application revision to indicate if it is the current version ([63ce822](https://github.com/bcgov/cas-ciip-portal/commit/63ce8222b1f6b9a40face4fb6b28cd1cb1bcfb9a))
* **revision status:** add a version_number_input variable to computed column for application revision status ([cc97e4b](https://github.com/bcgov/cas-ciip-portal/commit/cc97e4b9cd8c7597c32f7db41ee10c0e2bf24d4a))
* **revision status:** add version number inputs to other queries that pull the revision status ([ef1f3e7](https://github.com/bcgov/cas-ciip-portal/commit/ef1f3e776c1c0e1bea287c4400cd7d67f0907b4e))
* **revision status:** conditionally render a dropdown or disabled button depending on if the revision being viewed is the current version ([f5bd524](https://github.com/bcgov/cas-ciip-portal/commit/f5bd5244da8b1f99ae55ba0ff50231d6e283142a))
* **revision status:** create trigger to disallow changing the status of a non-current version of the application ([8662301](https://github.com/bcgov/cas-ciip-portal/commit/866230191af5a360dd64ec464950ba1071afdf59))
* **revision status:** fix search all facilities logic when retrieving application revision status ([bd733de](https://github.com/bcgov/cas-ciip-portal/commit/bd733de25406a15880dadeee7ef1dac8ff579a1f))
* **revision status:** Fix the search facilities function to return the proper revision status ([b61c2cb](https://github.com/bcgov/cas-ciip-portal/commit/b61c2cb760dd4ea16853a53f55d21307d024310e))
* **revision status:** remove unnecessary select ([c8f3def](https://github.com/bcgov/cas-ciip-portal/commit/c8f3def773dfb70540d4a16787e4004c4333fa60))
* **revision status:** update mutation to accept a version input & pass version from mutation call inside review container ([86a0063](https://github.com/bcgov/cas-ciip-portal/commit/86a006329529b9170d1d95683b1d29d9539f4ecb))
* **revision status:** use versionNumberInput variable when querying the status from a review (ensures proper status is shown for version being reviewed) ([5412c6b](https://github.com/bcgov/cas-ciip-portal/commit/5412c6b27bb3d1910fbd1dcc46bf75fedc3e6550))
* Add missing dependency required for Storybook ([429c877](https://github.com/bcgov/cas-ciip-portal/commit/429c8772ecec0e61e00685f62d79c4e1c084bf06))
* create portal_app database user with sqitch ([2d95365](https://github.com/bcgov/cas-ciip-portal/commit/2d953659ece01d55f02943fbd89367ed909868c4))
* NAICS code should be converted to a string when imported from swrs ([2c4f8e3](https://github.com/bcgov/cas-ciip-portal/commit/2c4f8e384600d147da713cd2b69debbd3c92294c))
* Remove unused older version of Bootstrap ([248b366](https://github.com/bcgov/cas-ciip-portal/commit/248b3669dfe9b8f527234a4051c7ea2ef7094b41))
* **server:** default db user should not be portal_app if NO_AUTH is used ([50eaa6f](https://github.com/bcgov/cas-ciip-portal/commit/50eaa6f3c1540a9702e57c03c92b8392565be54a))

## 1.0.0-alpha.1 (2020-04-17)


### ⚠ BREAKING CHANGES

* SWRS data is now loaded in the application creation mutation chain. Removed the swrs_* queries in the Application object
* JSON fields should not be parsed or stringified anymore

### Features

* **admin:** all products options are displayed when creating a product ([a5c5ddd](https://github.com/bcgov/cas-ciip-portal/commit/a5c5ddd898b14ac90c1a44cdc596e1c76046746b))
* **admin:** set default values and update titles in products creation ([530acc4](https://github.com/bcgov/cas-ciip-portal/commit/530acc4f4eb017102e6b0a0db47766d529115856))
* **emissions:** set default value for emission amounts to 0 ([fbb541b](https://github.com/bcgov/cas-ciip-portal/commit/fbb541b325aa1bae23c7180e8e64616529914bcd))
* **git-cz:** make this ugly-ass monorepo commitizen-friendly ([15c20dc](https://github.com/bcgov/cas-ciip-portal/commit/15c20dc00658bf06239b734a0dae5d5dddde11e1))
* **schema:** swrs schema is created by sqitch if not exists ([25714bd](https://github.com/bcgov/cas-ciip-portal/commit/25714bd1fe9453ad7c7b2d613e955cd4a3439821))
* NumberField renders as text if readonly is true ([83d5e7b](https://github.com/bcgov/cas-ciip-portal/commit/83d5e7bb228e71bde4b3a87304c874080f391dfd))


### Bug Fixes

* accepting cpan defaults blindly fails on openshift ([6126a3c](https://github.com/bcgov/cas-ciip-portal/commit/6126a3cfc2ff3da81723cbdf0a8328fa11de2266))
* Add isomorphic-fetch as a dependency ([66528c8](https://github.com/bcgov/cas-ciip-portal/commit/66528c89ac7954a224bad4a0474e8135a94c93bf))
* add selective dependency resolution to fix vulnerability ([1f5313c](https://github.com/bcgov/cas-ciip-portal/commit/1f5313c33eae463691c0a202013458ec38565465))
* benchmark numbers should be numeric instead of real ([76092c9](https://github.com/bcgov/cas-ciip-portal/commit/76092c9c3c58c426d7594989ad2f88304653bfe0))
* cpanm should use -l extlib option ([e00f9a4](https://github.com/bcgov/cas-ciip-portal/commit/e00f9a460d375aec1e0ba7f797400d07728bd159))
* do not import LFOs and EIOs from swrs + dedup facilities ([448139c](https://github.com/bcgov/cas-ciip-portal/commit/448139cbf5d485d55a261e5e3d9ead61a80ff606))
* do not pull swrs emissions where category is null ([74bca7c](https://github.com/bcgov/cas-ciip-portal/commit/74bca7c707e36772ab3d90135ad323d32178c58e))
* do not render ApplicationFormNavbar before setting formResultId ([234a228](https://github.com/bcgov/cas-ciip-portal/commit/234a2283a5e2d08bb161e3f3ddc9ec8c5e20f262))
* drop policies before re-creating them ([20e07a4](https://github.com/bcgov/cas-ciip-portal/commit/20e07a4ccb088638b8cb73a777eb5f2593ca6506))
* enable rsjf's safeRenderCompletion hack to prevent cursor jumps ([950c7e1](https://github.com/bcgov/cas-ciip-portal/commit/950c7e17713f65d65d8ec0f9ab5598f52caaf55b))
* fail revert job properly and increase activedeadlineseconds ([ee01fb3](https://github.com/bcgov/cas-ciip-portal/commit/ee01fb3f473cc982e1de62aa2006e7be1c18ae8f))
* https://www.npmjs.com/advisories/1488 ([18fcc91](https://github.com/bcgov/cas-ciip-portal/commit/18fcc91eb1919451394086c50d27456bdc3907fa))
* increase memory request to build app on pathfinder ([b260785](https://github.com/bcgov/cas-ciip-portal/commit/b2607854f8408a8b868ca688ead3ada1a3878b74))
* json objects in postgres should be created with jsonb_build_object ([e764d29](https://github.com/bcgov/cas-ciip-portal/commit/e764d29f4814354dd39e595327dd1e73f5bb2e1e))
* make install_perl_tools should call submake ([d0bc48c](https://github.com/bcgov/cas-ciip-portal/commit/d0bc48c502a7f9312bdb9f70669c2dc2eec9fc5c))
* NumberField should follow the "disabled" prop ([1018b7e](https://github.com/bcgov/cas-ciip-portal/commit/1018b7e7629b80968cf9d41c28f0623d4ef97152))
* NumberField sould always return a number ([62f86ba](https://github.com/bcgov/cas-ciip-portal/commit/62f86ba7118398e28ec453f90e16e0134419b447))
* paths in deploy-test-data should not use __dirname ([f89a44e](https://github.com/bcgov/cas-ciip-portal/commit/f89a44ef2e523e412285f5e16e9a47d0ba3098d3))
* remove isomorphic-unfetch ([673df8d](https://github.com/bcgov/cas-ciip-portal/commit/673df8d1e28bab4dd6f1242d8d31dd0702fba4e8))
* schema-deploy job name was not updated aver prefix rename ([ebeea52](https://github.com/bcgov/cas-ciip-portal/commit/ebeea5295d40f0dc28cefc223fcb5971d4986a9d))
* server/index.js should use commonjs imports ([00bfa7a](https://github.com/bcgov/cas-ciip-portal/commit/00bfa7a56fa224db8e19a19ad36d9b918091d9d9))
* skip tests when installing cpanm ([e7c1131](https://github.com/bcgov/cas-ciip-portal/commit/e7c1131b6ebb98a9a13a7231b67c77d3bd7d7e08))
* sqitch needs the `SQITCH_TARGET` and `PGHOST` variables ([73bec71](https://github.com/bcgov/cas-ciip-portal/commit/73bec71373a5b090a6983d03df1da19b3b7106ab))
* start url with https ([6a410d3](https://github.com/bcgov/cas-ciip-portal/commit/6a410d3b761d5d1e2f2e0fe113421943293cdd00))
* update case of energy products names ([02968cf](https://github.com/bcgov/cas-ciip-portal/commit/02968cff13410b4a4b92f30a010847c9e73b6498))
* use next getConfig instead of process.env to get FEEDBACK_SITE_URL ([d4dc5cb](https://github.com/bcgov/cas-ciip-portal/commit/d4dc5cb50dafa857f9ba9bae3987ec91f951c806))
* **authentication:** ensure malformed sessions are recoverable by logout ([26736e8](https://github.com/bcgov/cas-ciip-portal/commit/26736e87ef38aa2243b5d752279fd64d06e86eba))
* **ci:** pull the version of the submodules defined in the repo ([3888c3c](https://github.com/bcgov/cas-ciip-portal/commit/3888c3c4d2215acc2bc4b292e6aad73418c8045d))
* **circleci:** pathfinder build should wait for next.js compilation ([b6b51e3](https://github.com/bcgov/cas-ciip-portal/commit/b6b51e3b0903a51c5b50d75ae35aa5a77faa7aad))
* **config:** minified files are ignored by default ([c329a0a](https://github.com/bcgov/cas-ciip-portal/commit/c329a0af3c8c775579502210e35d7df61e9eb97e))
* **deploy-test-data:** form_result data should be deployed after gases ([4034c56](https://github.com/bcgov/cas-ciip-portal/commit/4034c56d58f2a3f3d40410e1e1f1349785c07a01))
* **deploy-test-data:** sqitch operations are done on the correct db ([4383b55](https://github.com/bcgov/cas-ciip-portal/commit/4383b55d52ab230acdb41791252a4808fad1c336))
* **form:** EmissionGasFields now converts emission amount to number ([ba1a062](https://github.com/bcgov/cas-ciip-portal/commit/ba1a0625072b63c7e3642af2d29cc433b97a4a4a))
* **next.config.js:** rename ts file to js so it isn't ignored by next ([3397428](https://github.com/bcgov/cas-ciip-portal/commit/3397428e8c32b01165d83df69a9c8121efa0d0a8))
* **security:** ensure marked is >= 0.7.0 ([0c05117](https://github.com/bcgov/cas-ciip-portal/commit/0c051177f3247c1592877be1020bbd1704d0d088))
* **security:** ensure terser-webpack-plugin is ^1.4.2 ([f67820c](https://github.com/bcgov/cas-ciip-portal/commit/f67820c2d3031655caa1a2019cd91894f954424e))
* **security:** mem 1.1.0 is vulnerable to DoS attack; use mem >= 4.0.0 ([ffd475a](https://github.com/bcgov/cas-ciip-portal/commit/ffd475a21926ec06685e577dbfc47bd745bba1f0))
* **security:** patch arbitrary code execution exploit ([98354c5](https://github.com/bcgov/cas-ciip-portal/commit/98354c5a208fffc2df5d1861d94e99a1c1e02b80))
* **snapshots:** snapshot drift caused by rebase ([b9a02dc](https://github.com/bcgov/cas-ciip-portal/commit/b9a02dcd73eb25377dc8ff0258cad69031251fc4))
* **style:** avoid abusing typescript ([76558b6](https://github.com/bcgov/cas-ciip-portal/commit/76558b6ae013fbb6eb7889f2650efe423c585e73))
* **style:** implement review feedback ([b4d19e2](https://github.com/bcgov/cas-ciip-portal/commit/b4d19e29ecc234b79d8624ede93ece1d8ac4640f))
* **style:** linter acts differently on CI; just write decent types ([b4b33b9](https://github.com/bcgov/cas-ciip-portal/commit/b4b33b9ed201d15617ab52fb00afe61d7a87fa6e))
* **style:** linter teh fings ([b96575e](https://github.com/bcgov/cas-ciip-portal/commit/b96575ee76358c52a1aeb73ca0cac93a0edab207))
* **style:** remove useless comments ([99e5ef0](https://github.com/bcgov/cas-ciip-portal/commit/99e5ef072dc0e061713ec05e080f102a9a655128))
* **typescript:** exclude unnecessary folders ([28777d0](https://github.com/bcgov/cas-ciip-portal/commit/28777d0b3fe1e343a6c1e39a682457343d452927))
* **typescript:** mock next/router should be the right type ([788ca40](https://github.com/bcgov/cas-ciip-portal/commit/788ca40782b9fdc489fedf2d17c38542600759f2))


### feature

* remove application_swrs_* functions ([7453a9c](https://github.com/bcgov/cas-ciip-portal/commit/7453a9cc275f920ce1ae976ab1f56489ac9d7182))
* Use postgraphile's `dynamicJson` option. ([bf2e831](https://github.com/bcgov/cas-ciip-portal/commit/bf2e83138c19de3b9a2f0431fba6bf7e93a02af7))

## 1.0.0-alpha.0
 (2020-04-15)
