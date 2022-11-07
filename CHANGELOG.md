# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.18.4](https://github.com/bcgov/cas-ciip-portal/compare/v2.18.3...v2.18.4) (2022-11-04)

### [2.18.3](https://github.com/bcgov/cas-ciip-portal/compare/v2.18.2...v2.18.3) (2022-07-20)

### [2.18.2](https://github.com/bcgov/cas-ciip-portal/compare/v2.18.1...v2.18.2) (2022-07-18)

### [2.18.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.18.0...v2.18.1) (2022-05-04)


### Bug Fixes

* prod-test-restore missing ggircs_parameters schema ([a2260d2](https://github.com/bcgov/cas-ciip-portal/commit/a2260d2df409e0c0f69fb5b3f960b2c6aa839a39))

## [2.18.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.17.0...v2.18.0) (2022-05-03)


### Features

* replace lastSwrsReportingYear with hasSwrsReport boolean ([b881ba4](https://github.com/bcgov/cas-ciip-portal/commit/b881ba4596a1967e1b0173e5f8e4cc8f93b45702))
* total co2 emissions on the summary page ([7f2e005](https://github.com/bcgov/cas-ciip-portal/commit/7f2e00585e33382ee88b8877d16d8aaa3cccef4d))
* total on swrs onsite emissions ([c0cc2d7](https://github.com/bcgov/cas-ciip-portal/commit/c0cc2d7621494e545496bc4a5a459ef09c545d8b))


### Bug Fixes

* disable mutation batching ([6b7a126](https://github.com/bcgov/cas-ciip-portal/commit/6b7a1265dbc43bffd3b3c4f408fa726c97d0f3a7))

## [2.17.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.16.3...v2.17.0) (2022-04-05)


### Features

* ggircs link on the admin dashboard ([ee79185](https://github.com/bcgov/cas-ciip-portal/commit/ee79185bba584a24947e447de47eea859ace28f6))
* Sold Electricity product units is in GWh ([8dedd87](https://github.com/bcgov/cas-ciip-portal/commit/8dedd874bb6349e02293df3a08fb83bfc3b35325))

### [2.16.3](https://github.com/bcgov/cas-ciip-portal/compare/v2.16.2...v2.16.3) (2022-02-23)

### [2.16.2](https://github.com/bcgov/cas-ciip-portal/compare/v2.16.1...v2.16.2) (2022-02-15)


### Bug Fixes

* include new ggircs_parameters schema in cron-swrs-import ([fa7da72](https://github.com/bcgov/cas-ciip-portal/commit/fa7da72126f2c395af7e8f73148e6a9aba44e760))

### [2.16.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.16.0...v2.16.1) (2022-02-14)


### Bug Fixes

* get_swrs_facility_data() does not rely on deprecated view ([c1edc1c](https://github.com/bcgov/cas-ciip-portal/commit/c1edc1cda0f76b1e509305a072ffb25e270a184f))
* remove old reference to deprecated view ([0331363](https://github.com/bcgov/cas-ciip-portal/commit/0331363dbba8810d449038bd94fcfe7de41306be))

## [2.16.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.15.0...v2.16.0) (2022-02-02)


### Features

* round incentive ratio to 4 decimal places during calculation ([9ca1552](https://github.com/bcgov/cas-ciip-portal/commit/9ca155255a318d6a8e755df33c6a286561f354b4))


### Bug Fixes

* redirect unauthorized idir users to /analyst/pending ([7401964](https://github.com/bcgov/cas-ciip-portal/commit/7401964b87ab2ccfc49ede2a96babb0b3018b0b8))

## [2.15.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.14.3...v2.15.0) (2022-01-13)


### Features

* add incremental_fuel_charge_baseline table ([0cb0397](https://github.com/bcgov/cas-ciip-portal/commit/0cb0397d57b531f1cf1b1b996fca617ff8fd39ac))
* round incentive ratio to 2 decimal places ([44c97de](https://github.com/bcgov/cas-ciip-portal/commit/44c97de9e5b4169cb2c1f3e4d74254f912b81bb7))

### [2.14.3](https://github.com/bcgov/cas-ciip-portal/compare/v2.14.2...v2.14.3) (2021-12-09)

### [2.14.2](https://github.com/bcgov/cas-ciip-portal/compare/v2.14.1...v2.14.2) (2021-11-24)


### Bug Fixes

* session timeout now doesn't refresh the session automatically ([1c8eb38](https://github.com/bcgov/cas-ciip-portal/commit/1c8eb38c6f7173c99d1b3167415d4655906f202d))
* updating non-impacting CVE ignore codes ([cd64992](https://github.com/bcgov/cas-ciip-portal/commit/cd6499288796353efe85ccf7ea494d03e39415cc))

### [2.14.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.14.0...v2.14.1) (2021-11-10)


### Bug Fixes

* removing the environment variable form the deploy ([f283a50](https://github.com/bcgov/cas-ciip-portal/commit/f283a5096c8c1a05cb68afdac7033df87c39a1e3))

## [2.14.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.13.1...v2.14.0) (2021-11-09)


### Features

* component to handle login expiry modal ([2bbbe36](https://github.com/bcgov/cas-ciip-portal/commit/2bbbe36d0053be822addc885e77c87e0a6bbb779))
* refresh-session endpoint for server ([17bb6d1](https://github.com/bcgov/cas-ciip-portal/commit/17bb6d13497da0347475355e3afd101010f1c49b))
* start session refresh ([8ff0cf3](https://github.com/bcgov/cas-ciip-portal/commit/8ff0cf37a1b6a51aa41df0230798a00792d5034c))
* update validation function to ignore non carbon-taxed fuels ([24d8d22](https://github.com/bcgov/cas-ciip-portal/commit/24d8d22c2f699cc15ade30d954044fd4cf27ef7e))
* updating validation logic on un-required products ([1435b6e](https://github.com/bcgov/cas-ciip-portal/commit/1435b6eb2baaac456cf5673a9b7c330239616efe))


### Bug Fixes

* adding manual dag trigger to init container ([0ab5a66](https://github.com/bcgov/cas-ciip-portal/commit/0ab5a66169b0e98e81c7cd08e0474f6be6b43802))
* app submit button should not crash when reporting year is closed ([23be1a0](https://github.com/bcgov/cas-ciip-portal/commit/23be1a0b09c82cc3958b225c55f7d514bd326e14))
* do not create extraneous review steps for older applications ([9b50a1d](https://github.com/bcgov/cas-ciip-portal/commit/9b50a1deec2651bb7c8dc08f75bed0d5a825a946))
* invalidating old cpan package cache ([3eac737](https://github.com/bcgov/cas-ciip-portal/commit/3eac7375b35727f74ae9cd4b80e7c14bab9a02ae))
* reload nginx containers ([a4950a4](https://github.com/bcgov/cas-ciip-portal/commit/a4950a41d68e7b15f13c289801a183a1f968f45f))
* update acme cronjobs in DAGs ([618df42](https://github.com/bcgov/cas-ciip-portal/commit/618df42590a7c644d20208d072d8397e5c5604f1))
* updating circleci machine image ([5e9b0b5](https://github.com/bcgov/cas-ciip-portal/commit/5e9b0b57fbe3de64770fa0188919501cdd438ae3))

### [2.13.2](https://github.com/bcgov/cas-ciip-portal/compare/v2.13.1...v2.13.2) (2021-10-05)


### Bug Fixes

* app submit button should not crash when reporting year is closed ([23be1a0](https://github.com/bcgov/cas-ciip-portal/commit/23be1a0b09c82cc3958b225c55f7d514bd326e14))
* update acme cronjobs in DAGs ([618df42](https://github.com/bcgov/cas-ciip-portal/commit/618df42590a7c644d20208d072d8397e5c5604f1))

### [2.13.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.13.0...v2.13.1) (2021-09-28)

## [2.13.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.12.1...v2.13.0) (2021-09-28)


### Features

* adding cronjobs and a deployment add-on ([1f10edb](https://github.com/bcgov/cas-ciip-portal/commit/1f10edba19d8dc9417d3f7368ee5b6cacb7c6615))
* create application chart instead that create openshift artifacts ([3110966](https://github.com/bcgov/cas-ciip-portal/commit/3110966e278ff0ea10894a63db0023182b98290c))
* express trusts proxies ([4c70bea](https://github.com/bcgov/cas-ciip-portal/commit/4c70bead985aeedcefa5ade8f5cdefde189dd2fe))
* library helm chart for nginx sidecar templates ([2c1304e](https://github.com/bcgov/cas-ciip-portal/commit/2c1304e811930bd7254ffacaec3d8908ba773f93))
* using the sidecar library to add nginx container in the deployment ([8ddb569](https://github.com/bcgov/cas-ciip-portal/commit/8ddb5698776b6d5258462500f67afb92866dbe0c))


### Bug Fixes

* acme issue dag is only triggered on insecure deploy ([e6577e9](https://github.com/bcgov/cas-ciip-portal/commit/e6577e9eda4d175518b96198bd89bf4a7ab5cbe8))
* lint step tests all 3 sets of values ([bdabac5](https://github.com/bcgov/cas-ciip-portal/commit/bdabac557bf03e2f1629fe6d6374987bfa4de243))
* show submit button for older applications with version > 1 ([6a51b51](https://github.com/bcgov/cas-ciip-portal/commit/6a51b518c4fa7589413cdfee7f4c61d72f342f38))

### [2.12.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.12.0...v2.12.1) (2021-09-15)


### Bug Fixes

* ensure proper emission_intensity for products with no emissions ([688fc8d](https://github.com/bcgov/cas-ciip-portal/commit/688fc8d990cde55338237213be93c58f58d72859))
* properly retrieve comments in ciip_production view ([4196b90](https://github.com/bcgov/cas-ciip-portal/commit/4196b90c4538f691326d0461b53f7168938ecced))

## [2.12.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.11.4...v2.12.0) (2021-08-25)


### Features

* emissions from eios unit change to GWh ([192e5d8](https://github.com/bcgov/cas-ciip-portal/commit/192e5d81f29fa12773c96fc78b072bb1618adec0))

### [2.11.4](https://github.com/bcgov/cas-ciip-portal/compare/v2.11.3...v2.11.4) (2021-08-06)


### Bug Fixes

* add migration to resync swrs_report_id ([166ecb0](https://github.com/bcgov/cas-ciip-portal/commit/166ecb029bb8b5ae15b207401e6683e0d207abab))
* check namespace suffix for env ([23e1b76](https://github.com/bcgov/cas-ciip-portal/commit/23e1b767ead373af48d8dd8ac2cfae8b1290833b))
* refresh_swrs_version_data does not update the swrs_report_id ([c129559](https://github.com/bcgov/cas-ciip-portal/commit/c129559f9a83df9a4badb9b019bffe4d402a2d31))

### [2.11.3](https://github.com/bcgov/cas-ciip-portal/compare/v2.11.2...v2.11.3) (2021-08-05)


### Bug Fixes

* ensure graceful server shutdown with Lightship ([8f779ad](https://github.com/bcgov/cas-ciip-portal/commit/8f779ad5593d19beb2944995c506010bc0c3742f))
* lightship uses port 9000 in k8s, and a random unused port locally ([9a702b8](https://github.com/bcgov/cas-ciip-portal/commit/9a702b81c9bba63b7083a54146191864d60822ea))
* readiness/liveness probes are always with http scheme (the default) ([97049ab](https://github.com/bcgov/cas-ciip-portal/commit/97049ab948479ad04f2b1fa6b5f3869dd6e90ede))

### [2.11.2](https://github.com/bcgov/cas-ciip-portal/compare/v2.11.0...v2.11.2) (2021-07-27)


### Bug Fixes

* add carbon_taxed column to emission_category table ([e3c1e48](https://github.com/bcgov/cas-ciip-portal/commit/e3c1e489f0ba30c3ed6566c54e94b6516085b82c)), closes [#1933](https://github.com/bcgov/cas-ciip-portal/issues/1933)
* application list should retrieve the latest *submitted* status ([ee2507c](https://github.com/bcgov/cas-ciip-portal/commit/ee2507c0de4ef8962bea54e3841b4883965e29a5))

### [2.11.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.11.0...v2.11.1) (2021-07-21)


### Bug Fixes

* application list should retrieve the latest *submitted* status ([ee2507c](https://github.com/bcgov/cas-ciip-portal/commit/ee2507c0de4ef8962bea54e3841b4883965e29a5))

## [2.11.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.10.0...v2.11.0) (2021-07-20)


### Features

* add ciip_incentive_per_product view ([d68a94c](https://github.com/bcgov/cas-ciip-portal/commit/d68a94c36ab3b4b51fcc3ca5a836003e3437a67c))
* pg_restore uses the single transaction flag ([0b833dd](https://github.com/bcgov/cas-ciip-portal/commit/0b833ddc2488c1ba2516cb5fdf33348fd4301cfb))


### Bug Fixes

* add enum operators for metabase ([2cc827e](https://github.com/bcgov/cas-ciip-portal/commit/2cc827ec830b4398fb16fe0eb97568034f3ac0d0))

## [2.10.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.8.0...v2.10.0) (2021-07-07)


### Features

* button wrapper with loading text ([1d23df7](https://github.com/bcgov/cas-ciip-portal/commit/1d23df7957775527ad1126e3dc4d255cda709cee))
* checking that there is data in the body ([5a4ceb3](https://github.com/bcgov/cas-ciip-portal/commit/5a4ceb3e8426760cdec23f4b388c0e030180df15))
* circleci job for smoke test ([5354d73](https://github.com/bcgov/cas-ciip-portal/commit/5354d736ec1a21d460bd92c1c321579995064e09))
* HOC that sets a loading state ([3c3c112](https://github.com/bcgov/cas-ciip-portal/commit/3c3c1123a51d4ac6d1b412efdca5fdb02cece043))
* k6 script to test mutations ([5bc3e08](https://github.com/bcgov/cas-ciip-portal/commit/5bc3e08c8b2916b9ae20b18b71a306cb673fccb7))
* mutations test setup script ([82f7815](https://github.com/bcgov/cas-ciip-portal/commit/82f7815673131736947c827d1d96e3fa0fcecbac))
* per vu iteration for spike testing ([3afceaf](https://github.com/bcgov/cas-ciip-portal/commit/3afceaf1e4d1c7d2be7a6eff9b50643d7e8d6b16))
* reporter smoke test ([142d35a](https://github.com/bcgov/cas-ciip-portal/commit/142d35a31af338bd58966c3252b26e361a7fe451))
* templating the k6 file to generate it with options ([0ec2e60](https://github.com/bcgov/cas-ciip-portal/commit/0ec2e60a01a5fbe095c86143763203e225bb8316))
* view to calculate incentives for all submitted applications ([6836d73](https://github.com/bcgov/cas-ciip-portal/commit/6836d73cdec071a9a836aad3a9aa2bcf197a388d))


### Bug Fixes

* add validation to user registration form ([a75b95a](https://github.com/bcgov/cas-ciip-portal/commit/a75b95aa109a999dfd3b1be01727d22be6af661d))
* archived Vented Natural Gas fuel should be mapped to Natural Gas ([66a315f](https://github.com/bcgov/cas-ciip-portal/commit/66a315f033d0d1f3b96acfbc9c3daf14d07cecbc))
* clicking on the icon sends the right status ([b366634](https://github.com/bcgov/cas-ciip-portal/commit/b366634aad242898eb4f4fa241acce0e9db8e2c1))
* incorrect usergroup selected with multi role ([bb498d2](https://github.com/bcgov/cas-ciip-portal/commit/bb498d2eb9e5fc623a55bea22adaf4e76f0030d2))
* mandatory products function ignores deleted product-naics relations ([af411eb](https://github.com/bcgov/cas-ciip-portal/commit/af411eb7dd91bbdd7c07560c08bcde7ff8f4d117))
* only fire mandatory products validation on published products ([f6c4f5a](https://github.com/bcgov/cas-ciip-portal/commit/f6c4f5ae58e7e8abaf64fc69bd1de1f5c7fd7030))
* retrieve bcghgid from facility table ([0fe532c](https://github.com/bcgov/cas-ciip-portal/commit/0fe532c744f54aadb62cb14a3d57dff85ac3bb64))
* shipit.yml indentation ([76685d0](https://github.com/bcgov/cas-ciip-portal/commit/76685d03da9e26f99f514035b5af5c037c4c49a7))
* unset debouncedMutation singleton when it is called ([5ab323b](https://github.com/bcgov/cas-ciip-portal/commit/5ab323bc14078031582f14da861a9d0f4165e158))
* use `sort -u` instead of `sort | uniq` ([930d359](https://github.com/bcgov/cas-ciip-portal/commit/930d359191e7e58875c69e8f6427c00653e62b90))
* use swrs_facility_id & reporting_year instead of swrs_report_id ([8ce6299](https://github.com/bcgov/cas-ciip-portal/commit/8ce629967946ca6d736adc7966c5ea2211387a3e))

## [2.9.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.8.0...v2.9.0) (2021-06-24)


### Features

* button wrapper with loading text ([1d23df7](https://github.com/bcgov/cas-ciip-portal/commit/1d23df7957775527ad1126e3dc4d255cda709cee))
* checking that there is data in the body ([5a4ceb3](https://github.com/bcgov/cas-ciip-portal/commit/5a4ceb3e8426760cdec23f4b388c0e030180df15))
* circleci job for smoke test ([5354d73](https://github.com/bcgov/cas-ciip-portal/commit/5354d736ec1a21d460bd92c1c321579995064e09))
* HOC that sets a loading state ([3c3c112](https://github.com/bcgov/cas-ciip-portal/commit/3c3c1123a51d4ac6d1b412efdca5fdb02cece043))
* k6 script to test mutations ([5bc3e08](https://github.com/bcgov/cas-ciip-portal/commit/5bc3e08c8b2916b9ae20b18b71a306cb673fccb7))
* mutations test setup script ([82f7815](https://github.com/bcgov/cas-ciip-portal/commit/82f7815673131736947c827d1d96e3fa0fcecbac))
* per vu iteration for spike testing ([3afceaf](https://github.com/bcgov/cas-ciip-portal/commit/3afceaf1e4d1c7d2be7a6eff9b50643d7e8d6b16))
* reporter smoke test ([142d35a](https://github.com/bcgov/cas-ciip-portal/commit/142d35a31af338bd58966c3252b26e361a7fe451))
* templating the k6 file to generate it with options ([0ec2e60](https://github.com/bcgov/cas-ciip-portal/commit/0ec2e60a01a5fbe095c86143763203e225bb8316))
* view to calculate incentives for all submitted applications ([6836d73](https://github.com/bcgov/cas-ciip-portal/commit/6836d73cdec071a9a836aad3a9aa2bcf197a388d))


### Bug Fixes

* add validation to user registration form ([a75b95a](https://github.com/bcgov/cas-ciip-portal/commit/a75b95aa109a999dfd3b1be01727d22be6af661d))
* archived Vented Natural Gas fuel should be mapped to Natural Gas ([66a315f](https://github.com/bcgov/cas-ciip-portal/commit/66a315f033d0d1f3b96acfbc9c3daf14d07cecbc))
* clicking on the icon sends the right status ([b366634](https://github.com/bcgov/cas-ciip-portal/commit/b366634aad242898eb4f4fa241acce0e9db8e2c1))
* incorrect usergroup selected with multi role ([bb498d2](https://github.com/bcgov/cas-ciip-portal/commit/bb498d2eb9e5fc623a55bea22adaf4e76f0030d2))
* mandatory products function ignores deleted product-naics relations ([af411eb](https://github.com/bcgov/cas-ciip-portal/commit/af411eb7dd91bbdd7c07560c08bcde7ff8f4d117))
* only fire mandatory products validation on published products ([f6c4f5a](https://github.com/bcgov/cas-ciip-portal/commit/f6c4f5ae58e7e8abaf64fc69bd1de1f5c7fd7030))
* retrieve bcghgid from facility table ([0fe532c](https://github.com/bcgov/cas-ciip-portal/commit/0fe532c744f54aadb62cb14a3d57dff85ac3bb64))
* shipit.yml indentation ([76685d0](https://github.com/bcgov/cas-ciip-portal/commit/76685d03da9e26f99f514035b5af5c037c4c49a7))
* unset debouncedMutation singleton when it is called ([5ab323b](https://github.com/bcgov/cas-ciip-portal/commit/5ab323bc14078031582f14da861a9d0f4165e158))
* use `sort -u` instead of `sort | uniq` ([930d359](https://github.com/bcgov/cas-ciip-portal/commit/930d359191e7e58875c69e8f6427c00653e62b90))

### [2.8.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.8.0...v2.8.1) (2021-06-14)


### Bug Fixes

* mandatory products function ignores deleted product-naics relations ([af411eb](https://github.com/bcgov/cas-ciip-portal/commit/af411eb7dd91bbdd7c07560c08bcde7ff8f4d117))
* only fire mandatory products validation on published products ([f6c4f5a](https://github.com/bcgov/cas-ciip-portal/commit/f6c4f5ae58e7e8abaf64fc69bd1de1f5c7fd7030))

## [2.8.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.7.0...v2.8.0) (2021-06-10)


### Features

* add @sentry/nextjs support ([db3cef2](https://github.com/bcgov/cas-ciip-portal/commit/db3cef2edda19fe88577f8b115498ef228bf4322))
* send server-side errors to sentry ([ea3858e](https://github.com/bcgov/cas-ciip-portal/commit/ea3858e186baa85ec08c92bc7197fcd608f7dc06))


### Bug Fixes

* add missing product fields to mandatory update mutation ([521662b](https://github.com/bcgov/cas-ciip-portal/commit/521662bf09d3370b4848790984dc09a65b6410d0))
* form width matches page regardless of content ([7a8b8cd](https://github.com/bcgov/cas-ciip-portal/commit/7a8b8cdf6ed9d2e6e17d8a205b50fdecbcc370ba))
* hide benchmark setting option if isCiipProduct=false ([4dee245](https://github.com/bcgov/cas-ciip-portal/commit/4dee245da2c2918ca40c0cb54ed9959730912d74))
* mandatory products only populate on non-deleted associations ([1c7823e](https://github.com/bcgov/cas-ciip-portal/commit/1c7823e0ad549d16e26cb87bf756925771819796))
* provide SUPPORT_EMAIL at compile time for 500 page prerendering ([ad0a00d](https://github.com/bcgov/cas-ciip-portal/commit/ad0a00d758f90beb10755d5b2b2b35520c6d91e4))

## [2.7.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.6.0...v2.7.0) (2021-06-03)


### Features

* label the link for mandatory products in admin dash ([a5444db](https://github.com/bcgov/cas-ciip-portal/commit/a5444db6cab284c44261fbafe2b862cd47718131))


### Bug Fixes

* analyst-facing 'organisation' refs --> 'operation' ([b28f4f1](https://github.com/bcgov/cas-ciip-portal/commit/b28f4f18852a1198ecb98b04344bc6b7d6b8a6e7))
* coalesce null fuel amounts to 0 & get units from ciip fuel table ([67139e3](https://github.com/bcgov/cas-ciip-portal/commit/67139e3b15157b4ba7e4cfc7af18ecc2174f4e3b))
* deleted naics code products dont show up on the form ([cdceb85](https://github.com/bcgov/cas-ciip-portal/commit/cdceb8502311aa15b2c4308f5b0888e7b5ba9b4d))
* do not fire trigger on submission of version 0 ([1ef9305](https://github.com/bcgov/cas-ciip-portal/commit/1ef930538321b95dcfe14def3f36d0511c0d4ed2))
* facilities applications are ordered by operator and facility name ([8d067e7](https://github.com/bcgov/cas-ciip-portal/commit/8d067e70922f727ea50107e86443551f9436228f))
* only fire trigger on change from draft to submitted ([3a4f140](https://github.com/bcgov/cas-ciip-portal/commit/3a4f14015e9be120b80615ba408e42ffa00fd6a4))
* remove erroneously created review steps for legacy applications ([6b1b8c9](https://github.com/bcgov/cas-ciip-portal/commit/6b1b8c9077d30b75cc458261b5d0d438a2c81b69))
* uncomment admin and analyst a11y tests ([0a0e4e9](https://github.com/bcgov/cas-ciip-portal/commit/0a0e4e9f0f5345cbd6e8f9c003a57df1b10c3063))

## [2.6.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.4.0...v2.6.0) (2021-05-27)


### Features

* add isMandatory to product schema ([c70f5bc](https://github.com/bcgov/cas-ciip-portal/commit/c70f5bc2032a2969cf3b8c4da08883e816eed086))
* add mandatory product label ([d617399](https://github.com/bcgov/cas-ciip-portal/commit/d61739977bfcf31bc7d8d5a6263812d78a8a38da))
* change names of ciip application tab titles ([da0e162](https://github.com/bcgov/cas-ciip-portal/commit/da0e162458ff5151fc2b4117b57770992359c053))
* custom field initializes formResult with mandatory products ([b53f86f](https://github.com/bcgov/cas-ciip-portal/commit/b53f86f320aa6dbd167b230a82d07d30c54c9f8c))
* custom ProductsArrayField overrides and renders ArrayField ([2561f0e](https://github.com/bcgov/cas-ciip-portal/commit/2561f0e92f124f49d26f161bb688f437528cbed9))
* link to program website on homepage and remove links to factsheet ([e9a79e8](https://github.com/bcgov/cas-ciip-portal/commit/e9a79e8425b2e084a6a6fe7d3a21a3137b68e007))
* product selection for mandatory products is read-only ([86ca822](https://github.com/bcgov/cas-ciip-portal/commit/86ca822d635a76b2122f7218eb687fd6ce5b631e))
* scrollable pre-submission application disclaimer with updated text ([fee4ab6](https://github.com/bcgov/cas-ciip-portal/commit/fee4ab68fffe2bf6ca25ffd2e7530528a22421c8))
* update interstitial consent text for new applications ([994aae8](https://github.com/bcgov/cas-ciip-portal/commit/994aae894d67e8b9214070a94125f49a82620490))
* update text on dashboard GGIRCS-2304 ([e296dba](https://github.com/bcgov/cas-ciip-portal/commit/e296dba2dfb108644324fbfec7ed9cde0036a473))
* updated email templates and subject lines ([ac33582](https://github.com/bcgov/cas-ciip-portal/commit/ac33582713cbc42d951da6b7669d54f6ac7febcd))
* use temp property on formData for template to hide remove button ([e39cb58](https://github.com/bcgov/cas-ciip-portal/commit/e39cb58a3d8fc486bef1335c60aaff1db600fac4))


### Bug Fixes

* allow searching by facility type (via enum) ([ed355bd](https://github.com/bcgov/cas-ciip-portal/commit/ed355bdd19cf7423fa172fda00a1e70aa04bf9c8))
* createProductMutation uses the product fragment ([684f75d](https://github.com/bcgov/cas-ciip-portal/commit/684f75d4eac482a3e6facb0d8774b8d55df355e8))
* don't use custom field for naics code in 2019 applicaions ([65f0c3a](https://github.com/bcgov/cas-ciip-portal/commit/65f0c3a39d219e37f376ad4cf372e0e443ef1947))
* ensure product units are part of the initialized mandatory products ([d24bc58](https://github.com/bcgov/cas-ciip-portal/commit/d24bc589d2c45ee67cbe9cc5afcb3f468631a0e7))
* excluding fuels reporting a zero quantity from validation ([af1a153](https://github.com/bcgov/cas-ciip-portal/commit/af1a153b1e121dd8a71ac700c7a07bdf95aadb5e))
* fix broken links on footer copyright page ([5cc0f8d](https://github.com/bcgov/cas-ciip-portal/commit/5cc0f8d47736777a62fc117e00c3ba8b58b06bea))
* fix typo on application review page incentive formula GGIRCS-2209 ([f5853dc](https://github.com/bcgov/cas-ciip-portal/commit/f5853dcbd402bebdc612fd38ed2ba3ef37445fa7))
* fixing double-margin around flex table cell ([503e030](https://github.com/bcgov/cas-ciip-portal/commit/503e030ab52aa42760d03eb6e4a1bd5ee01490cf))
* link to regulation from missing swrs warning should open in new tab ([aa9279b](https://github.com/bcgov/cas-ciip-portal/commit/aa9279b7d6bf38fa953e8a8c0521634fe2e1e053))
* onComplete retrieves the form data properly ([b5b5e7e](https://github.com/bcgov/cas-ciip-portal/commit/b5b5e7e9c89c6cae6beb1749f5bc8a94d34b29f4))
* only allow CORS for the Analytics script ([e306b86](https://github.com/bcgov/cas-ciip-portal/commit/e306b869adfbb5ac3b0d5e0c3a57edb26dce43df))
* perform home page redirection on server to prevent content flashing ([5dedf9d](https://github.com/bcgov/cas-ciip-portal/commit/5dedf9d44dd5bc118525f2c1b49eddec3523d0eb))
* prevent flash of Resume Latest Draft on Revise click ([b2033ed](https://github.com/bcgov/cas-ciip-portal/commit/b2033eda13e607aed5135bc3d0986219bd159fbb))
* productsByNaicsCode may be undefined ([e7dd429](https://github.com/bcgov/cas-ciip-portal/commit/e7dd4295607ed449f5c35fe6fb7e354ff24547fa))
* re-activate deadline above login/register button ([c45fbde](https://github.com/bcgov/cas-ciip-portal/commit/c45fbdedd6f2825620ac15eef4ca18e5f4fdc04b))
* re-add https links after they went missing in conflict resolution ([08150e5](https://github.com/bcgov/cas-ciip-portal/commit/08150e52b15f7ffe32039442619479844e12c926))
* remove link to defunct PDF from README ([8c00945](https://github.com/bcgov/cas-ciip-portal/commit/8c009455842ca3e18b0510e4e28a73258a3b0a7d))
* reset form state when changing form id ([3721ef8](https://github.com/bcgov/cas-ciip-portal/commit/3721ef84ad035c34f92ab79ef252e8eac4658de4))
* return organisationId on request access to filter the list ([fc9f9e1](https://github.com/bcgov/cas-ciip-portal/commit/fc9f9e1511a7557260e4678c07b01d180639e2d4))
* show (correct) version number when viewing apps with later drafts ([79a14fa](https://github.com/bcgov/cas-ciip-portal/commit/79a14fad7e5345e21124dbd93aa19c709e185a6c))
* the display only filter doesn't render a search box ([80cab71](https://github.com/bcgov/cas-ciip-portal/commit/80cab71d664663dea8386727074afe0b0766fa89))
* typo in error toast message ([e672553](https://github.com/bcgov/cas-ciip-portal/commit/e672553b6f650a7bfb81da411cf32ca6f92b5294))
* update prod data file for ciip_application_wizard ([40079db](https://github.com/bcgov/cas-ciip-portal/commit/40079dba21ec64302f81cc5d93aa71777656dcc9))
* use clearer language for secondary contact label GGIRCS-2450 ([e0ee923](https://github.com/bcgov/cas-ciip-portal/commit/e0ee923c5633bc5eae304c075e008d0c0c87335a))
* use correct condition to fix 2457 ([b407468](https://github.com/bcgov/cas-ciip-portal/commit/b40746825b50e06b6cf252fc64bb89fc8d89234a))

## [2.5.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.4.0...v2.5.0) (2021-05-21)


### Features

* add isMandatory to product schema ([c70f5bc](https://github.com/bcgov/cas-ciip-portal/commit/c70f5bc2032a2969cf3b8c4da08883e816eed086))
* add mandatory product label ([d617399](https://github.com/bcgov/cas-ciip-portal/commit/d61739977bfcf31bc7d8d5a6263812d78a8a38da))
* change names of ciip application tab titles ([da0e162](https://github.com/bcgov/cas-ciip-portal/commit/da0e162458ff5151fc2b4117b57770992359c053))
* custom field initializes formResult with mandatory products ([b53f86f](https://github.com/bcgov/cas-ciip-portal/commit/b53f86f320aa6dbd167b230a82d07d30c54c9f8c))
* custom ProductsArrayField overrides and renders ArrayField ([2561f0e](https://github.com/bcgov/cas-ciip-portal/commit/2561f0e92f124f49d26f161bb688f437528cbed9))
* link to program website on homepage and remove links to factsheet ([e9a79e8](https://github.com/bcgov/cas-ciip-portal/commit/e9a79e8425b2e084a6a6fe7d3a21a3137b68e007))
* product selection for mandatory products is read-only ([86ca822](https://github.com/bcgov/cas-ciip-portal/commit/86ca822d635a76b2122f7218eb687fd6ce5b631e))
* scrollable pre-submission application disclaimer with updated text ([fee4ab6](https://github.com/bcgov/cas-ciip-portal/commit/fee4ab68fffe2bf6ca25ffd2e7530528a22421c8))
* update interstitial consent text for new applications ([994aae8](https://github.com/bcgov/cas-ciip-portal/commit/994aae894d67e8b9214070a94125f49a82620490))
* update text on dashboard GGIRCS-2304 ([e296dba](https://github.com/bcgov/cas-ciip-portal/commit/e296dba2dfb108644324fbfec7ed9cde0036a473))
* updated email templates and subject lines ([ac33582](https://github.com/bcgov/cas-ciip-portal/commit/ac33582713cbc42d951da6b7669d54f6ac7febcd))
* use temp property on formData for template to hide remove button ([e39cb58](https://github.com/bcgov/cas-ciip-portal/commit/e39cb58a3d8fc486bef1335c60aaff1db600fac4))


### Bug Fixes

* ensure product units are part of the initialized mandatory products ([d24bc58](https://github.com/bcgov/cas-ciip-portal/commit/d24bc589d2c45ee67cbe9cc5afcb3f468631a0e7))
* fix typo on application review page incentive formula GGIRCS-2209 ([f5853dc](https://github.com/bcgov/cas-ciip-portal/commit/f5853dcbd402bebdc612fd38ed2ba3ef37445fa7))
* productsByNaicsCode may be undefined ([e7dd429](https://github.com/bcgov/cas-ciip-portal/commit/e7dd4295607ed449f5c35fe6fb7e354ff24547fa))
* re-add https links after they went missing in conflict resolution ([08150e5](https://github.com/bcgov/cas-ciip-portal/commit/08150e52b15f7ffe32039442619479844e12c926))
* update prod data file for ciip_application_wizard ([40079db](https://github.com/bcgov/cas-ciip-portal/commit/40079dba21ec64302f81cc5d93aa71777656dcc9))
* use clearer language for secondary contact label GGIRCS-2450 ([e0ee923](https://github.com/bcgov/cas-ciip-portal/commit/e0ee923c5633bc5eae304c075e008d0c0c87335a))

## [2.4.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.3.1...v2.4.0) (2021-05-12)


### Features

* add emission_category_missing_fuel validation function ([2790155](https://github.com/bcgov/cas-ciip-portal/commit/2790155281e7b8ff4b2f751ff8476568b79efcca))
* add no_reported_ciip_product validation function ([7787655](https://github.com/bcgov/cas-ciip-portal/commit/77876557b2227cedb644084d072d8f9f5cde26d0))
* add primary and secondary contacts to admin form ([23ea331](https://github.com/bcgov/cas-ciip-portal/commit/23ea331507fe26f7c27889acf2b6e588200419f6))
* aggregate values for Facility Total row ([c4b855a](https://github.com/bcgov/cas-ciip-portal/commit/c4b855a649cae3c90509bd82f77f088851387e71))
* basic modal to make a decision, request changes + shared modal CSS ([f31364d](https://github.com/bcgov/cas-ciip-portal/commit/f31364dd086850d579894bd4086327e7edb830d9))
* Calculated & Maximum incentive columns use CAD currency format ([1bd5e24](https://github.com/bcgov/cas-ciip-portal/commit/1bd5e24e2dfc528cab0b8b15d3e1a71084b86bc1))
* ciip-swrs comparing function ignores venting and flaring ([1b83829](https://github.com/bcgov/cas-ciip-portal/commit/1b83829ca4be49f893d9aceb1d5f8483f852e22d))
* complete page links to application summary if query param ([07e8ff7](https://github.com/bcgov/cas-ciip-portal/commit/07e8ff7149441f9237005e8b336986675d372113))
* computed column returning true if a fuel is carbon taxed ([6a2b187](https://github.com/bcgov/cas-ciip-portal/commit/6a2b1874f6e4c564cd7512261298c26887669882))
* create admin-2020 form schema ([12854a0](https://github.com/bcgov/cas-ciip-portal/commit/12854a05cb260208626806bf99e7c83d2922a127))
* create an index for all fkeys currently missing an index ([562f27b](https://github.com/bcgov/cas-ciip-portal/commit/562f27b18d8ef4e69e3a919f1ce02b3a0316b4d2))
* creating validation frontend component ([af4405f](https://github.com/bcgov/cas-ciip-portal/commit/af4405fe835be5b670c4b2243c30e19dc8b65e27))
* decision button appears activated once review steps are complete ([981435b](https://github.com/bcgov/cas-ciip-portal/commit/981435b384fbfcb50ea38ff386bfffccaff1dec1))
* decision modal supports reverting the decision ([6ace21b](https://github.com/bcgov/cas-ciip-portal/commit/6ace21b2bed75a6f392d12c6be7f0946f18e9fad))
* Incentive ratio on right of Payment Allocation ([1da2508](https://github.com/bcgov/cas-ciip-portal/commit/1da25085ad82e579647bc5a4dfbeff523ee943cd))
* remove bc ghg id from admin-2020 form ([38bb187](https://github.com/bcgov/cas-ciip-portal/commit/38bb1877b3a3773a713181a5c72462aab3a35bfa))
* remove LFO and EIO from available facility types ([994e965](https://github.com/bcgov/cas-ciip-portal/commit/994e96516e67df61605188505dd07714e0ce6a60))
* show BCGHG ID, and version number when revised at top ([2f8498d](https://github.com/bcgov/cas-ciip-portal/commit/2f8498d645a46ac08000b5f205192d25e8ab2d1f))
* Threshold chart column is removed ([f3845c1](https://github.com/bcgov/cas-ciip-portal/commit/f3845c134b80753ee4fdf36038cd3f4c86d931c8))
* update ciip_carbon_tax_calculation view to use new ct calculation ([46dd65b](https://github.com/bcgov/cas-ciip-portal/commit/46dd65b8da3d139101b9a1a74cd34e2b33a944d9))
* use difference with march 2018 fuel charge to get CIIP CT ([07d13a2](https://github.com/bcgov/cas-ciip-portal/commit/07d13a2a4d5bd5591051959f34ef3269e7c53859))
* use query params for application review page ([709f6dd](https://github.com/bcgov/cas-ciip-portal/commit/709f6dd6ce5872d8f40113bffd4cef8052895ac8))
* validation function for mandatory products ([97e92b1](https://github.com/bcgov/cas-ciip-portal/commit/97e92b185d434c43e98c0f85b9e43ce871135eb3))
* validation function testing if reported fuels match swrs ([e92b932](https://github.com/bcgov/cas-ciip-portal/commit/e92b93208247bcde111f68193db4762defd820ad))
* validaton on swrs emissions sqitch files ([95ee82b](https://github.com/bcgov/cas-ciip-portal/commit/95ee82b5cdbd2148e728770a065a3d5f17ea7b2c))


### Bug Fixes

* escape unsafe html in email templates ([52fabc6](https://github.com/bcgov/cas-ciip-portal/commit/52fabc62df675a851b6dcbfc7d796fd37566ab43))
* remove validation function when reverting ([5f4bb0d](https://github.com/bcgov/cas-ciip-portal/commit/5f4bb0d3a31a7976c1cf6236232c0d9e7a62bb8d))

### [2.3.1](https://github.com/bcgov/cas-ciip-portal/compare/v2.3.0...v2.3.1) (2021-04-29)


### Bug Fixes

* reset swrs_report_version to 1 ([8fcc221](https://github.com/bcgov/cas-ciip-portal/commit/8fcc22134ed3c1f3bfa00fb90628c416bf9cbd9b))
* update swrs_report_version on update of version 0 ([17ee5be](https://github.com/bcgov/cas-ciip-portal/commit/17ee5be8f4f29c7b45e364263382967177fc9002))

## [2.3.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.2.0...v2.3.0) (2021-04-28)


### Features

* add commputed column to retrieve production data ([2388a54](https://github.com/bcgov/cas-ciip-portal/commit/2388a5430bb931b4ad174c3c35d2de2d48ad9ba3))
* add computed column to retrieve emission data ([d3ef5bc](https://github.com/bcgov/cas-ciip-portal/commit/d3ef5bc86443a24f7b1408ce4d7c071bb95254f4))
* add computed column to retrieve fuel data ([0218d8d](https://github.com/bcgov/cas-ciip-portal/commit/0218d8da5192560455bb50ac4a6bb7545a2a7e43))


### Bug Fixes

* only check application window is open for version 1 of application ([b25c02a](https://github.com/bcgov/cas-ciip-portal/commit/b25c02a325bb32af34ae8b7e08d9935df86aefd0))

## [2.2.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.1.0...v2.2.0) (2021-04-28)


### Features

* add computed column for total ciip emissions ([06c14ab](https://github.com/bcgov/cas-ciip-portal/commit/06c14abe1eafec73455b3f796f4a5e621f08ca0a))
* add is_ciip_emission column to gas table ([7b7fd54](https://github.com/bcgov/cas-ciip-portal/commit/7b7fd547c64cf499470933c636dc384a4548dece))
* add review comment modal saves new comments ([b848074](https://github.com/bcgov/cas-ciip-portal/commit/b8480740035c18119fcde147eb0cb96a51f219e3))
* adding new component for the progress indicator ([986cba5](https://github.com/bcgov/cas-ciip-portal/commit/986cba5c740cda5e24065af4010fe2233d17cf8d))
* basic review step selector opens that step in sidebar ([0016571](https://github.com/bcgov/cas-ciip-portal/commit/00165717e779d4709fef16b8d2621ccf03f3d057))
* confirm marking step complete when there are unresolved comments ([09abe5b](https://github.com/bcgov/cas-ciip-portal/commit/09abe5baf703ba8f4234f0506d0f717aab258007))
* enable admins to change decision, preserving current functionality ([3596c7e](https://github.com/bcgov/cas-ciip-portal/commit/3596c7e91800fd9d616dafdbc317891216a50338))
* enable HelpButton for reporters ([a0383c8](https://github.com/bcgov/cas-ciip-portal/commit/a0383c82beb3e27fd748afe6ef6000524a045683))
* ensure decision cannot be changed if a newer draft exists ([b0cfa27](https://github.com/bcgov/cas-ciip-portal/commit/b0cfa27ddf0cdad578c6fc63c3c4d16e21c2e0aa))
* finalize modification of review once decision has been made ([5ee53aa](https://github.com/bcgov/cas-ciip-portal/commit/5ee53aafdfc51e8cb642a7cc149b8ff44ab048e3))
* import facility bc ghg id from facility table ([d13496e](https://github.com/bcgov/cas-ciip-portal/commit/d13496e73512f8fedc8d48c3322135878f7d8c6b))
* migration removing orgs and facilities with no swrs equivalent ([cb6e11a](https://github.com/bcgov/cas-ciip-portal/commit/cb6e11a462d6328757a3de2e1565da5a1f429521))
* progress step indicator formatting and coloring ([dfd5d0c](https://github.com/bcgov/cas-ciip-portal/commit/dfd5d0cce090cd2e899354024868ea3f1e66be01))
* progress step indicator has a title and a light badge style ([9d6aae8](https://github.com/bcgov/cas-ciip-portal/commit/9d6aae8a2bd1bc19e605c0d61c75f05156071442))
* remove Feedback from the footer ([eb41d65](https://github.com/bcgov/cas-ciip-portal/commit/eb41d65612e2a67771ddb1d8b9c12f3709fac542))
* rename "report a problem" field to "add a comment" ([31f0485](https://github.com/bcgov/cas-ciip-portal/commit/31f04859fcc2010d3c9aed5d0c217f8bf65e97ad))
* render comment icon in selector if step is incomplete ([6e4710c](https://github.com/bcgov/cas-ciip-portal/commit/6e4710c909c855e5ffffd6461264dee8eb00f8ee))
* reorder admin form to allow quicker viewing of facility info ([44a1bf4](https://github.com/bcgov/cas-ciip-portal/commit/44a1bf41322dac75a90ccbad37323cfb4b9a5b02))
* show completed status of review steps in selector ([c105ad7](https://github.com/bcgov/cas-ciip-portal/commit/c105ad751205f03f735f502749a3484ebb3f9ac4))
* show decision status on 'make decision or request changes' button ([11c72fb](https://github.com/bcgov/cas-ciip-portal/commit/11c72fb722b118a79fe54f46dd8dde66bd6da566))
* step indicator on reporter facilities page ([f8d10b9](https://github.com/bcgov/cas-ciip-portal/commit/f8d10b9c478802f582df54f5cce22dd80de9f4d7))
* update review_step name from 'other' to 'application' ([90ce2f5](https://github.com/bcgov/cas-ciip-portal/commit/90ce2f5e2238193d4f08b3792352cec4b12beed5))


### Bug Fixes

* a11y contrast issue on -info buttons and badges ([7653ca0](https://github.com/bcgov/cas-ciip-portal/commit/7653ca073df7e9e1d707d2d079f53ff8c0d85266))
* add missing getInitialProps on organisation-request page ([941b1aa](https://github.com/bcgov/cas-ciip-portal/commit/941b1aa8e63accec164fb39468bcfd7eb7221cbd))
* add SUPPORT_EMAIL env var to circleCI ([a817d45](https://github.com/bcgov/cas-ciip-portal/commit/a817d45006f3b4bdc0cd066b0625540a4988b91e))
* admin env var email is just email ([ba47bbf](https://github.com/bcgov/cas-ciip-portal/commit/ba47bbf26671578d49e7d502e0b8b40da06a187b))
* allow ISearchOptionSettings to be passed to EnumFilter ([dcc092c](https://github.com/bcgov/cas-ciip-portal/commit/dcc092c4925c90e84e5e09aac4cd8d951f03b973))
* facilityBcghgid includes and enum sort false ([518cf12](https://github.com/bcgov/cas-ciip-portal/commit/518cf12339a1dee047b986204f06795d1850f32e))
* link to contact us page ([115cc31](https://github.com/bcgov/cas-ciip-portal/commit/115cc31dcef754579b67add9f71d2892a44d5b2a))
* restore rendering of fields with disableRenderingIfEmpty ui option ([94db02e](https://github.com/bcgov/cas-ciip-portal/commit/94db02e57fd3c68be5b4b9d1304cfc4a6bb90405))
* update admin subject line ([4873bf8](https://github.com/bcgov/cas-ciip-portal/commit/4873bf8e73daa697876fc6d923ea560a6d0a2817))
* update circleci env vars ([88a849f](https://github.com/bcgov/cas-ciip-portal/commit/88a849febb44fbf097480fcbe41e66be07bec0a1))
* update contact us page email locations ([9dfd397](https://github.com/bcgov/cas-ciip-portal/commit/9dfd397a258542d55b2f1936e8a4819afc724d8b))
* update refresh_swrs_version_data function to key on swrs_report_id ([2043f52](https://github.com/bcgov/cas-ciip-portal/commit/2043f521d0e9121e69756dc4e3c194ad6c2670e5))
* update sender name ([057dae7](https://github.com/bcgov/cas-ciip-portal/commit/057dae7e6ccd213422f9752f5c3a77415dbc3d3b))
* update snapshot ([64d0b82](https://github.com/bcgov/cas-ciip-portal/commit/64d0b825b0575329f9289e5d8911706dcc185b2a))
* update snapshots ([9085339](https://github.com/bcgov/cas-ciip-portal/commit/908533972bcb8d638a669945577f287116794d78))
* update snapshots ([0b9f754](https://github.com/bcgov/cas-ciip-portal/commit/0b9f754437b2c1d092e7679da5b1a73aeb89f916))
* use admin email env var ([d4a56d2](https://github.com/bcgov/cas-ciip-portal/commit/d4a56d254a7d718dd9ae225c147ca3837b80cac8))
* use correct column name when sorting products by date ([8252e09](https://github.com/bcgov/cas-ciip-portal/commit/8252e094de478e6cab865596ca5246ae288f9ffb))
* use email env variables ([cfa9d77](https://github.com/bcgov/cas-ciip-portal/commit/cfa9d7735867930db44ff80ed762035d4241c84c))

## [2.1.0](https://github.com/bcgov/cas-ciip-portal/compare/v2.0.0...v2.1.0) (2021-04-21)


### Features

* add and update snapshots ([610608a](https://github.com/bcgov/cas-ciip-portal/commit/610608aff6f5edebdb6cb85b95a5b4327984d48d))
* add aria-label to dropdown ([cac246b](https://github.com/bcgov/cas-ciip-portal/commit/cac246b9b572f2b6939bec15c188c16090f48783))
* add computed column to retrive naics code ([7376d92](https://github.com/bcgov/cas-ciip-portal/commit/7376d92bcbcb9ce8546e2bce553a01b0e14afdb9))
* add user icon dropdown button desktop ([a50b8c3](https://github.com/bcgov/cas-ciip-portal/commit/a50b8c3909cd7a2b95d6508d46577b7d09d58418))
* adjust icon ([2e175a7](https://github.com/bcgov/cas-ciip-portal/commit/2e175a75eb743fa4b898dbf938ff27d6d0aaa9f5))
* application disclaimer page redirects to 404 if data is missing ([123bdcb](https://github.com/bcgov/cas-ciip-portal/commit/123bdcb3fcd303c7bc1c0b01a4f4abf799f85da4))
* change desktop icon appearance ([bc9bb18](https://github.com/bcgov/cas-ciip-portal/commit/bc9bb18015b60c094867b3ba19c80ca9fceb73be))
* dropdown check ([9e1f308](https://github.com/bcgov/cas-ciip-portal/commit/9e1f30844b4b91a2e6f39747d78ffaebc55d2a07))
* emission category shows a text-only element when deleted_by is set ([95ea889](https://github.com/bcgov/cas-ciip-portal/commit/95ea8897d900d47aedfdcc64564d3a3df98f44a4))
* facilities page defaults to the current reporting year ([c866ef9](https://github.com/bcgov/cas-ciip-portal/commit/c866ef90c11f2de81368f943055f674703c44912))
* filter Form product dropdown by naics code ([cef66a7](https://github.com/bcgov/cas-ciip-portal/commit/cef66a71e8842a0263538dbd70a2d5575d7d43ee))
* filtered product fragment ([e54e0c4](https://github.com/bcgov/cas-ciip-portal/commit/e54e0c426c9a1c5a27333a54518cf6db1bc1fac5))
* improve tests ([01a16f5](https://github.com/bcgov/cas-ciip-portal/commit/01a16f557aa418a87167f6443d059c1f11744378))
* keycode api update ([a4857cf](https://github.com/bcgov/cas-ciip-portal/commit/a4857cf792abb09c8d5e2575ca5e4cd38af8d16e))
* mobile button fix ([99d2d36](https://github.com/bcgov/cas-ciip-portal/commit/99d2d362ba9e8dcebb84292b48bd01e4966af7e8))
* mobile icon style ([6e3de09](https://github.com/bcgov/cas-ciip-portal/commit/6e3de098bb1d55909cafdd3497c0b81870d529d6))
* mobile styles looking ok ([6895df7](https://github.com/bcgov/cas-ciip-portal/commit/6895df7eb08728253e04fdc7c43ceaa4f22e70f0))
* new application disclaimer uses nextjs dynamic routes ([fde2a56](https://github.com/bcgov/cas-ciip-portal/commit/fde2a566b9818b6f0c93c2633b859872a86ab939))
* not logged in mobile view ([8447f2f](https://github.com/bcgov/cas-ciip-portal/commit/8447f2f271c0e019f210cde64bbe576fbe725d8c))
* refactor logged in header menu to container ([3a110c5](https://github.com/bcgov/cas-ciip-portal/commit/3a110c56a3b68849d1fe4f5d98f9b2ebd99448d6))
* remove outdated media query ([848f259](https://github.com/bcgov/cas-ciip-portal/commit/848f2595540e03faa081f232d40d2299b9dd8269))
* reorganise css ([62cb82f](https://github.com/bcgov/cas-ciip-portal/commit/62cb82f07b0912e04687b03c174138d2750fe087))
* review updates ([f3cc819](https://github.com/bcgov/cas-ciip-portal/commit/f3cc8190aaf6ca65f3524b77cab77e607a9141b9))
* setting a deleted_at value for the 'other' emission category ([3e3e7ca](https://github.com/bcgov/cas-ciip-portal/commit/3e3e7caf0c9f3d9d27bb31e923ce22df994d48c7))
* show correct data if the application is in review ([4c41876](https://github.com/bcgov/cas-ciip-portal/commit/4c4187630053247ab1cbdfac95d73d5eda307b78))
* show warning if product not in naics code ([44f0bdf](https://github.com/bcgov/cas-ciip-portal/commit/44f0bdfefc93db0627aa7aaff97b509fcc283402))
* style update ([2654b8f](https://github.com/bcgov/cas-ciip-portal/commit/2654b8f2a6c1b094588ae5692e86fa0e2fb041e9))
* update cypress command ([9336940](https://github.com/bcgov/cas-ciip-portal/commit/93369403db62fd8b450524d982007f12f5a78b34))
* update Header snapshot ([343df49](https://github.com/bcgov/cas-ciip-portal/commit/343df490ee4afa4c2bcc4b3def475a7a047c26bf))
* update Header snapshot ([ab8a95a](https://github.com/bcgov/cas-ciip-portal/commit/ab8a95ac757da27d21139c830a3944def139fba3))
* update snapshots ([2344f49](https://github.com/bcgov/cas-ciip-portal/commit/2344f49f8db0b31605ddad2bf77c475d1bdf58d7))
* update styles ([2df49a6](https://github.com/bcgov/cas-ciip-portal/commit/2df49a636091f2f177385f0bfba56e73324fd261))
* update test check ([dd1ec8b](https://github.com/bcgov/cas-ciip-portal/commit/dd1ec8b34a53c5619d4f86ce87800efd33acfece))
* use updated application disclaimer route in `ApplyButtonContainer` ([f8b1e74](https://github.com/bcgov/cas-ciip-portal/commit/f8b1e740f45c3c6bdcd59fd05d70d3db2f392f43))


### Bug Fixes

* improve email validation message ([b2b4272](https://github.com/bcgov/cas-ciip-portal/commit/b2b42728074c9618da2efd4fa719dc5e5ba208b3))
* input focus bug (use formContext) ([7403ab1](https://github.com/bcgov/cas-ciip-portal/commit/7403ab1d0d726054eeeb020736f6b677269aa607))
* undo debugging ([2ebca87](https://github.com/bcgov/cas-ciip-portal/commit/2ebca8744231054625e00194417e99c7a560ade7))
* update cypress selector ([e63fc50](https://github.com/bcgov/cas-ciip-portal/commit/e63fc50f0c8ccba94d67af56312ff066aebcd974))

## [2.0.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.18.0...v2.0.0) (2021-04-14)


### Features

* add -r (refreshSwrsVersions) flag to deploy-data cronjob ([cc60de7](https://github.com/bcgov/cas-ciip-portal/commit/cc60de774d8096605acbfb98316a55cf56ff140f))
* add / update comments in refresh function ([85dc622](https://github.com/bcgov/cas-ciip-portal/commit/85dc622e273c72479375a29e4d882d335e18cd10))
* add a capitalization text transform and tests for these utilities ([ce0194c](https://github.com/bcgov/cas-ciip-portal/commit/ce0194ca44d3c3735097b64800a6da558e317612))
* add application and facility info to application page ([d7e9c11](https://github.com/bcgov/cas-ciip-portal/commit/d7e9c1179c9fd5f5c8b19a530c9c1e08613028b1))
* add ciip_sector column to naics_code table ([0d42c8e](https://github.com/bcgov/cas-ciip-portal/commit/0d42c8ebe0f71cf3d3f04c1f1b739111b315efa6))
* add computed columns for product search/sort ([cf821c1](https://github.com/bcgov/cas-ciip-portal/commit/cf821c1bda5c4fe1ed4f196209d26bfe0bcee623))
* add computed columns needed for application filtering ([a1b049e](https://github.com/bcgov/cas-ciip-portal/commit/a1b049e54fec70ee6a9b21179ffb8dcd0bc10c96))
* add create mutation ([e5f128b](https://github.com/bcgov/cas-ciip-portal/commit/e5f128bf6a5a0892cc12bce880b3e90190ea166b))
* add custom create_fuel_naics_mutation ([6fced1c](https://github.com/bcgov/cas-ciip-portal/commit/6fced1c48edcf729340aed14860825bd6d15117c))
* add custom upsert mutation ([ad267ad](https://github.com/bcgov/cas-ciip-portal/commit/ad267ada6bb965eaf49af4d36157d25d52e90226))
* add default_form_result column to form_json table ([3d7ef7c](https://github.com/bcgov/cas-ciip-portal/commit/3d7ef7c7efd2eef786e92150df2fda7dcfe3a287))
* add delete confirmation modal ([9037c49](https://github.com/bcgov/cas-ciip-portal/commit/9037c49ea54a7b20647269bfb22a5ca9c7ffd7ce))
* add enum type review_step_name ([daa9d89](https://github.com/bcgov/cas-ciip-portal/commit/daa9d89adfe0cf3364a4d00a588ed7b01c4f8b15))
* add extraFilters for FilterableTableLayout ([7129bfe](https://github.com/bcgov/cas-ciip-portal/commit/7129bfe0431ed5fb267d2ca8ff3c1d51b65db315))
* add filterable search UI components ([5927c83](https://github.com/bcgov/cas-ciip-portal/commit/5927c838de1a53d28bb03c509ca8fab689322737))
* add fuel-naics through-table ([7409443](https://github.com/bcgov/cas-ciip-portal/commit/7409443ea088a30dce83489c86037865794e5272))
* add iterative validation function ([8b788f3](https://github.com/bcgov/cas-ciip-portal/commit/8b788f3705852b809cc0239731f633d2c7cb7fc9))
* add max_results selection dropdown ([57d4005](https://github.com/bcgov/cas-ciip-portal/commit/57d400594edbb1f331f46ddf8b98549fed4c7624))
* add naics table & custom mutation ([f8b713f](https://github.com/bcgov/cas-ciip-portal/commit/f8b713fc325460bb9893a358ee7e9713ba69c70b))
* add NaicsCodeTableRow fragment container ([fb89d68](https://github.com/bcgov/cas-ciip-portal/commit/fb89d68508de99cafc8a2d78eb3242304e6e564b))
* add optional fixed header to default layout ([47a9c17](https://github.com/bcgov/cas-ciip-portal/commit/47a9c17b8735cd56a546e557660fc2cf0bd96b82))
* add pagination component ([00b1cb0](https://github.com/bcgov/cas-ciip-portal/commit/00b1cb080f7e87998736a2d44130548b682378ba))
* add postgraphile filter plugin ([7941a03](https://github.com/bcgov/cas-ciip-portal/commit/7941a03b3773ef619d9d90257813ae483bdd391e))
* add product_naics relationship table ([4fe4942](https://github.com/bcgov/cas-ciip-portal/commit/4fe4942a788e1be4f708cb89384d82e16f340fdf))
* add redirect from view-application to new application...view url ([32375ea](https://github.com/bcgov/cas-ciip-portal/commit/32375ea3014cd699550246cb5c40d268343e79bd))
* add refres_swrs_version_data db function ([83e1785](https://github.com/bcgov/cas-ciip-portal/commit/83e1785554ad9e8bcf6098bd6a19479d45de6e61))
* add refreshSwrsVersion target to shell script ([179c40a](https://github.com/bcgov/cas-ciip-portal/commit/179c40ad2457f9ba26f5d2a3fa4a0e4261710808))
* add review comments to application summary page ([09ac44f](https://github.com/bcgov/cas-ciip-portal/commit/09ac44f709cc527d31f3c184757ac41494bd2963))
* add review_step table ([c1170c4](https://github.com/bcgov/cas-ciip-portal/commit/c1170c4dbdd197e37e19fb60e7b7eb85835c7a8b))
* add RLS policies for review_step_name table ([71c3cd9](https://github.com/bcgov/cas-ciip-portal/commit/71c3cd964df0dceefdef35c2d24bf5c6aa2cef84))
* add skeleton naics code pages ([a9ea206](https://github.com/bcgov/cas-ciip-portal/commit/a9ea20626f15963ed7de3339f1b39028148b0fbb))
* add trigger_function to create/refresh review_step ([9fa2c21](https://github.com/bcgov/cas-ciip-portal/commit/9fa2c2103558adbf7c8f9cea7d559ce034b540ab))
* add validation Alert to summary page ([ee172e3](https://github.com/bcgov/cas-ciip-portal/commit/ee172e3c78d668de39172f315a1d52212425f05e))
* add validation function table ([28d4b1c](https://github.com/bcgov/cas-ciip-portal/commit/28d4b1c4d5b4d82f6f21bc67ffa13729e3ad1794))
* add validation result type ([8757a67](https://github.com/bcgov/cas-ciip-portal/commit/8757a67c01f5dd964843dfebbe42d669a812f831))
* adding a comments column to the fuel table ([0c6f474](https://github.com/bcgov/cas-ciip-portal/commit/0c6f474473bfdee6f9287f96189b3497bde0dc17))
* adding form configuration dashboard card ([ebecd02](https://github.com/bcgov/cas-ciip-portal/commit/ebecd02aa9b1c392a56fff4e7b5e37bb86339626))
* adding navigation links ([8c8c173](https://github.com/bcgov/cas-ciip-portal/commit/8c8c1731c3e25630cd5eb607292e2761b40ad201))
* adding pagination query items to organisations ([bd9acc8](https://github.com/bcgov/cas-ciip-portal/commit/bd9acc86f386235ba24704312dc6ba85a615b349))
* adding pagination to the organisation request table ([a3b9ab2](https://github.com/bcgov/cas-ciip-portal/commit/a3b9ab2915097944124781961440a9cb59df064e))
* administration form displays a dropdown list of NAICS codes ([349b679](https://github.com/bcgov/cas-ciip-portal/commit/349b679e4a58649e83c611a029e0303554e023f0))
* alert similar to products if the existing naics code is not found ([1cc5c6d](https://github.com/bcgov/cas-ciip-portal/commit/1cc5c6dbc73210f1685e0dd1a3b516124b76196a))
* allow 'delete' on naics codes ([4b5b310](https://github.com/bcgov/cas-ciip-portal/commit/4b5b3104b60f5177068b233de77843de95ad76c5))
* allowed products list ([fe11950](https://github.com/bcgov/cas-ciip-portal/commit/fe11950193b7c7b498d45f92de6fa58f4fac0e96))
* allowing mailhog pod to get connections in ([dde051f](https://github.com/bcgov/cas-ciip-portal/commit/dde051f4b1e7d2e51d77a9ca2222a5f089b7dca2))
* analyst review sidebar layout ([a66cf66](https://github.com/bcgov/cas-ciip-portal/commit/a66cf66bd6e2c4c0b0f67ff8831b2401ecff7e9e))
* application policies doesnt add certifier policy ([5442a91](https://github.com/bcgov/cas-ciip-portal/commit/5442a91e50adfacd00255bec296f05a56ba53d94))
* ApplicationStatusSearchOption supports application not started ([e817889](https://github.com/bcgov/cas-ciip-portal/commit/e817889b3aec7202452d6d5a08c116ed9d59dec1))
* apply trigger to application_revision_status ([d5207b6](https://github.com/bcgov/cas-ciip-portal/commit/d5207b62938011cb0b5f8206b95eed8fd743344f))
* button to return to top of page when reviewing applications ([db487b9](https://github.com/bcgov/cas-ciip-portal/commit/db487b9ee5d072f3f7133588136e680baa934ce1))
* connect new review comments layout with real comments ([8b8f127](https://github.com/bcgov/cas-ciip-portal/commit/8b8f127bf1a5f663f8c918f1992b68d5d87ea556))
* connection needed filters ([74fe1ce](https://github.com/bcgov/cas-ciip-portal/commit/74fe1cea7aa1c52ae2ab17899d337f4ccad0a960))
* create reusable function lib/safeJsonParse ([8a88ab1](https://github.com/bcgov/cas-ciip-portal/commit/8a88ab167b58577cfbb7ad8b64c4ab6a9465847a))
* create v0 form_results (and other v0 entities) if not exists ([65c2c88](https://github.com/bcgov/cas-ciip-portal/commit/65c2c8826cc9bab3662ffebedc53da765ac93b0d))
* delete function for naics code product association ([41276c2](https://github.com/bcgov/cas-ciip-portal/commit/41276c2bd3a6ef110f786140be19c2e72e4fc600))
* delete modal ([8c05617](https://github.com/bcgov/cas-ciip-portal/commit/8c056174a6add82804cbaf6e360012353c3b03e4))
* delete product naics code is functional ([4974a55](https://github.com/bcgov/cas-ciip-portal/commit/4974a55aaacf5bfcced302a8759dfa2bf209ce3f))
* diff visualization supports deletion of top-level array elements ([704f72a](https://github.com/bcgov/cas-ciip-portal/commit/704f72a5b8b14b693aacc5a12e2304cb66bc8a2f))
* drop form_result_status RLS function ([d886ca9](https://github.com/bcgov/cas-ciip-portal/commit/d886ca96c43136d26aafc62845e62debc49f057d))
* dropping cc application_revision_certification_signature_is_valid ([7d855e8](https://github.com/bcgov/cas-ciip-portal/commit/7d855e8ce1b2b30eebcf602f0d349e627bad089e))
* dropping cc application_revision_certification_url ([955807d](https://github.com/bcgov/cas-ciip-portal/commit/955807d7ea303068da8c2304c87e394ca7f5a7fc))
* dropping cc certification_url_has_matches ([b001e60](https://github.com/bcgov/cas-ciip-portal/commit/b001e603e34fc3a4d1b979d06bd5f38745056848))
* dropping cc ciip_user_has_certification_requests ([5314107](https://github.com/bcgov/cas-ciip-portal/commit/531410760805faf35d88a7ac85d197ecd39f1cae))
* dropping RLS for certifier on form_result table ([59a24c8](https://github.com/bcgov/cas-ciip-portal/commit/59a24c8e49e2d5044489646cc43cf77735d52109))
* dropping signature_md5 trigger function ([b0dddf2](https://github.com/bcgov/cas-ciip-portal/commit/b0dddf2bef7d403726e9f2a33cd8914670d09a5d))
* dropping the search organisation function ([1ae0f4a](https://github.com/bcgov/cas-ciip-portal/commit/1ae0f4a3feb3428b8403d69e0808dfe252bca79b))
* ensure resolved comments are hidden when toggled off ([c8df91f](https://github.com/bcgov/cas-ciip-portal/commit/c8df91f73dc146651cf6d3f7e5450a4dd6af9f2b))
* fuel diff supports array ([ab3a863](https://github.com/bcgov/cas-ciip-portal/commit/ab3a86310ec39f9c3613de7ce04dff84d2e3cf6f))
* fuel field is disabled and shows an alert when archived ([2c8712c](https://github.com/bcgov/cas-ciip-portal/commit/2c8712c74ad2e7abfd3687f2465e13b9ed3d0919))
* function to verify that a policy is absent ([246089d](https://github.com/bcgov/cas-ciip-portal/commit/246089d766e17292806e8ea28ca3e64bf19bcb72))
* function to verify that a type doesn't exist ([57ddb3c](https://github.com/bcgov/cas-ciip-portal/commit/57ddb3ce9acc105831650e504b06c10e559faba1))
* helper to verify that a function is not present ([471ead1](https://github.com/bcgov/cas-ciip-portal/commit/471ead14a2b9ecda6f5758adc287d4440bcbd17d))
* icon displays properly when the product is mandatory ([daa56cd](https://github.com/bcgov/cas-ciip-portal/commit/daa56cd575a7ea91f95254b91c4964166ff56c1a))
* implement pagination for productListContainer ([2f13779](https://github.com/bcgov/cas-ciip-portal/commit/2f1377998994aff03bfafda62fdaf2388de34a00))
* improve template for cases where a newer revision exists ([96e0369](https://github.com/bcgov/cas-ciip-portal/commit/96e03692b5e18e42519130355b6c0e106d5bbbca))
* interactive list of naics codes ([4142d21](https://github.com/bcgov/cas-ciip-portal/commit/4142d21d65eba7dbf00ee17ffb570de2bfc5d676))
* json schema form product typeahead ([1878783](https://github.com/bcgov/cas-ciip-portal/commit/1878783fe9d7903a430c869f4c3b802a3449daf2))
* linux dbd dependency for CI tools ([1161eb3](https://github.com/bcgov/cas-ciip-portal/commit/1161eb35c2f7a5bf4ef5bd18732a5a9047d156ef))
* loading prop is propagated to application components ([5a106c3](https://github.com/bcgov/cas-ciip-portal/commit/5a106c352711cb4f0e9208e1b000dea7bbd82b00))
* mocking date on e2e tests ([817071c](https://github.com/bcgov/cas-ciip-portal/commit/817071cf2ad89ae14c4d05821d132d48adc27ef9))
* mutation lives in the add component ([cba05da](https://github.com/bcgov/cas-ciip-portal/commit/cba05da225e502f4f3577315d878964ca38d40d8))
* mutation to create products naics association ([9779ad0](https://github.com/bcgov/cas-ciip-portal/commit/9779ad0e6f752f1c0a74ecc964df29d70da8745e))
* mutation to update applicationReviewStep when marking it completed ([062694a](https://github.com/bcgov/cas-ciip-portal/commit/062694a5cbb99c6dec94cef694d3cdf078b21699))
* naics field renders no matter what ([063e54a](https://github.com/bcgov/cas-ciip-portal/commit/063e54a258bef81015ed4fefd5746a50ec406e5c))
* nextjs links should pass the href to child if it is a Button ([60b5546](https://github.com/bcgov/cas-ciip-portal/commit/60b55466c40a753dc7ac0871eaaeafdc670ba25c))
* only render pagination bar if there are > 1 pages ([1b54fd8](https://github.com/bcgov/cas-ciip-portal/commit/1b54fd886c5b779246edd4a66fc3b2d739dc4212))
* organisation request page updated with search function ([9745493](https://github.com/bcgov/cas-ciip-portal/commit/97454932209d205883a340efa22ec85b58c600c6))
* paginate by first/offset, move activePage to querystring ([1f145d5](https://github.com/bcgov/cas-ciip-portal/commit/1f145d59accdf4e22bc4005e947cd6e84b48a67f))
* pagination with numbered pages ([510f7a6](https://github.com/bcgov/cas-ciip-portal/commit/510f7a639cad5c373b47d4bd891cc63e8136373c))
* product search sorts products by name ([155660c](https://github.com/bcgov/cas-ciip-portal/commit/155660c568ed584cc88cb8135e33ca82a6d8c4b1))
* redirect users from the old to the new application url ([d2872bf](https://github.com/bcgov/cas-ciip-portal/commit/d2872bf7512f4c956c4c3b889beaba29f8fea1e3))
* reenabling necessary RLS policies for certification url ([1be2f64](https://github.com/bcgov/cas-ciip-portal/commit/1be2f649baf3096798fc79db8e19dc02e12e23ae))
* refactor fragments / remove unused props ([e6ac6af](https://github.com/bcgov/cas-ciip-portal/commit/e6ac6af57a3ec779a3ad2353e9eb61d40c13bd3b))
* refactoring relay vars parser to a class ([3ec3322](https://github.com/bcgov/cas-ciip-portal/commit/3ec3322cb2935afe1923bc7311e58354b658f55a))
* remove all uses of formResultStatus ([c6ab634](https://github.com/bcgov/cas-ciip-portal/commit/c6ab6340390aa54f42d9b84d9f1672d6012cf0f5))
* remove deprecated type ([9aec3e7](https://github.com/bcgov/cas-ciip-portal/commit/9aec3e7aae360586b90ee3986985b10a3c650661))
* remove form_result_status insert from trigger ([701c338](https://github.com/bcgov/cas-ciip-portal/commit/701c338c78e8ef781c728c4d508d536641f14ac3))
* remove form_result_status inserts from mutation ([215a516](https://github.com/bcgov/cas-ciip-portal/commit/215a5164997e35e602ff78da996f320d8e577718))
* remove form_result_statuses computed column ([90acff4](https://github.com/bcgov/cas-ciip-portal/commit/90acff402e163845edf28a545898f90247a76a00))
* remove obsolete facilities search ([4991f5c](https://github.com/bcgov/cas-ciip-portal/commit/4991f5c03c501f1935cd767316649bc3dda10b3a))
* remove old search_application_list function from schema ([afad8da](https://github.com/bcgov/cas-ciip-portal/commit/afad8daa6a2cc2e2fe08ea19a7b7769446ac26d0))
* remove SelectReportingYearDropdown ([afd4365](https://github.com/bcgov/cas-ciip-portal/commit/afd436564ad434e2a65b0513313e84667872be1d))
* remove table form_result_status ([1a8406e](https://github.com/bcgov/cas-ciip-portal/commit/1a8406e8244abc2b1cef4d724ecc72cff3e1b531))
* removing application revision status RLS for certifier ([ce80d19](https://github.com/bcgov/cas-ciip-portal/commit/ce80d19047dd4118d20d50e1f86d4b6d5172bc4e))
* removing AS_CERTIFIER flag for development ([76f0577](https://github.com/bcgov/cas-ciip-portal/commit/76f0577295fe860c29aa2252e6fe353d9de89d6d))
* removing certification email and md5 triggers on certification_url ([d3a74fc](https://github.com/bcgov/cas-ciip-portal/commit/d3a74fc1cd6bba66e3480ca40d07caa3da1329b6))
* removing certification url policies ([91cb8bd](https://github.com/bcgov/cas-ciip-portal/commit/91cb8bd22de8fb9dd09acbf9c94e82a410567ac6))
* removing certifier jobs from graphile worker ([34369e7](https://github.com/bcgov/cas-ciip-portal/commit/34369e7b6974039e1323c3fc07c28bab55033171))
* removing certifier policy on application_revision table ([55782b3](https://github.com/bcgov/cas-ciip-portal/commit/55782b32400acbfad8b7f896cbd089814db1b6ad))
* removing certifier RLS on facility table ([eaa9902](https://github.com/bcgov/cas-ciip-portal/commit/eaa990265ca748e47048f528435a7913e85208ae))
* removing cetrification case from set_user_id trigger ([d0841ec](https://github.com/bcgov/cas-ciip-portal/commit/d0841ece6b0a6045aeafd7acdbb3ce8b1f3e164c))
* removing private function for certifier ([fbc3c37](https://github.com/bcgov/cas-ciip-portal/commit/fbc3c372ac41d366d23a2146e639d2e333527ab5))
* removing search_certification_requests function ([52f3c5b](https://github.com/bcgov/cas-ciip-portal/commit/52f3c5bd29ce9a916a1160ba146144597d2abd3b))
* removing tests for the certifier computed columns ([efee42c](https://github.com/bcgov/cas-ciip-portal/commit/efee42cd50e03f47a72af4d84d2bb1daf47ec41e))
* removing tests for the certifier search function ([15e3ac3](https://github.com/bcgov/cas-ciip-portal/commit/15e3ac345c2873836a7aa1c497a4fc09f3101532))
* removing type search_certification_url_result ([b946f30](https://github.com/bcgov/cas-ciip-portal/commit/b946f30a89ef0fa4aaacc8494a68381d5c31dd00))
* removing verification of existing certifier policies ([a98f9bc](https://github.com/bcgov/cas-ciip-portal/commit/a98f9bc62fd39cafb785646c63280e03009c9481))
* resolve and delete review comments ([25ff6c5](https://github.com/bcgov/cas-ciip-portal/commit/25ff6c58b3296cf0ce535418d7f008c14aaefb8c))
* restricts only to mailhog port ([01ebcd4](https://github.com/bcgov/cas-ciip-portal/commit/01ebcd45a16e07276d8c5fa00479e0300ffae998))
* RLS for review_step table ([5b88a72](https://github.com/bcgov/cas-ciip-portal/commit/5b88a72e2a0b91b46daa5cd00f6b2c7f4e09c40d))
* RLS policies for naics table ([20bd777](https://github.com/bcgov/cas-ciip-portal/commit/20bd7775598aa023f44ee6eeda092190afd37882))
* safely parse JSON in _app ([04e4f05](https://github.com/bcgov/cas-ciip-portal/commit/04e4f055b924e4f1732548553f044ad0499ec32d))
* schema and graphql queries updated ([6446c8f](https://github.com/bcgov/cas-ciip-portal/commit/6446c8fae732f8e7321e4c3d2e7c3b50b72fcebf))
* schema migrations for organisation computed columns ([6c26abf](https://github.com/bcgov/cas-ciip-portal/commit/6c26abfd876724c8e55bf938167ab626bc697211))
* scrollable naics list ([7190466](https://github.com/bcgov/cas-ciip-portal/commit/7190466c0b1ec4c7051e060bf1c2039211ed1db1))
* search field resets when product is added ([8bffa3b](https://github.com/bcgov/cas-ciip-portal/commit/8bffa3b30e9a08d09334744d93debc625fa243f2))
* search products component retrieves naics from query ([302b41c](https://github.com/bcgov/cas-ciip-portal/commit/302b41c86941c151dde7636677a03b7cfe51c24d))
* seed data script ignores certification triggers ([e240db9](https://github.com/bcgov/cas-ciip-portal/commit/e240db9681ef55912148859c2d09fd486c70a48c))
* show/hide resolved comments ([5c0b882](https://github.com/bcgov/cas-ciip-portal/commit/5c0b8824cd15d3279b24393fe9e373d9f1a359d7))
* skeleton for the page and the queries ([14809ed](https://github.com/bcgov/cas-ciip-portal/commit/14809ed4bf53b42bc93cf7ebf5f957f79f63d3da))
* sorting the allowed products by name ([14994c3](https://github.com/bcgov/cas-ciip-portal/commit/14994c379530edb32e336042c1e6ebbe92bc6dcb))
* split create functionality into modal component ([fc9dde9](https://github.com/bcgov/cas-ciip-portal/commit/fc9dde9173ea80ca9e5a5e0de20a44b7f28bc923))
* style search buttons ([d419971](https://github.com/bcgov/cas-ciip-portal/commit/d4199718a8d82414f64b2b326eb16eac5b2879f7))
* table filters are submitted when pressing the Enter key ([7f8c954](https://github.com/bcgov/cas-ciip-portal/commit/7f8c9549121e2f6aed7f426cd484906171eb031f))
* the application view page redirects to 404 if no application ([28d531c](https://github.com/bcgov/cas-ciip-portal/commit/28d531cac5b6d565d32774a34cc82c540f3753d5))
* update application page url ([5120bd8](https://github.com/bcgov/cas-ciip-portal/commit/5120bd8f011bf17c137d4d62ca9ffbcb17a95039))
* update facilities application search to use filter plugin ([b9a815f](https://github.com/bcgov/cas-ciip-portal/commit/b9a815fa17e63ee527901ab071026105a875aa20))
* update immutable_form_result trigger to ignore version 0 ([fc98859](https://github.com/bcgov/cas-ciip-portal/commit/fc98859f2bedc468185e9ffb273fc87fa4aacace))
* update mutation to no longer create statuses ([076db4c](https://github.com/bcgov/cas-ciip-portal/commit/076db4c6a2290f30923c054ec38428290d757a61))
* update reporter view of decision on submitted application page ([c02d0a5](https://github.com/bcgov/cas-ciip-portal/commit/c02d0a5e30f88f17473884b25cdf5f7a8bc063ce))
* update review comments on application page when revising ([d933d65](https://github.com/bcgov/cas-ciip-portal/commit/d933d658f6a7fbda0d7dd5005f6b62ae24277f0f))
* update search fragments ([4f3028f](https://github.com/bcgov/cas-ciip-portal/commit/4f3028f12e1612e5d5161af836f2e0e96e0184f6))
* update view-application page to use next dynamic routes ([3dc8c1d](https://github.com/bcgov/cas-ciip-portal/commit/3dc8c1db8ef88435deee7cbd4d7c6876d5d47624))
* updating application tables tests ([0fc6518](https://github.com/bcgov/cas-ciip-portal/commit/0fc6518f220750be24d98e02e4a476b4b32b6ff9))
* updating schema definition ([3a9654a](https://github.com/bcgov/cas-ciip-portal/commit/3a9654a1a993729275ab4cfc3d627dd7430aa8e3))
* updating schema graphql and json files after rebase ([26e345c](https://github.com/bcgov/cas-ciip-portal/commit/26e345c164044a02c6182b569ba3fe116ec1d6b5))
* updating tools-version to postgres 12.6 ([85aa497](https://github.com/bcgov/cas-ciip-portal/commit/85aa497c869725ab81a8e925181530408f97610c))
* use friendly status display ([4604105](https://github.com/bcgov/cas-ciip-portal/commit/460410593fefe259d12384d565aaaf01a87ff5cc))
* useJsonSchemaDiff recursively lists object properties ([1fd3dc1](https://github.com/bcgov/cas-ciip-portal/commit/1fd3dc169f3956a275edd66a83cdc8365570ed55))
* vented and flared natural gas are archived ([aaae969](https://github.com/bcgov/cas-ciip-portal/commit/aaae969add604456a03cc3e87325e7b2474c5d0a))


### Bug Fixes

* (ally) add aria-label to filter inputs ([9f392c6](https://github.com/bcgov/cas-ciip-portal/commit/9f392c6fca2f778425a5a787d3eea9e0ee51ebf5))
* a11y on application submit step ([49b2f77](https://github.com/bcgov/cas-ciip-portal/commit/49b2f77d074d0ab8131fcef0ba3838209f34d3fd))
* accessibility violation on naics code list ([da8946f](https://github.com/bcgov/cas-ciip-portal/commit/da8946fadb84cfd8186ae261d16d71a99976047a))
* account for potential header offset caused by SiteNoticeBanner ([2c83f63](https://github.com/bcgov/cas-ciip-portal/commit/2c83f63a3c31f7352043b32437f71e56936cd7a0))
* acme-challenge should be served even when using https ([d0c0039](https://github.com/bcgov/cas-ciip-portal/commit/d0c0039ebd2cc9f08d14f699d8cb205af9c99490))
* add empty column to manage products table to fix layout bug ([c23cc08](https://github.com/bcgov/cas-ciip-portal/commit/c23cc081f1477713703ba79736d729c42d012a7e))
* add missing column description ([5c6ab16](https://github.com/bcgov/cas-ciip-portal/commit/5c6ab162c47e2d8ab18399778a24d643950557cc))
* add missing comments, fix schema ([9144056](https://github.com/bcgov/cas-ciip-portal/commit/9144056d808192b3a47e23ef0ba285f865f36f72))
* add uindex on fuel_id & naics_id for on conflict clause ([d0b605e](https://github.com/bcgov/cas-ciip-portal/commit/d0b605ed0b0d4f258bd5ccb76032ac3e0fafd006))
* ally contrast violation on outline-danger button ([ad6546d](https://github.com/bcgov/cas-ciip-portal/commit/ad6546d60cfe883449962da3731ede8fbac6ce8c))
* application open/close overlap issue ([d17a0ff](https://github.com/bcgov/cas-ciip-portal/commit/d17a0ff347a812465122a6af8f82d9f349d1c215))
* benchmark/product mutations update rendered results ([05ad907](https://github.com/bcgov/cas-ciip-portal/commit/05ad90707e760b3e143810c74633a1c16bdcfc3b))
* breaking migration if function already exists ([e770b85](https://github.com/bcgov/cas-ciip-portal/commit/e770b85eed8ac0fa4d3e9a514bd44bd0d3593f9b))
* broken sqitch plan after rebase ([6203f67](https://github.com/bcgov/cas-ciip-portal/commit/6203f67b1e33ac7009ee5bd2f6c03dd04728df18))
* capitalization ([f8d13d9](https://github.com/bcgov/cas-ciip-portal/commit/f8d13d9df7729e07a81eaa4b9ce8a55816c0efe4))
* certification for dev data deploy ([7196c69](https://github.com/bcgov/cas-ciip-portal/commit/7196c6904be59efc8bc8a4c4d63a6a794da3656c))
* comment copy/paste error ([83a4569](https://github.com/bcgov/cas-ciip-portal/commit/83a456937d9e4e6a48c632a4fb57aaaceb4be22a))
* console error in productRowItemContainer test ([1a62db1](https://github.com/bcgov/cas-ciip-portal/commit/1a62db19a96958365f5b2121fb9bd17b01478892))
* default layout top padding should only be 60px ([84b8ab7](https://github.com/bcgov/cas-ciip-portal/commit/84b8ab78553aae2526dd027a96775777876a01e3))
* don't drop ciip_portal user during revert ([b6e4905](https://github.com/bcgov/cas-ciip-portal/commit/b6e4905567f94096bee1a078487a045bcbcaf94e))
* e2e email test URL ([38b41e0](https://github.com/bcgov/cas-ciip-portal/commit/38b41e06fc2c2c5532e38d01a2b30d43521be8c9))
* e2e speed ([8c6dfe3](https://github.com/bcgov/cas-ciip-portal/commit/8c6dfe39d24d3a8ef7dd1fa3c29ec11fba7b921a))
* facility_application_by_reporting_year orders results ([df2487b](https://github.com/bcgov/cas-ciip-portal/commit/df2487b82ea7234b44de9831cacdd6260c9c8a36))
* filter row "clear" button clears "application not started" ([c367cbe](https://github.com/bcgov/cas-ciip-portal/commit/c367cbed3fbc92b9295e6e40ea9d8c4977c59900))
* fix sqitch plan after rebase ([ef54624](https://github.com/bcgov/cas-ciip-portal/commit/ef54624b6fc9eeb0da0fdc994baecd65388a80a8))
* join order changed with postgres 12 ([a056f59](https://github.com/bcgov/cas-ciip-portal/commit/a056f5947ac548d3637a6eff42919220a457e4cf))
* libdbd-pg-perl on CI vm ([891b5f2](https://github.com/bcgov/cas-ciip-portal/commit/891b5f228a7f2983dd005d69fe95cd562514e35f))
* live render changes, remove console.logs ([de27616](https://github.com/bcgov/cas-ciip-portal/commit/de2761618ee8192fad66ee34a26c1b6cebd08554))
* mailhog race condition in e2e ([3328523](https://github.com/bcgov/cas-ciip-portal/commit/3328523eaf0b61338ff7045d50ee74709daad647))
* make default resultsPerPage = 10 ([932ed02](https://github.com/bcgov/cas-ciip-portal/commit/932ed02fac79e50359dcfec7b32b3964bcfb68fb))
* make the 'Resume application' button a real anchor link ([fb96c64](https://github.com/bcgov/cas-ciip-portal/commit/fb96c648711b49028ce085411087dfdc81c86d62))
* move DB datepicker to footer to avoid layout conflicts ([a4acd53](https://github.com/bcgov/cas-ciip-portal/commit/a4acd53b4112576860ff5be10981f92dff0d5010))
* mutation now hardcodes the delete logic ([5c9b63c](https://github.com/bcgov/cas-ciip-portal/commit/5c9b63c9e0ee488f669cec49bc620085cb209e4f))
* naics code mutation handles ciip_sector column ([8e145ad](https://github.com/bcgov/cas-ciip-portal/commit/8e145adcc69aedf73a9fe04a7e8215bfd7de9094))
* naics_code should be varchar ([563e1bb](https://github.com/bcgov/cas-ciip-portal/commit/563e1bb25400503fbf52ef862da9385406c7698a))
* omit default create & delete mutations with smart comments ([50d6c47](https://github.com/bcgov/cas-ciip-portal/commit/50d6c4798281d6afd61b6a395612c0dbf8ba0b9e))
* performance and small ui improvements ([0411fb0](https://github.com/bcgov/cas-ciip-portal/commit/0411fb06158500783862b874cf59d39c92d41e9c))
* properly apply default_form_result column in function ([3ab3100](https://github.com/bcgov/cas-ciip-portal/commit/3ab3100c64cdd3a9da78555bebdb11ff7efcfc8c))
* rebase created duplicate entry in sqitch plan ([3487bdf](https://github.com/bcgov/cas-ciip-portal/commit/3487bdf0765093b2f7d1e7075ee44a303e01d277))
* remove environment from PageRedirectHandler useEffect conditions ([f47a82f](https://github.com/bcgov/cas-ciip-portal/commit/f47a82f620b379a3bf94efe52a0076381780e364))
* remove revert/verify file check from shell script ([cead6aa](https://github.com/bcgov/cas-ciip-portal/commit/cead6aa31add8579dc0827ffd7a4234fe343cb3b))
* removing console log ([afd0583](https://github.com/bcgov/cas-ciip-portal/commit/afd0583b7bed24d29a0b79fcfc66f03c00d7f28e))
* removing useless relay vars custom parser ([7524a1b](https://github.com/bcgov/cas-ciip-portal/commit/7524a1bd543d6c8624ea4f56d10b320c2b2bce09))
* removing variable shadowing ([ca1fb98](https://github.com/bcgov/cas-ciip-portal/commit/ca1fb98bdc687394d00f49981b9b8bcfcfc3cbe5))
* rename & fix return value for create_naics_code_mutation ([4353a6c](https://github.com/bcgov/cas-ciip-portal/commit/4353a6c101f40aa60e88f6b22b33459894a44f7b))
* renaming naics selection component ([b366a20](https://github.com/bcgov/cas-ciip-portal/commit/b366a20bc5a8382a8a0aa49dd7808344631d55ae))
* reordering migrations to make function available ([38f9848](https://github.com/bcgov/cas-ciip-portal/commit/38f9848296736ac855b97e5bc7c1386c1f285f2b))
* replace default create_fuel_naics_code mutation ([7772139](https://github.com/bcgov/cas-ciip-portal/commit/7772139373225fe7d20d2b398f76cc94378448bb))
* replace default create_product_naics_code mutation ([9f70ea1](https://github.com/bcgov/cas-ciip-portal/commit/9f70ea1da0b55f4c4bb447a38dbfe779e3fa5c79))
* reporter ally e2e test ([805809c](https://github.com/bcgov/cas-ciip-portal/commit/805809c247434367cec81cea193aae894e30f650))
* reporter subheader highlighting uses route instead of asPath ([0668042](https://github.com/bcgov/cas-ciip-portal/commit/0668042d3aeba16c21f182653a5900992dbef307))
* reset offset when applying new search filters ([6737d1e](https://github.com/bcgov/cas-ciip-portal/commit/6737d1e941d4054e91898aa05f880c10ece37311))
* return enum from application_status comp column ([7646ac9](https://github.com/bcgov/cas-ciip-portal/commit/7646ac9cf68ca3e29df6af9fe4eb1f472231519c))
* revert function missing a replace ([c2f6997](https://github.com/bcgov/cas-ciip-portal/commit/c2f699733e3d56a043a2ca9b73b5710b1bcea5bd))
* revert on certification url policies ([0bd67c4](https://github.com/bcgov/cas-ciip-portal/commit/0bd67c45aebc6aec67b104805f02efb147f8f468))
* reverting confusion between app version and chart version ([ff9e098](https://github.com/bcgov/cas-ciip-portal/commit/ff9e098d2dcf80e16865b5dae89b3af9bd204db0))
* safely parse JSON ([0564621](https://github.com/bcgov/cas-ciip-portal/commit/0564621ffac69f35545aabd96255a616d1cdd227))
* state is not an array ([834072c](https://github.com/bcgov/cas-ciip-portal/commit/834072cd44a2b2fbba701592ee8263ea29bf8730))
* styles are local when possible ([1eb9567](https://github.com/bcgov/cas-ciip-portal/commit/1eb95676416122ccf204e995965d41503c438131))
* submit application button should not be a link ([6af1a39](https://github.com/bcgov/cas-ciip-portal/commit/6af1a39af3ac0f90b29f4bddceb3b66e3122a925))
* trigger function needs security definer ([7c670aa](https://github.com/bcgov/cas-ciip-portal/commit/7c670aa922e9ad5e10f7d30c2b95f0e4d8d590bd))
* typo in FilterableTablePagination - use key, not ref ([517872f](https://github.com/bcgov/cas-ciip-portal/commit/517872ff5799648217347eb3b0e9af9e795d371d))
* **security:** do not trust user input when redirecting ([695a318](https://github.com/bcgov/cas-ciip-portal/commit/695a3185b17cfd7ada972910cf4a3924cf51c9d8))
* update import ([60d33e6](https://github.com/bcgov/cas-ciip-portal/commit/60d33e6d39365951f36695bea0c315b4b73302e1))
* update link to metabase ([bd2f31b](https://github.com/bcgov/cas-ciip-portal/commit/bd2f31b5b912396e128359691e0df54cb1e14e3a))
* update pgTap plan() for application_revision_status_test ([771b49a](https://github.com/bcgov/cas-ciip-portal/commit/771b49a6dcceacada69c2765ccbd22aec1e42470))
* update the reporting year passed to the FacilitiesRowItemContainer ([6e4d1a8](https://github.com/bcgov/cas-ciip-portal/commit/6e4d1a826cb764705de6e787a66b7f2fa5ea54a7))
* update_timestamps trigger does not set deleted_at/by on null input ([c1ce2ec](https://github.com/bcgov/cas-ciip-portal/commit/c1ce2eca7818c7d54fd8adc0a022b47b07df8b64))
* use typescript primitive types ([9349929](https://github.com/bcgov/cas-ciip-portal/commit/93499299d4b51413185128a9ef348344378b5049))
* use v4.0.1 instead of latest to avoid incompatibility warning ([04fe723](https://github.com/bcgov/cas-ciip-portal/commit/04fe72358cb0830ffd45ec619b1028ff008eab3b))
* using database function to verify that the policy is not present ([cfc17e3](https://github.com/bcgov/cas-ciip-portal/commit/cfc17e3da9629314d04f02a7785bb36c2e85fce9))
* y18n advisory ([4defff8](https://github.com/bcgov/cas-ciip-portal/commit/4defff8541462495d5fe4e18f9549103282a23c8))

## [1.18.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.16.0...v1.18.0) (2021-02-25)


### Features

* default layout expands to the bottom of the viewport ([24ca839](https://github.com/bcgov/cas-ciip-portal/commit/24ca839edeb6246804245b537371cac97e9090db))
* fixed help button for admins/analysts ([5874dc7](https://github.com/bcgov/cas-ciip-portal/commit/5874dc7bc02d88e332bb526e9fc7735c6cbf1029))
* intra release KNP for release and k8s name ([72f413b](https://github.com/bcgov/cas-ciip-portal/commit/72f413b94499b8ad25d2662ecc430be273258a3d))
* re-order products table, merge all product config into settings ([9a702b7](https://github.com/bcgov/cas-ciip-portal/commit/9a702b7fc6247ea870a6f6baf260a9b0778a0fc5))
* removing data redeploy on certifier url tests ([4f725de](https://github.com/bcgov/cas-ciip-portal/commit/4f725de389b47ec8d780aed4c8c386c518bfca1d))
* rename Flared Natural Gas CH4 to "Flared Natural Gas" ([312a4b5](https://github.com/bcgov/cas-ciip-portal/commit/312a4b5a5dc2bf452e5851bf721259505ef14c87))
* rewriting NSPs into KNPs ([bef4802](https://github.com/bcgov/cas-ciip-portal/commit/bef4802dc0f4a0f99f549308f317e2647cdf9475))


### Bug Fixes

* cypress time mock and syntax ([927e19d](https://github.com/bcgov/cas-ciip-portal/commit/927e19dc29b62c478c81eb78a3aa937049d7b0a6))
* deploy mocks schema in test openshift environment ([4c0e917](https://github.com/bcgov/cas-ciip-portal/commit/4c0e917515e38c02a3b592806722d097f4326adf))
* linting needs default values for KNP generation ([7b89964](https://github.com/bcgov/cas-ciip-portal/commit/7b89964d8fcfb1e6d541dd14eb5292ad22fcad2f))
* no need for string interpolation ([7cb8caf](https://github.com/bcgov/cas-ciip-portal/commit/7cb8caf7ff49b20a3c5ca7b5e59c8fc733fd2c20))
* onBlur validation support @rjsf/core v2 ([8aa156f](https://github.com/bcgov/cas-ciip-portal/commit/8aa156f562a644e46bd8514f0b468e4f167012fe))
* user-friendly application status labels and spell things out ([8c72466](https://github.com/bcgov/cas-ciip-portal/commit/8c724668e38485cf8b4e538ece88141866c7cf33))
* yaml dashes ([151e69f](https://github.com/bcgov/cas-ciip-portal/commit/151e69f72d788ee74e47b6c17793a0b0724ec779))

## [1.17.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.16.0...v1.17.0) (2021-02-18)


### Features

* default layout expands to the bottom of the viewport ([24ca839](https://github.com/bcgov/cas-ciip-portal/commit/24ca839edeb6246804245b537371cac97e9090db))
* re-order products table, merge all product config into settings ([9a702b7](https://github.com/bcgov/cas-ciip-portal/commit/9a702b7fc6247ea870a6f6baf260a9b0778a0fc5))
* removing data redeploy on certifier url tests ([4f725de](https://github.com/bcgov/cas-ciip-portal/commit/4f725de389b47ec8d780aed4c8c386c518bfca1d))
* rename Flared Natural Gas CH4 to "Flared Natural Gas" ([312a4b5](https://github.com/bcgov/cas-ciip-portal/commit/312a4b5a5dc2bf452e5851bf721259505ef14c87))


### Bug Fixes

* cypress time mock and syntax ([927e19d](https://github.com/bcgov/cas-ciip-portal/commit/927e19dc29b62c478c81eb78a3aa937049d7b0a6))
* deploy mocks schema in test openshift environment ([4c0e917](https://github.com/bcgov/cas-ciip-portal/commit/4c0e917515e38c02a3b592806722d097f4326adf))
* no need for string interpolation ([7cb8caf](https://github.com/bcgov/cas-ciip-portal/commit/7cb8caf7ff49b20a3c5ca7b5e59c8fc733fd2c20))
* user-friendly application status labels and spell things out ([8c72466](https://github.com/bcgov/cas-ciip-portal/commit/8c724668e38485cf8b4e538ece88141866c7cf33))

## [1.16.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.14.0...v1.16.0) (2021-02-03)


### Features

* add a /health endpoint & use in readiness probe ([ef7c66c](https://github.com/bcgov/cas-ciip-portal/commit/ef7c66ca734673064c7b46b6b0db4b487f5e7c83))
* add a column for reporter comments to all views ([ab86124](https://github.com/bcgov/cas-ciip-portal/commit/ab86124a6a6642505eac50b1483d2d22287ef099))
* add data-migrate helm chart ([64195fa](https://github.com/bcgov/cas-ciip-portal/commit/64195fa9eb8605e26f696a95c2cfede724e8a898))
* add is_active column to ciip_application_wizard table ([167a559](https://github.com/bcgov/cas-ciip-portal/commit/167a5595091ae6b093b5e3008fc0ddaf56562bfb))
* add link to report a problem in dashboard ([bdf2d7f](https://github.com/bcgov/cas-ciip-portal/commit/bdf2d7f21dd4e90f6603db946c1cb6b80993c813))
* add missing column descriptions in views ([c13289e](https://github.com/bcgov/cas-ciip-portal/commit/c13289ec840769d1145987d7032cd4077ba91169))
* add new support email as a variable; use temporarily for reports ([a4f2fe6](https://github.com/bcgov/cas-ciip-portal/commit/a4f2fe6c3ccd56c8b6ea1e3a7f2eb8b3cb2c4b4a))
* add test for ciip_fuel view ([bdb0a96](https://github.com/bcgov/cas-ciip-portal/commit/bdb0a96a39877cc0de400043b818271433bc36f5))
* cypress flag added to circleci ([7e31add](https://github.com/bcgov/cas-ciip-portal/commit/7e31add3a5cd2dce9c787cb1927d62e460d1967f))
* e2e test that actually tests the logins ([8fd9a31](https://github.com/bcgov/cas-ciip-portal/commit/8fd9a31ac396f860375e205af47f0699fe2ac0ca))
* fixture to override jwt auth for analyst role ([6e5028e](https://github.com/bcgov/cas-ciip-portal/commit/6e5028e3343196c49939026b3ed1163a5c905dc0))
* ignore inactive ciip_application_wizard rows ([f0b1d8c](https://github.com/bcgov/cas-ciip-portal/commit/f0b1d8cfc491b98c20dbe884a3bf41c243b421d6))
* mock login takes the same code path as AS_XXX ([e9a4fcd](https://github.com/bcgov/cas-ciip-portal/commit/e9a4fcda36fbd3cf0a2a60da4e3f816dc6f0eb76))
* re-group dashboard links navigation and simplify language ([9010908](https://github.com/bcgov/cas-ciip-portal/commit/90109086a4784179f1633c93fd01c730cc4eb7cf))
* refactoring e2e tests to use mock login ([31b19de](https://github.com/bcgov/cas-ciip-portal/commit/31b19ded502eb19262953a4bf8c2737dead99cc8))
* remove uniqueness constraint on form_position ([0d1a57a](https://github.com/bcgov/cas-ciip-portal/commit/0d1a57a72d32cee911a0e1e309f3e5086de479ba))
* set new column to default true ([bc59e32](https://github.com/bcgov/cas-ciip-portal/commit/bc59e3258cac32188fd2c207b5662a52fc17a929))
* update ciip URLs to be *.gov.bc.ca ([1bfc6ac](https://github.com/bcgov/cas-ciip-portal/commit/1bfc6ac8ee2d3980ccf2edff0ed318cdcd2ac8f4))
* update ciip_admin view to handle 2018 data ([3673564](https://github.com/bcgov/cas-ciip-portal/commit/3673564a28a69fe8e0d8da1cb76f1d59f8ffaa88))
* update ciip_emission view to handle ciip 2018 data ([c2e31f7](https://github.com/bcgov/cas-ciip-portal/commit/c2e31f76f8bc25f9c70f85ddc8ac207a581fc075))
* update ciip_fuel view to handle 2018 data ([b93f622](https://github.com/bcgov/cas-ciip-portal/commit/b93f622941526ae622237e6792c1098a3fd8e414))
* update ciip_production view to handle ciip_2018 data ([eb248b9](https://github.com/bcgov/cas-ciip-portal/commit/eb248b96ec2070904dd3ae88f51bcaed5854e237))
* update schema ([bb974f5](https://github.com/bcgov/cas-ciip-portal/commit/bb974f501104cd53798ea6946eb96646a11adc3f))
* use create or replace when creating views ([62e9d26](https://github.com/bcgov/cas-ciip-portal/commit/62e9d2672798e3d74d2c33248722228966bbfe56))


### Bug Fixes

* ACME http challenge should only be accessible on port 80 ([0361186](https://github.com/bcgov/cas-ciip-portal/commit/0361186e4928905fc62c1f57e40695e17e50cbd6))
* add nsp in ciip-portal ns for metabase->ciip-db ([4056428](https://github.com/bcgov/cas-ciip-portal/commit/405642851b7b693a9af9dc8a98ebb54886229c41))
* as_cypress doesn't bypass the login page ([4d7b8db](https://github.com/bcgov/cas-ciip-portal/commit/4d7b8dba84c750ee7fe5481f8da45c285549e561))
* assert that mock login cookie has been set ([8b158d8](https://github.com/bcgov/cas-ciip-portal/commit/8b158d829c683c891473af9b916b0099d5a27e91))
* ciip_fuel cannot drop columns in revert file ([40a66eb](https://github.com/bcgov/cas-ciip-portal/commit/40a66eb873649ad55dca7133278edf615f9954e7))
* drop portal_app user & create ciip_portal user if not exists ([f2b2943](https://github.com/bcgov/cas-ciip-portal/commit/f2b2943be7f5d869a024f32a1b2ead4dc1b54099))
* existing page access spec tests the real login ([4f50dc7](https://github.com/bcgov/cas-ciip-portal/commit/4f50dc712c9e385fd3ec6e28a473dfa0fea9c5a4))
* one more missing column description ([52ffad1](https://github.com/bcgov/cas-ciip-portal/commit/52ffad1c50992d194aa826d1f1f967dea817abdb))
* pass href all the way down to anchor tag for accurate links ([1818edc](https://github.com/bcgov/cas-ciip-portal/commit/1818edcc1231d7523440a53b2c28d4e0e6967389))
* redirect spec only deploys data once ([cf8e581](https://github.com/bcgov/cas-ciip-portal/commit/cf8e581615f84c52a62cb8d81951640d95952267))
* require serviceUrl prop for Report a Problem link component ([434449a](https://github.com/bcgov/cas-ciip-portal/commit/434449ae3d5a3644c515d63102ad43c1f02069b2))
* source/destination swap ([da52563](https://github.com/bcgov/cas-ciip-portal/commit/da52563f0712f6ef049ffdf520e9653bf25ba574))
* syntax error ([e11ce99](https://github.com/bcgov/cas-ciip-portal/commit/e11ce994909dfa9a5629b741f6519ae8526e3210))
* update schema ([e540db0](https://github.com/bcgov/cas-ciip-portal/commit/e540db0d7c56216b0d993b63e8ddad814b29b583))
* upgrade nodejs to 12.20.1 ([a660288](https://github.com/bcgov/cas-ciip-portal/commit/a66028871ee02474f36f9aeb3b147ba48524d465))
* use create or replace in ciip_fuel revert ([e17fd50](https://github.com/bcgov/cas-ciip-portal/commit/e17fd50a9784c4e031b55be8ed9295e9f2ada02b))
* verify file properly verifies exist/not exist of roles ([578be0c](https://github.com/bcgov/cas-ciip-portal/commit/578be0cf4f0ac5e8d9f01ccee482df084bc3cf7a))

## [1.15.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.14.0...v1.15.0) (2021-02-01)


### Features

* add a /health endpoint & use in readiness probe ([ef7c66c](https://github.com/bcgov/cas-ciip-portal/commit/ef7c66ca734673064c7b46b6b0db4b487f5e7c83))
* add data-migrate helm chart ([64195fa](https://github.com/bcgov/cas-ciip-portal/commit/64195fa9eb8605e26f696a95c2cfede724e8a898))
* add is_active column to ciip_application_wizard table ([167a559](https://github.com/bcgov/cas-ciip-portal/commit/167a5595091ae6b093b5e3008fc0ddaf56562bfb))
* cypress flag added to circleci ([7e31add](https://github.com/bcgov/cas-ciip-portal/commit/7e31add3a5cd2dce9c787cb1927d62e460d1967f))
* e2e test that actually tests the logins ([8fd9a31](https://github.com/bcgov/cas-ciip-portal/commit/8fd9a31ac396f860375e205af47f0699fe2ac0ca))
* fixture to override jwt auth for analyst role ([6e5028e](https://github.com/bcgov/cas-ciip-portal/commit/6e5028e3343196c49939026b3ed1163a5c905dc0))
* ignore inactive ciip_application_wizard rows ([f0b1d8c](https://github.com/bcgov/cas-ciip-portal/commit/f0b1d8cfc491b98c20dbe884a3bf41c243b421d6))
* mock login takes the same code path as AS_XXX ([e9a4fcd](https://github.com/bcgov/cas-ciip-portal/commit/e9a4fcda36fbd3cf0a2a60da4e3f816dc6f0eb76))
* refactoring e2e tests to use mock login ([31b19de](https://github.com/bcgov/cas-ciip-portal/commit/31b19ded502eb19262953a4bf8c2737dead99cc8))
* remove uniqueness constraint on form_position ([0d1a57a](https://github.com/bcgov/cas-ciip-portal/commit/0d1a57a72d32cee911a0e1e309f3e5086de479ba))
* set new column to default true ([bc59e32](https://github.com/bcgov/cas-ciip-portal/commit/bc59e3258cac32188fd2c207b5662a52fc17a929))
* update ciip URLs to be *.gov.bc.ca ([1bfc6ac](https://github.com/bcgov/cas-ciip-portal/commit/1bfc6ac8ee2d3980ccf2edff0ed318cdcd2ac8f4))
* update schema ([bb974f5](https://github.com/bcgov/cas-ciip-portal/commit/bb974f501104cd53798ea6946eb96646a11adc3f))


### Bug Fixes

* add nsp in ciip-portal ns for metabase->ciip-db ([4056428](https://github.com/bcgov/cas-ciip-portal/commit/405642851b7b693a9af9dc8a98ebb54886229c41))
* as_cypress doesn't bypass the login page ([4d7b8db](https://github.com/bcgov/cas-ciip-portal/commit/4d7b8dba84c750ee7fe5481f8da45c285549e561))
* assert that mock login cookie has been set ([8b158d8](https://github.com/bcgov/cas-ciip-portal/commit/8b158d829c683c891473af9b916b0099d5a27e91))
* existing page access spec tests the real login ([4f50dc7](https://github.com/bcgov/cas-ciip-portal/commit/4f50dc712c9e385fd3ec6e28a473dfa0fea9c5a4))
* redirect spec only deploys data once ([cf8e581](https://github.com/bcgov/cas-ciip-portal/commit/cf8e581615f84c52a62cb8d81951640d95952267))
* source/destination swap ([da52563](https://github.com/bcgov/cas-ciip-portal/commit/da52563f0712f6ef049ffdf520e9653bf25ba574))
* update schema ([e540db0](https://github.com/bcgov/cas-ciip-portal/commit/e540db0d7c56216b0d993b63e8ddad814b29b583))
* upgrade nodejs to 12.20.1 ([a660288](https://github.com/bcgov/cas-ciip-portal/commit/a66028871ee02474f36f9aeb3b147ba48524d465))

## [1.14.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.13.1...v1.14.0) (2021-01-05)


### Features

* correcting namespaces ([1ad5243](https://github.com/bcgov/cas-ciip-portal/commit/1ad5243ed2f4c3f708acb52e34dc08d4d09d4eee))
* correcting namespaces ([5e9dfa1](https://github.com/bcgov/cas-ciip-portal/commit/5e9dfa16414d2e1c1537bf677f268f37d3405432))
* function to mock the time inside a transaction ([c711fb6](https://github.com/bcgov/cas-ciip-portal/commit/c711fb605e3a64c4de5656a188dc38bab39c556e))
* nsps and values for ocp4-dev ([699e700](https://github.com/bcgov/cas-ciip-portal/commit/699e700dcc7c2e4485b7408bf32c8b76042a7fa4))
* remove values files for old namespaces ([0d209cf](https://github.com/bcgov/cas-ciip-portal/commit/0d209cf7983c2526f8ec662f8e24f53460b73ea3))
* time travel supports fractional epochs ([e6f6b6b](https://github.com/bcgov/cas-ciip-portal/commit/e6f6b6bb710bfc922a79f65bd5d755506bb17fe8))
* update mailhog chart version and image repository ([ee056a6](https://github.com/bcgov/cas-ciip-portal/commit/ee056a655248fa3e2bcac634b2e79c0de15a37a6))
* update routes with temporary host names ([4eb98ba](https://github.com/bcgov/cas-ciip-portal/commit/4eb98bab9fec4be747cbcb56ff6d9dd927812580))
* updating graphql schema ([dcf0de9](https://github.com/bcgov/cas-ciip-portal/commit/dcf0de9a5010dec595346a2d69f0d68e228af1f4))
* updating graphql schema ([d4a3bc3](https://github.com/bcgov/cas-ciip-portal/commit/d4a3bc31c307e926a7e39ff68220da58b6257748))
* values files for test and prod ([861a56e](https://github.com/bcgov/cas-ciip-portal/commit/861a56e7d27e76b228e4db25e445b20ef4a4938c))


### Bug Fixes

* cpan installs the dependencies for all schemas ([5e80404](https://github.com/bcgov/cas-ciip-portal/commit/5e80404cb836521cf8e54c9d4c98fad56316026c))
* don't attempt to delete prod-restore PVC ([7c4ead0](https://github.com/bcgov/cas-ciip-portal/commit/7c4ead0e44980a445a53e49df8c8bf295de2155d))
* fix NSP and update makefile to support generic environment names ([a61efc7](https://github.com/bcgov/cas-ciip-portal/commit/a61efc743ddc775526a2f0cdca5ac415ab446059))
* hardcode default reporting year in table to 2019 ([402ca2e](https://github.com/bcgov/cas-ciip-portal/commit/402ca2eb82c24f9baa7e4622856c17ad50d7f7cf))
* linting on OCP4 ([95cda7a](https://github.com/bcgov/cas-ciip-portal/commit/95cda7a1fc613586bd1c864fb8341dca55c26eda))
* mocks schema needs to be deployed to deploy dev data ([f765d16](https://github.com/bcgov/cas-ciip-portal/commit/f765d168d2c2de89ddf63b6d5cfb03a37414d8f3))
* remove duplicate deployment of mock schema ([aefac80](https://github.com/bcgov/cas-ciip-portal/commit/aefac80f5d37cb63a90b1c2e71c8b8be7169ec0c))
* remove ie from happo config targets ([b6353cb](https://github.com/bcgov/cas-ciip-portal/commit/b6353cba0f0ccfd4f684a28372d4aa78586aa98f))
* schema deploying order and dev data dependency ([29a7af2](https://github.com/bcgov/cas-ciip-portal/commit/29a7af2e66cb8636ec4437287f7a42ef85aed1df))
* schema Docker container directory structure needs to match repo ([cdbeba7](https://github.com/bcgov/cas-ciip-portal/commit/cdbeba742e3a8df4dfff50d42cfcac4bb76e4b68))
* sqitch plan reordering ([671a0a7](https://github.com/bcgov/cas-ciip-portal/commit/671a0a78711222db5319ac3326e457e3b948ba0e))
* sql syntax ([92bd664](https://github.com/bcgov/cas-ciip-portal/commit/92bd664e600aa99c3ef0ccbc7d3f10e528a4b1f8))
* typo in developer guide documentation ([4de5ba3](https://github.com/bcgov/cas-ciip-portal/commit/4de5ba3835ffd26333b75de8c07bf08170c7cc1b))
* update axios to fix security advisory ([6a057da](https://github.com/bcgov/cas-ciip-portal/commit/6a057da4dc21a0c0f4e7e51fa3f1f8fe21f9a7c2))
* update dockerfile workdir ([b4eb9da](https://github.com/bcgov/cas-ciip-portal/commit/b4eb9da62ed9548cd13a89bbda8b3122ed6cc5c3))

### [1.13.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.13.0...v1.13.1) (2020-12-07)


### Bug Fixes

* 'revise application' btn --> 'resume latest draft' if newer draft ([0834e1f](https://github.com/bcgov/cas-ciip-portal/commit/0834e1f69e16882583b5235fb66d246664a73dda))
* 'revise'-->view most recent submission if viewing older submission ([04c91d2](https://github.com/bcgov/cas-ciip-portal/commit/04c91d2ce8e04a89fa3c72ec808a903e9f134ed8))
* add computed column application_revision_is_immutable ([c893b4d](https://github.com/bcgov/cas-ciip-portal/commit/c893b4d5a093949bceda4c9c7cbc8fde69ef603c))
* add immutable_form_result trigger function ([bfde612](https://github.com/bcgov/cas-ciip-portal/commit/bfde612d5a3eab530c5b87ed6cf6a3683752ef45))
* add trigger to form_result table ([3eb2a1b](https://github.com/bcgov/cas-ciip-portal/commit/3eb2a1b3308f1e650b606733d4e509b8985c3149))
* applicationRevisionByStringVersionNumber returns correct app ([3bc9e17](https://github.com/bcgov/cas-ciip-portal/commit/3bc9e17459688493b3ae3995183a4e1bf9fb6ccb))
* fix wrong return value in function ([620ac76](https://github.com/bcgov/cas-ciip-portal/commit/620ac768071bacddd9db7e6468600a5c5afbb396))
* logic fix ([9427f68](https://github.com/bcgov/cas-ciip-portal/commit/9427f68c1f383c1f96d5254b3dce30c811d24a51))
* minor syntax/logic fixes ([b490bd0](https://github.com/bcgov/cas-ciip-portal/commit/b490bd0b5c4e6518b4961640034c4d746db42f27))
* pg_restore in test should ignore errors ([272d876](https://github.com/bcgov/cas-ciip-portal/commit/272d8766c56ca268c906cb4bb73635bf0623a391))
* prod-backup-pvc should not be deleted after install ([d276b3c](https://github.com/bcgov/cas-ciip-portal/commit/d276b3cc953ece9e50c8e5fb13e904ba2b3ed507))
* prod-test-restore creates roles as they do not exist on install ([6a3ef38](https://github.com/bcgov/cas-ciip-portal/commit/6a3ef386f09355b0a36a7fa8058e562a2b9ad5fa))
* redirect the reporter when trying to access immutable application ([b0f7208](https://github.com/bcgov/cas-ciip-portal/commit/b0f72082516739265f60090cb043e1bf75465d33))
* revert sqitch.plan bug introduced in 1b5542 ([151021a](https://github.com/bcgov/cas-ciip-portal/commit/151021a9cdd21f1af2778287d5fa60db8bba8beb))
* run CI nightly job at midnight PST (UTC-8) ([b03af0b](https://github.com/bcgov/cas-ciip-portal/commit/b03af0bb54bc2010b0fa5780f620d0f824e5cb94))
* useState for mutation-altered props that shouldn't cause rerender ([0be7bc3](https://github.com/bcgov/cas-ciip-portal/commit/0be7bc3155dafa8b3cba38714f2e2e122cbe70ca))

## [1.13.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.12.0...v1.13.0) (2020-11-30)


### Features

* add date range trigger to reporting_year table ([28544c6](https://github.com/bcgov/cas-ciip-portal/commit/28544c63b313c0ac172ab27606d804e7792d5847))
* add function to protect date ranges in reporting_year table ([1b5542a](https://github.com/bcgov/cas-ciip-portal/commit/1b5542a8543a77f44271b1d06c395b2b0fe0eb19))
* admin form validation ensures non-overlapping application windows ([c867285](https://github.com/bcgov/cas-ciip-portal/commit/c867285c8debc9d6021b6f5159fa46fbca030ff2))
* also validate non-overlapping reporting periods in admin ([df28b90](https://github.com/bcgov/cas-ciip-portal/commit/df28b90c76cbe30c051da3b23eea86ea4e9ec6bd))
* default layout supports user controls in title banner ([45610ea](https://github.com/bcgov/cas-ciip-portal/commit/45610eac4fb7c81d49c1615ed20d757aca46e545))
* don't validate reporting start/end when editing application dates ([eb908bc](https://github.com/bcgov/cas-ciip-portal/commit/eb908bc924f39d404ac37d7dcdecab0406d41f6f))
* remove validation enforcing edited applicationClose to not be past ([95f5832](https://github.com/bcgov/cas-ciip-portal/commit/95f58323851c9c497573a14c4e347dcd081f0f03))
* show edit button only for the most recently closed year+ ([115ff32](https://github.com/bcgov/cas-ciip-portal/commit/115ff327280df9692beaa8da6ee63dd640660904))
* update function to include 'contains range' edge case ([64099c4](https://github.com/bcgov/cas-ciip-portal/commit/64099c4c50aef58d4d3c0effb7e633b53d53420a))


### Bug Fixes

* ensure errors are returned to continue built-in validation ([508b903](https://github.com/bcgov/cas-ciip-portal/commit/508b903fbd67ee470917366e2a779757f4ab895b))
* labels for accessibility, style with local CSS ([0047155](https://github.com/bcgov/cas-ciip-portal/commit/004715509f2f9a8a40e6c8a689c7a3968f4a713d))
* moving the create product button down and left ([7473ea3](https://github.com/bcgov/cas-ciip-portal/commit/7473ea3b417bd672377e56f34890afbb30ef348e))
* only validate past application dates if non-empty ([2c52762](https://github.com/bcgov/cas-ciip-portal/commit/2c52762ffabbed7ab54ac1ec6daeb310d313520f))
* replace quinary expression with a variable re-assignment ([cbac6f8](https://github.com/bcgov/cas-ciip-portal/commit/cbac6f8a644caabfcd2815894086ad8bc7607e17))
* reporting period dropdown alignment on bootstrap md width ([7ab2001](https://github.com/bcgov/cas-ciip-portal/commit/7ab20019ff565b8349125641693ba319a58ca3f6))
* tweak vertical positioning of 'create new' reporting year button ([97c06b1](https://github.com/bcgov/cas-ciip-portal/commit/97c06b17d6d169cc83ffdcbd1c2cdab94331c524))

## [1.12.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.11.0...v1.12.0) (2020-11-16)


### Features

* add missing /auth back into the url ([18b9a44](https://github.com/bcgov/cas-ciip-portal/commit/18b9a4433115033ce919033909489453a27f0a16))
* add print-pdf route ([c4d45e5](https://github.com/bcgov/cas-ciip-portal/commit/c4d45e550f076f3bd8fcba80f29e2ace2e12eb85))
* adding comment rendering in the fuels section of the PDF ([fa4fd97](https://github.com/bcgov/cas-ciip-portal/commit/fa4fd97b18d6b8c1153b5db3c421b882cdbee9eb))
* adding deployment of mocks schema in helm template ([a036fbc](https://github.com/bcgov/cas-ciip-portal/commit/a036fbcd88b958b7a245a74e88255f4d9c29aaae))
* adding env variable for mocked date without UI ([06cef93](https://github.com/bcgov/cas-ciip-portal/commit/06cef933eaa346a6ed70d32571a58c0fc0e9fe4e))
* adding front-end component to set the mocked date ([3c115e2](https://github.com/bcgov/cas-ciip-portal/commit/3c115e28491726b342436b06d74bb42d505f8451))
* basic UI control to set the mocked date in the database ([3bfe714](https://github.com/bcgov/cas-ciip-portal/commit/3bfe71451d65c256851e4d1d7e7a0cd0e7489a3e))
* creating schema for mocked database functions ([a64d9a6](https://github.com/bcgov/cas-ciip-portal/commit/a64d9a67a7fca195f3e93795632e03d94f7a1ea7))
* Creating schema for mocks, adding mock now() method ([e7e009c](https://github.com/bcgov/cas-ciip-portal/commit/e7e009c1565be4a3cd67ca670b07387e5be969d2))
* datepicker allows user to pick year and month ([ec9ce5b](https://github.com/bcgov/cas-ciip-portal/commit/ec9ce5b43db36ea68b214c11e3da50670c4ab320))
* docker image supports puppeteer ([0556516](https://github.com/bcgov/cas-ciip-portal/commit/0556516d4ba8d317e19256e4fd4ae327a6513c52))
* Ensure PDF download opens in new tab ([75cabf5](https://github.com/bcgov/cas-ciip-portal/commit/75cabf5702af3ee344d898f80949d4484f84789d))
* helm values to only set the ENABLE_DB_MOCKS in dev and test ([37cfc40](https://github.com/bcgov/cas-ciip-portal/commit/37cfc403824a858870f5ec7b92f0beeec73262ca))
* keep browser alive and properly await commands ([606d839](https://github.com/bcgov/cas-ciip-portal/commit/606d8398233930f41212fc1664278aae765d72d1))
* rendering the comment field on the production items on the PDF ([cd1cfb2](https://github.com/bcgov/cas-ciip-portal/commit/cd1cfb224d09644c186932ad9367f2b3d6a2b71e))
* reworking ggircs_portal.current_timestamp() to use now() instead ([672dd02](https://github.com/bcgov/cas-ciip-portal/commit/672dd0234eb86077b8c00e1acdd4ae2ff9fd1744))
* update keycloak url for dev-test-prod ([f5674eb](https://github.com/bcgov/cas-ciip-portal/commit/f5674eb792e4c3675dc80dc48f0ad78c1cb9db7b))
* updating permissions on the mocks schema ([56f36af](https://github.com/bcgov/cas-ciip-portal/commit/56f36af3ae645c6aa6b1ef7556ba9fb06f17e9e6))
* updating the ui_schema: rendering of the empty fields ([8a19216](https://github.com/bcgov/cas-ciip-portal/commit/8a19216cf2478a9ac447a98f86bb9082c73f3023))


### Bug Fixes

* Accuracy and more readable aria-label for expand/collapse comments ([253da10](https://github.com/bcgov/cas-ciip-portal/commit/253da1083181ea9e818dfebef7345a7f32d5b62f))
* add copy command in dockerfile for mocks schema ([918f5d7](https://github.com/bcgov/cas-ciip-portal/commit/918f5d79ad0afdccee7d29943bae8226d8cda747))
* add quotes to relative pushd path ([fe37366](https://github.com/bcgov/cas-ciip-portal/commit/fe37366cdc740cada5ae24e0e06a166642426588))
* correcting path to helm template value ([39e14f5](https://github.com/bcgov/cas-ciip-portal/commit/39e14f5eace5a796e2fb478438cca0005c73e003))
* end of file ([6e8eb7a](https://github.com/bcgov/cas-ciip-portal/commit/6e8eb7a8f86e199cfaf4dc3bed7d12cb9b6aead0))
* fixing reference to env Value ([a8fe220](https://github.com/bcgov/cas-ciip-portal/commit/a8fe220e5676da9ab7c9bac439f156663433096a))
* formatting of the comment field on the application summary and PDF ([f4d0220](https://github.com/bcgov/cas-ciip-portal/commit/f4d022023ebf23618eea8a94cd5c1566f6ff68d0))
* linter issues ([abdc682](https://github.com/bcgov/cas-ciip-portal/commit/abdc6821529bdf28bf3801e2bfa1bf778e97d77f))
* puppeteer should download its bundled browser when installing ([0012510](https://github.com/bcgov/cas-ciip-portal/commit/0012510107ce265bc4461361b884e2c13541f2a6))
* remove puppeteer & chrome from dockerfile ([2f60ad6](https://github.com/bcgov/cas-ciip-portal/commit/2f60ad6548d61e4ce0d80984a376270484991f70))
* removing forgotten console.log call ([e6526aa](https://github.com/bcgov/cas-ciip-portal/commit/e6526aa876550b88cd9299e9816475bb03a35ced))
* update cronjob with new path ([b072176](https://github.com/bcgov/cas-ciip-portal/commit/b072176aafe846a260f0ba2c37dd2f1a059b0511))
* update name of test reporter username for test env in banner ([dc0ede4](https://github.com/bcgov/cas-ciip-portal/commit/dc0ede434b240f024398e2da3e294ec089f2d292))
* wrong function call in the database mocking options ([5c8f227](https://github.com/bcgov/cas-ciip-portal/commit/5c8f227c4e9721c99afd47444061bf995801e0d8))

## [1.11.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.10.1...v1.11.0) (2020-10-22)


### Features

* add missing /auth back into the url ([1b73e50](https://github.com/bcgov/cas-ciip-portal/commit/1b73e50ebe250be9838a052391655fc035f277f0))
* update keycloak url for dev-test-prod ([0caa3c8](https://github.com/bcgov/cas-ciip-portal/commit/0caa3c88c17a120cb109e73b36422ad972b44c8c))


### Bug Fixes

* remove all instances of the NO_PDF flag & update docs ([d365dfb](https://github.com/bcgov/cas-ciip-portal/commit/d365dfb1b3168f9839cde494dbcd020195bf1b01))
* remove all pdf-related files ([130209f](https://github.com/bcgov/cas-ciip-portal/commit/130209fb61d329a8c84898404a7a4afa6ac98be4))
* remove react-pdf packages ([6cc5f7f](https://github.com/bcgov/cas-ciip-portal/commit/6cc5f7fabf35e2e85cff1a3af0b85602ac285d8f))

### [1.10.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.10.0...v1.10.1) (2020-10-15)


### Bug Fixes

* parse fuelRowId & emissionCatetoryRowId integers to named values ([db41e01](https://github.com/bcgov/cas-ciip-portal/commit/db41e01bc15b8a092966686c37089006e5257837))
* remove debugging console log ([6dfa7a7](https://github.com/bcgov/cas-ciip-portal/commit/6dfa7a712d65da28d38b7f20d989eb9ba0acaa25))
* subtract generated heat/elec in incentive function ([9367b05](https://github.com/bcgov/cas-ciip-portal/commit/9367b05da61db5cc6c1b30a07eff22306a36c0b6))

## [1.10.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.9.1...v1.10.0) (2020-10-07)


### Features

* Add Bowser to project for browser detection ([4d4ef68](https://github.com/bcgov/cas-ciip-portal/commit/4d4ef683a6f04494411892a75761e263e4801435))
* Backwards-compatible browser info page ([4d4f770](https://github.com/bcgov/cas-ciip-portal/commit/4d4f7702f098baf876e92642cefa8be3f096239b))
* PageRedirectHandler redirects user when session idles ([372ba33](https://github.com/bcgov/cas-ciip-portal/commit/372ba3362817e6335adb51e4da6a936def2cbfcb))
* Render static info page for unsupported browsers ([f60e055](https://github.com/bcgov/cas-ciip-portal/commit/f60e055d9a6857c537725f5a9516423271391da3))


### Bug Fixes

* Capitalize 'CIIP Benchmarked' table header ([9cfe03a](https://github.com/bcgov/cas-ciip-portal/commit/9cfe03a3241f406851cce3a6c20bedbd5797ba80))
* Correct unsupported browsers ([78fb442](https://github.com/bcgov/cas-ciip-portal/commit/78fb442f3839c6d578e1f6599dca45926a0c9fc8))
* keycloak access token is refreshed when needed ([a43c618](https://github.com/bcgov/cas-ciip-portal/commit/a43c61841a11a46179926b1cb5a43ff72d21d4f8))
* session-idle-remaining-time route should handle dev flags ([af4965b](https://github.com/bcgov/cas-ciip-portal/commit/af4965be93c8ef880c2bf79fd1dd3e89789fb3b9))

### [1.9.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.9.0...v1.9.1) (2020-09-23)


### Bug Fixes

* remove escape characters from bash function call ([bd63065](https://github.com/bcgov/cas-ciip-portal/commit/bd630658b44ecbc7e05d5b4be97989e4d60b562e))

## [1.9.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.8.1...v1.9.0) (2020-09-23)


### Features

* add re-usable functions for date manipulation ([bb3208c](https://github.com/bcgov/cas-ciip-portal/commit/bb3208c13d9d2337cae4230e98feabda1d30f97b))
* align comment date format with rest of application ([6015391](https://github.com/bcgov/cas-ciip-portal/commit/601539107d237ca2f2300bcd254930aeb6fd7397))
* convert UTC dates to readable format ([e9e236d](https://github.com/bcgov/cas-ciip-portal/commit/e9e236d1afe38fe376388ecf7af049b89998eb55))
* remove instances of moment & replace with new functions (except AltDateInput.tsx) ([8b7200d](https://github.com/bcgov/cas-ciip-portal/commit/8b7200df68af720ac10e9f8b367a9ac8c8f9bce9))
* remove unused onStepBack function/props ([0523547](https://github.com/bcgov/cas-ciip-portal/commit/0523547f8548fffa79411b2fce2e724bd5358823))
* update form button styles ([feabebb](https://github.com/bcgov/cas-ciip-portal/commit/feabebb98ea69c66bae6ad21eeedfb51b90ef486))


### Bug Fixes

* add quotes to PORTAL_READONLY_USER paramter in cmd line sql function call ([aa53429](https://github.com/bcgov/cas-ciip-portal/commit/aa53429704553ca54ad03c338706456dcdfac0ff))
* escape quotes in bash command ([14fe1ee](https://github.com/bcgov/cas-ciip-portal/commit/14fe1eeca60bf0dad58ba8f79ffbfbf397c7e704))
* Status indicators should appear as a pill badge ([dfbb19c](https://github.com/bcgov/cas-ciip-portal/commit/dfbb19ca4771273f717e67a42812b220afe0b1bf))

### [1.8.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.8.0...v1.8.1) (2020-09-16)


### Bug Fixes

* define width/height of uploaded signature file ([7172c7b](https://github.com/bcgov/cas-ciip-portal/commit/7172c7b91f76ab2b94a7db2f3d1ca5b30178038b))
* Hide gases button shouldn't overlap 'saving' indicator ([94dfec3](https://github.com/bcgov/cas-ciip-portal/commit/94dfec36829c6fcddd594c1c2083769f99b95d5e))
* search/sort by application id instead of id of search return row ([87c5b82](https://github.com/bcgov/cas-ciip-portal/commit/87c5b82331bb98e141202c59fe9835f0cbe5c23e))
* update draft status notification to reflect current certification status ([34af518](https://github.com/bcgov/cas-ciip-portal/commit/34af5185f4e7cac513ca32c6aa4c9075e819126f))

## [1.8.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.7.1...v1.8.0) (2020-09-08)


### Features

* Don't show application close time on front page ([e966e91](https://github.com/bcgov/cas-ciip-portal/commit/e966e91f3ed56983f0f92969c0a6e3a2b9d38766))


### Bug Fixes

* increase cores for prod patroni ([4486d2c](https://github.com/bcgov/cas-ciip-portal/commit/4486d2cb9158bcba2c7a310eb2b4a7c147676f02))

### [1.7.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.7.0...v1.7.1) (2020-09-08)


### Bug Fixes

* Always show reviewer comments regardless of revision status ([373776c](https://github.com/bcgov/cas-ciip-portal/commit/373776c3b11d940abacec1a8729b1c7f78a176f7))

## [1.7.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.6.1...v1.7.0) (2020-09-02)


### Features

* add UI for selecting a reporting year ([26515c7](https://github.com/bcgov/cas-ciip-portal/commit/26515c729ae518a9e7f87276e50d8f3b9b75715c))
* ApplyButton is disabled for new applis when viewing past years ([5fe787d](https://github.com/bcgov/cas-ciip-portal/commit/5fe787d72695ca0807176044a22f7c1c6250bae5))
* ApplyButton is not shown when the reporting window is closed ([09e1292](https://github.com/bcgov/cas-ciip-portal/commit/09e1292e5f5d7ac5e92579da08ea2a2f81fb4fa5))
* Heading landmark accessibility on certification redirect page ([00ebf3d](https://github.com/bcgov/cas-ciip-portal/commit/00ebf3d118f38e323be5c19ad4140695f935236f))
* Input label accessibility for batch certification checkbox inputs ([64aba20](https://github.com/bcgov/cas-ciip-portal/commit/64aba2094f14ebe09328748453ef61a6d0ea2259))
* Input label accessibility for signature image upload ([9861335](https://github.com/bcgov/cas-ciip-portal/commit/9861335fca4700f17a23e57beebb24b10c20aca5))
* revise application and apply button allow revisions after deadline ([2c0032b](https://github.com/bcgov/cas-ciip-portal/commit/2c0032b491f12eb3211aa9b2f72ccd24a54fcd5b))
* **db:** allow creation of new application revisions when window closed ([d994824](https://github.com/bcgov/cas-ciip-portal/commit/d994824691c6872cee5838062ac0305c728eb35f))
* rework function to allow for filtering on reporting year ([67ca5b9](https://github.com/bcgov/cas-ciip-portal/commit/67ca5b9e8fbef8115ad16ee0c847eb86aeeee4c4))
* update relay query variables ([943d32f](https://github.com/bcgov/cas-ciip-portal/commit/943d32f76df489edeef2fbba31d9ab6070f44aee))


### Bug Fixes

* ApplyButtonContainer should not crash if application is not draft ([f280c3d](https://github.com/bcgov/cas-ciip-portal/commit/f280c3d5f2fc288be8be6c3948cbe4e0c1734481))
* FacilitiesRowItemContainer key should include the selected year ([fca6986](https://github.com/bcgov/cas-ciip-portal/commit/fca698675e35a848e38f5041557c53cb0829393a))
* RegistrationLoginButtons + KeyDates handle closed reporting period ([b24b7ed](https://github.com/bcgov/cas-ciip-portal/commit/b24b7ed6174ac4420a79a49337386e43f58c6b89))
* render an empty div instead of no apply button to preserve column ([45defac](https://github.com/bcgov/cas-ciip-portal/commit/45defacbb685ef7a8f5250fa7387cc2638a17ad6))

### [1.6.1](https://github.com/bcgov/cas-ciip-portal/compare/v1.6.0...v1.6.1) (2020-08-28)


### Bug Fixes

* make application_policies case insensitive ([c3b369d](https://github.com/bcgov/cas-ciip-portal/commit/c3b369d2f235c44f1765636afe26b9e3003eb64c))
* make certification_url_policies case insensitive ([6b1259d](https://github.com/bcgov/cas-ciip-portal/commit/6b1259d9169bde5364d17d4d72c60ef59babcdf3))
* make ciip_user_has_certifiation_requests case insensitive ([29c1ee0](https://github.com/bcgov/cas-ciip-portal/commit/29c1ee033be06a7d5c051b6b9763b25bdaadc5c8))
* Make facility_policies case insensitive ([71b0b59](https://github.com/bcgov/cas-ciip-portal/commit/71b0b59416df371a1e59e3bde814fd320bdebee0))
* make get_valid_applications_for_certifier case insensitive ([731ee02](https://github.com/bcgov/cas-ciip-portal/commit/731ee02e2681bfd1bd6a3efb897a00dee0eff10b))
* make search_certification_requests case insensitive ([23fdf3a](https://github.com/bcgov/cas-ciip-portal/commit/23fdf3af617afd0f835a50aaf3dcfdef62547deb))

## [1.6.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.5.0...v1.6.0) (2020-08-26)


### Features

* add 'pending certification' to a draft application's status if a certification request has been sent ([fdd58ac](https://github.com/bcgov/cas-ciip-portal/commit/fdd58ac447a80797c9a575893315cc7fd7010a3a))
* Add instruction text just above digital signature pad ([7275627](https://github.com/bcgov/cas-ciip-portal/commit/727562711c8124e5e9848b2eae70360a8ad68e93))
* add saving indicator to application forms ([b4a3e6f](https://github.com/bcgov/cas-ciip-portal/commit/b4a3e6f53abcdf9d29b5ad1c6bc0adbff71369c4))
* Color contrast accessiblity, reporter scope ([5a5618c](https://github.com/bcgov/cas-ciip-portal/commit/5a5618c6e84da2c6f301666003255d95bb6103e0))
* create common function & show explicit error messages for format errors ([782fd61](https://github.com/bcgov/cas-ciip-portal/commit/782fd616f20c9dd5d2d3f3a5bd3e4f746d17dc08))
* Form input (label) accessibility ([de947e9](https://github.com/bcgov/cas-ciip-portal/commit/de947e909698c39291f7f2d18a8e5a885935f5a0))
* Form label accessibility for SearchBox ([12624aa](https://github.com/bcgov/cas-ciip-portal/commit/12624aaa8f7cf54f71c7c1ba35ddbdaf70ff0c88))
* Headings accessibility, reporter scope ([6302e29](https://github.com/bcgov/cas-ciip-portal/commit/6302e294deea5647e4d2de36c4797156329c613f))
* implement debounce without clientMutationIds ([f50dc6a](https://github.com/bcgov/cas-ciip-portal/commit/f50dc6ab8dbb56d4d224e3a8f5111b2cdf37253a))
* List accessibility in PaginationBar ([67ebb7f](https://github.com/bcgov/cas-ciip-portal/commit/67ebb7f82a71660f5a03472d4ba11cf132dc1f66))
* mutation debounce middleware short-circuits the debounced mutation ([12100ac](https://github.com/bcgov/cas-ciip-portal/commit/12100acefd72e30049a3bcd66d82ecd698f1c4cb))
* Nav landmark accessibility ([429d1c1](https://github.com/bcgov/cas-ciip-portal/commit/429d1c169ad5e1e1dbfad4a9420b8881f5a76548))
* set default debounce timeout to 250ms ([284ee1d](https://github.com/bcgov/cas-ciip-portal/commit/284ee1da749e393c671f02eaeafc5287f0800ff2))
* show a message in search tables if there are no results ([6647662](https://github.com/bcgov/cas-ciip-portal/commit/66476620e7960aab12ca36ff1d33388cf60a854e))
* update confirmation message in ApplicationWizardConfirmation ([2189ad1](https://github.com/bcgov/cas-ciip-portal/commit/2189ad1b7610af352ab0c3a0e0b9c3bec45589ff))
* Update program website URL to (hopefully) permanent content URL ([9699b33](https://github.com/bcgov/cas-ciip-portal/commit/9699b338362746f060e1ac512c3e613e93293395))
* update snowplow analytics script to vE.2.14.0 ([cb6376d](https://github.com/bcgov/cas-ciip-portal/commit/cb6376dbe4a4063b6a9e6e28e24a7d2dc546c1de))
* use a debounceKey and call dispose() on debounced mutations ([32fef24](https://github.com/bcgov/cas-ciip-portal/commit/32fef24cea82b59d9df815dcc122f9ee1966f58f))


### Bug Fixes

* add a role & label to title div (fixes missing landmark violation) ([61710c6](https://github.com/bcgov/cas-ciip-portal/commit/61710c62aff066ffa6f3d39520862366e349e382))
* add alt text for all images (fixes no-alt violation) & increase h tag sizes (fixes header-order violation) ([e56a7ae](https://github.com/bcgov/cas-ciip-portal/commit/e56a7ae11eed97a1f0928bd2a82624f053d1291a))
* change contrast for contact/copyright pages (fixes color-contrast violation) ([8fc1078](https://github.com/bcgov/cas-ciip-portal/commit/8fc1078d55744dde20512475b369ca01723e9fad))
* change contrast in privacy page (fixes color contrast violation) ([d0e6980](https://github.com/bcgov/cas-ciip-portal/commit/d0e6980e863e28735b97c47e8f090f4bb991da89))
* ids should be unique on page for comments (view) fields ([d093dd0](https://github.com/bcgov/cas-ciip-portal/commit/d093dd08b4e262727a0f25ae7fe50ec55f5d4f14))
* increase contrast for a tags (fixes contrast violation) ([4f988c6](https://github.com/bcgov/cas-ciip-portal/commit/4f988c61f22b5b35e9f7d27a42a634846c5d52f4))
* increase size of first h tag to h1 (fixes no-header violation) ([80ea16e](https://github.com/bcgov/cas-ciip-portal/commit/80ea16e9a31d4a9299b5b7112ecb690087dc2ff5))
* Input label accessibility for application certifier email ([1dd72a3](https://github.com/bcgov/cas-ciip-portal/commit/1dd72a37ec73525d4c79262ed9fe68bbb05e2e48))
* make subheader & sitewide notice children of Header ([67467dc](https://github.com/bcgov/cas-ciip-portal/commit/67467dc5653e5b32c224d8d6e1bea24d28a1fdae))
* remove extra html tag ([3024b8e](https://github.com/bcgov/cas-ciip-portal/commit/3024b8ea9a8bc474405f857e9d1555588c0f1652))
* sort out some sizing issues after changing heading sizes ([5853ee1](https://github.com/bcgov/cas-ciip-portal/commit/5853ee1c7db02485b96d2d1560d33b67b88ec855))
* sqitch-check-immutable-files does not fail when a tag is added ([9181c67](https://github.com/bcgov/cas-ciip-portal/commit/9181c67ad657d141b6128b9312286d83ddd6b5e9))
* sqitch-check-immutable-files has to be run from the repo root ([bd4e476](https://github.com/bcgov/cas-ciip-portal/commit/bd4e47660a2e78d4ef70b2a56c7a0c969356312d))
* wrap page-content container in a div with role=main (satisfies 'Main Landmark' violation) ([2f553f6](https://github.com/bcgov/cas-ciip-portal/commit/2f553f6fc4ff22525c66818bd88583f34f2a068f))

## [1.5.0](https://github.com/bcgov/cas-ciip-portal/compare/v1.4.1...v1.5.0) (2020-08-12)


### Features

* add ciip_admin view ([8b65c9e](https://github.com/bcgov/cas-ciip-portal/commit/8b65c9e1f8710a1e28bdc6837a283357fa8d7564))
* add comments to view ([574bba3](https://github.com/bcgov/cas-ciip-portal/commit/574bba30fd56bd3a0538cb20c8ee75bc3ad87ecb))


### Bug Fixes

* Correct @storybook/addon-info version ([a8cedcd](https://github.com/bcgov/cas-ciip-portal/commit/a8cedcdd3f782fc8b9cea12dd7ee244e04ae1f8e))
* Ensure serialize-javascript pkg resolves to secured version ([31e5158](https://github.com/bcgov/cas-ciip-portal/commit/31e5158f3169490f8dce3ff89edf1d8522217920))
* handle edge case all products in an application have 0 emissions ([e99bb84](https://github.com/bcgov/cas-ciip-portal/commit/e99bb84e909d370df5de4782ca4eb97f52338053))
* undo change to immutable file & replace with sqitch-rework ([7e35a13](https://github.com/bcgov/cas-ciip-portal/commit/7e35a1352d308c7ec7622884611c232d49049b5e))
* Update Storybook to next major version to fix npm audit ([ca7ad59](https://github.com/bcgov/cas-ciip-portal/commit/ca7ad595f847621d540618c46c8db813840a5d30))

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
