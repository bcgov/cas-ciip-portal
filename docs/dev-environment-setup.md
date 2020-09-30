# Setting up the Development Environment

## Purpose

The purpose of this exercise is to enable a developer new to the project to get a local environment fully set up on their machine and ready to start contributing to the repository.

## 1. Repository and Version Control

- Ensure you have push access (most likely by being added to the **@bcgov/cas-developers** GitHub team) to [bcgov/cas-ciip-portal](https://github.com/bcgov/cas-ciip-portal).
  - If you will be making pull requests to the repository, you'll also need to be added to the **@bcgov/cas** GitHub team for the CircleCI security context needed to run some jobs which need access to our OpenShift cluster.
- Ensure you have [GPG commit signing](https://docs.github.com/en/github/authenticating-to-github/signing-commits) set up on your local environment.
  - First, ensure your `git config user.email` is set to the email address you want to use for signing.
  - You can verify it's working when you commit to a branch and the signature is indicated by `git log --show-signature`. Once pushed, a "Verified" badge appears next to your commits on GitHub.
- Clone a local copy of [bcgov/cas-ciip-portal](https://github.com/bcgov/cas-ciip-portal).
- This project uses Git submodules to incorporate other CAS-maintained repositories. Configuring a [post-checkout Git hook](https://ttboj.wordpress.com/2014/05/06/keeping-git-submodules-in-sync-with-your-branches/) in your local repository can help smooth the experience of using submodules.
- From the project root, run `git submodule update --init` to initialize the submodules and checkout the appropriate state based on the specifications in [`.gitmodules`](../.gitmodules).

## 2. Package Management

[asdf](https://asdf-vm.com/#/) is a universal package manager used in this project to install and manage versions of the tools listed in [`.tool-versions`](../.tool-versions). To do this, several asdf plugins will be installed as well.

- [Install asdf](https://asdf-vm.com/#/core-manage-asdf) using your system's package manager
- From the project root, run `make install_asdf_tools`, which installs the [additional asdf plugins](https://asdf-vm.com/#/plugins-all) needed to manage the various tools in [`.tool-versions`](../.tool-versions).
  - this script also [imports the Node.js release team's OpenPGP keys](https://xscode.com/asdf-vm/asdf-nodejs) for checksum verification.
  - the script also attempts to install Postgres `--with-libxml` via asdf to include a database plugin for XML. Your system will need `libxml2` installed for this.
  - lastly, it installs `pip` dependencies that relate to `pre-commit`, which helps us run linters to keep things tidy.
  - you can verify pre-commit works by running: `pre-commit run --all-files` from the project root.
  - troubleshooting: `make install_asdf_tools --dry-run` can be helpful to see what is being run.
- You may need to troubleshoot individual steps in `make install_asdf_tools` on your system; in that case, find this target in the [root `Makefile`](../Makefile) and run the steps individually.
- `asdf reshim` should be run after asdf installations to update symlinks for the installed packages.
- Set the version of Postgres installed by asdf [as the global version](https://asdf-vm.com/#/core-manage-versions?id=set-current-version), necessary to prevent later problems installing Sqitch, our database migration tool.
- `psql --version` should verify the installed version of Postgres.
- [Yarn](https://yarnpkg.com/) is used as the Javascript package manager, and was installed in this step by asdf from the [`.tool-versions`](../.tool-versions). All `yarn` commands must be run from the same directory as the `package.json` (within `app/`).

**If you're on Linux**, you can now skip to [Step 4](#4-set-up-a-working-perl-5-environment).

## 2.5 MacOS-Specific Troubleshooting

If your MacOS command line tools were installed before upgrading to Catalina and haven't already been fixed afterward, you will need to do so now. Outstanding problems installing Postgres due to errors in compiling C libraries in the previous step could indicate this. [Read more about the problem here](https://stackoverflow.com/questions/58278260/cant-compile-a-c-program-on-a-mac-after-upgrading-to-catalina-10-15/58278392#58278392).

The full version of XCode (> 20GB) downloaded from the App Store reportedly works as intended, but if you prefer to use the smaller subset of command line tools installed via `xcode-select --install` (or manually downloaded and installed from the [Apple Developer support page](https://developer.apple.com/download/more/?=command%20line%20tools)), then you can set the `SDKROOT` environment variable in your `~/.bash_profile`:

```bash
export SDKROOT="/Library/Developer/CommandLineTools/SDKs/MacOSX10.15.sdk/"
```

...making sure to replace the above path with the actual location and version of your command line tools. Note you will need to manually update this path / version number whenever the command line tools are updated.

`source ~/.bash_profile` and re-attempt the Postgres installation above.

## 3. Configure Postgres on MacOS

This step is only necessary for MacOS users to set up their local Postgres database (installed by asdf in the last step) to reflect the system defaults on Linux (and by extension, on the server).

- Start / stop a Postgres service with `pg_ctl start` and `pg_ctl stop`
- Following the [Postgres docs](https://www.postgresql.org/docs/11/tutorial-createdb.html):
  > A convenient choice is to create a database with the same name as your current user name\*. Many tools assume that database name as the default [database], so it can save you some typing. To create that database, simply type: `createdb`
- \* On BCGov computers, this username is likely your IDIR in lowercase (verify with `echo $(whoami)`).
- Verify the database was created using `psql --list`.
- A Postgres user (aka. role) named `postgres` must be created manually on MacOS, but is created automatically for new installations on Linux:
  - Enter the psql shell with: `psql` to connect to the default database, then list all existing roles using `\du`. There should be a default role named after your sytem username.
  - Enter a SQL statement creating a new role named `postgres` with the same permissions as the above role:
    ```sql
    create role postgres with login superuser createrole createdb replication bypassrls;
    ```
  - List all roles again to ensure `postgres` was created with the appropriate permissions.

## 4. Set up a Working Perl 5 Environment

Although Perl is not specifically used in this project, our database migration tool [Sqitch](https://sqitch.org/) requires a working Perl 5 environment. Unfortunately, there is [no asdf plugin](https://asdf-vm.com/#/plugins-all) for Perl, so we must manage this ourselves.

**NOTE**: As the Perl ecosystem hasn't kept pace with the conveniences of modern times, for most people this tends to be the most problematic step.

- Use your system package manager to install Perl, ensure the version is >= 5, and add this perl to your `$PATH`.
  - Alternatively, you can try using [Perlbrew](https://perlbrew.pl/) to install, which helps to manage multiple local Perl versions.
  - **If using MacOS**: Unfortunately, the pre-installed system Perl cannot be relied upon; certain critical headers are missing. **Use Homebrew to re-install Perl 5 and ensure that is the perl in your `$PATH`**.
    - Use [Perlbrew](https://perlbrew.pl/) if you might switch between multiple Perl versions, or: `brew update && brew install perl`
    - it must be installed somewhere with **regular user permissions** such as `/usr/local/Cellar/` - not somewhere like `/Library/` that requires unsafe root permissions to install further Perl modules.
    - Homebrew should install perl in the appropriate location by default.
- From the project root, run `make install_perl_tools`. This invokes the `install` target in `schema/Makefile`.

  - You may again need to troubleshoot individual steps in `make install_perl_tools` on your system; in that case, find the `install` target in [`schema/Makefile`](../schema/Makefile) and run the steps individually.
  - This script installs the Perl package manager [cpanm](https://metacpan.org/pod/distribution/App-cpanminus/bin/cpanm) (_aka._ cpanminus) and then invokes it to install Perl dependencies from the `schema/cpanfile`. Namely, these dependencies are:
    - the Postgres database driver for Perl, [DBD::Pg](https://metacpan.org/pod/DBD::Pg)
    - the database migration tool, [Sqitch](https://sqitch.org)
    - the database unit test runner, [pgTAP](https://pgtap.org/)
  - By default, cpanm runs each package's tests after installation, which can be quite time-consuming. For this reason, the `make install_perl_tools` script uses `cpanm --notest` to skip tests while installing.
  - If successful, the `post_install_check` target that is run as part of `make install_perl_tools` should output the installed version of Sqitch.

- **Troubleshooting**:

  - Ensure the version of Postgres installed by asdf in Step 2 was set [as the global version](https://asdf-vm.com/#/core-manage-versions?id=set-current-version) using `asdf global` _before_ installing Sqitch; otherwise, Sqitch may install a separate instance of Postgres.
  - Sqitch can alternatively be installed on MacOS with `brew tap sqitchers/sqitch && brew install sqitch`.
  - If you're on **MacOS** and having trouble with Perl libraries ignoring your newly installed (and thus, properly functioning) Perl in favour of an older system Perl, you can use the [`$PERL5LIB` environment variable](http://mvp.kablamo.org/dependencies/perl5lib/) to point it to the desired location. For example, point it to the new Perl you installed with non-root / regular user permissions instead of the root-installed system Perl.
  - `local::lib` may need some help finding its local configuration and paths, these can be set through environment variables.
    [More information in that documentation](https://metacpan.org/pod/release/GETTY/local-lib-1.006007/lib/local/lib.pm).

  ```bash
   ~/.bashrc:
       export PERL5LIB=~/lib/perl5/lib/perl5/

       PERL_LOCAL_LIB_ROOT="/Users/$(whoami)/lib/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
       PERL_MB_OPT="--install_base \"/Users/$(whoami)/lib/perl5\""; export PERL_MB_OPT;
       PERL_MM_OPT="INSTALL_BASE=/Users/$(whoami)/lib/perl5"; export PERL_MM_OPT;
  ```

## 5. Install pgTAP

Ensure the postgres service is running with `pg_ctl start`.

```
cd schema && make install_pgtap
```

This clones and builds [pgTAP](https://pgtap.org/), the database unit testing library from source. The cloned repository will be left behind (visible with `git status`), which you can safely remove after the installation is complete.

## 6. Deploy the Development Database

```
createdb ciip_portal_dev ciip_portal_test
```

`psql --list` to verify the databases were created.

Rather than interacting with Sqitch directly, we use a [custom script](../schema/data/deploy-data.sh) for convenience to deploy the database, including seed data for dev, test and production.

From the project root, run `.bin/deploy-data.sh --help` to see possible options. In development, this is most commonly run with `.bin/deploy-data.sh -d -dev` to drop the current database and redeploy after pulling down database-changing work from the remote or tampering with the database.

## 7. Running the Web Application

### App Environment Variables

Create an `app/.env` file and copy the contents of [`app/.env.example`](../app/.env.example) into it. Ask a teammate for example values.

### (optional) SMTP Server

It's not necessary for every development task, but in order to run the full suite of end-to-end tests or to view or develop transactional emails triggered by the application, a local SMTP server is required. This is most quickly done using Docker to run MailHog.

Ensure [Docker is installed](https://www.docker.com/get-started) and running, then:

```
sudo docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

This uses SMTP port 1025 to start a MailHog server on `localhost:8025` where you can view emails. It can be stopped by using `docker ps` to get the container ID and `docker stop <id>`.

### Install Javascript Dependencies

Install the `node_modules` including `devDependencies` from the `package.json`:

```
cd app && yarn --dev
```

### Run the Server

Run the development server with `yarn dev` and navigate in your browser to `localhost:3004`.

Work that changes Relay GraphQL queries will require you to re-run `yarn build:relay` (which alternatively can be run using a `--watch` flag).

### GraphQL Query Debugger

Graphiql is an interactive in-browser GraphQL IDE available in development at `localhost:3004/graphiql`. It is handy for developing queries interactively before inserting them into a Relay fragment.

### Voyager

Voyager is an API graph explorer for GraphQL and is available in development at `localhost:3004/voyager`.

## 7.5 Bypass Authentication in Development

There are some shortcuts to bypass authentication in development and run the server while logged in as a preset user:

```
cd app && yarn dev <AS_USER>
```

...where `<AS_USER>` is one of the following:

```
AS_REPORTER
AS_CERTIFIER
AS_ANALYST
AS_ADMIN
AS_PENDING
```

[Learn more here](./all-views-inventory.md) about the functionality available to each user type.

## 8. Run Tests

### Unit Tests with Jest

```
cd app && yarn test
```

Front-end unit tests are heavily snapshot-based. Work that changes the DOM will result in a diff from the last accepted snapshot and cause related tests to fail. You can update the snapshots and review / accept the diff with `yarn test -u`.

### Database Unit Tests with pgTAP

```
cd schema && make unit
```

### End-to-end Tests with Cypress

#### Cypress Environment

Ask a teammate for the `app/cypress.env.json`, which specifies some preset usernames and passwords required by the tests.

#### Test Email Server

A local SMTP server is a precondition for running the email specs (for example, if running the entire suite), for which you can [use Docker to run MailHog](#optional-smtp-server).

#### Run Cypress Specs

First, ensure the web app is running (`cd app && yarn dev`) _without_ bypassing authentication using `AS_REPORTER` or similar auth flags. Running the app with the following flags will prevent certain asynchronously rendered components from causing spurious failures:

```
cd app

NO_PDF=true NO_MATHJAX=true yarn dev
```

For test error debugging and to observe tests' behavior in the browser as they run:

```
cd app && yarn cypress
```

To run the tests more efficiently in a headless mode:

```
cd app && yarn test:e2e
```

[Options](https://docs.cypress.io/guides/guides/command-line.html#cypress-run) can be passed to Cypress through this command, for example to run an individual test or subset:

```
cd app && yarn test:e2e --spec cypress/integration/accessibility/*
```

## 9. Tidy Your Work

[pre-commit](https://pre-commit.com/) runs a variety of formatting and lint checks configured in [`.pre-commit-config.yaml`](../.pre-commit-config.yaml) which are required for a pull request to pass CircleCI.

`pre-commit install` will [configure a pre-commit hook to run before every commit](https://pre-commit.com/#usage); alternatively, you can run it manually with:

```
pre-commit run --all-files
```

If you are impatient and your work is isolated to Javascript, it may be faster to run only the linter and formatter (`eslint` and `prettier`), but it may not catch everything (such as the end-of-file fixer and trailing whitespace):

```
yarn lint && yarn format
```

## 10. Commit Something

### Commit Message Conventions

This project follows the commit message conventions outlined by [Convential Commits](https://www.conventionalcommits.org/). Besides the standard commit types (message prefixes) **feat** and **fix**, we use some other types described there based on the Angular convention; some common ones among those are **test**, **docs**, **chore** and **refactor**.

These facilitate the automated creation of [changelogs](../CHANGELOG.md).

We also extend this prefix convention to the naming of **branches**, eg: `docs/add-readme` or `feat/some-feature`.

### Victory Lap

Using the above conventions, make a branch with your name called `feat/my-name-onboarding` and add a high five somewhere in the README:

```
🙌
```

Make a **draft** pull request against the default branch, and request another developer's review. This will not be merged, but pushing to GitHub and running CircleCI steps will help verify you have all the correct permissions and signed commits.
