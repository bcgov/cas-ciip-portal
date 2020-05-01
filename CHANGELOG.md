# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
