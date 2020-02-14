# Yarn Upgrade Minor

The goal of this package is upgrade the `Node` modules of the current project (based on current directory) to the latest version but sticking to the current major release.

If we do:

```
$ yarn upgrade --help
```

then we get:

```
  Usage: yarn upgrade [flags]

  Upgrades packages to their latest version based on the specified range.

  Options:

    -v, --version                       output the version number
    --no-default-rc                     prevent Yarn from automatically detecting yarnrc and npmrc files
    --use-yarnrc <path>                 specifies a yarnrc file that Yarn should use (.yarnrc only, not .npmrc) (default: )
    --verbose                           output verbose messages on internal operations
    --offline                           trigger an error if any required dependencies are not available in local cache
    --prefer-offline                    use network only if dependencies are not available in local cache
    --enable-pnp, --pnp                 enable the Plug'n'Play installation
    --disable-pnp                       disable the Plug'n'Play installation
    --strict-semver
    --json                              format Yarn log messages as lines of JSON (see jsonlines.org)
    --ignore-scripts                    don't run lifecycle scripts
    --har                               save HAR output of network traffic
    --ignore-platform                   ignore platform checks
    --ignore-engines                    ignore engines check
    --ignore-optional                   ignore optional dependencies
    --force                             install and build packages even if they were built before, overwrite lockfile
    --skip-integrity-check              run install without checking if node_modules is installed
    --check-files                       install will verify file tree of packages for consistency
    --no-bin-links                      don't generate bin links when setting up packages
    --flat                              only allow one version of a package
    --prod, --production [prod]
    --no-lockfile                       don't read or generate a lockfile
    --pure-lockfile                     don't generate a lockfile
    --frozen-lockfile                   don't generate a lockfile and fail if an update is needed
    --update-checksums                  update package checksums from current repository
    --link-duplicates                   create hardlinks to the repeated modules in node_modules
    --link-folder <path>                specify a custom folder to store global links
    --global-folder <path>              specify a custom folder to store global packages
    --modules-folder <path>             rather than installing modules into the node_modules folder relative to the cwd, output them here
    --preferred-cache-folder <path>     specify a custom folder to store the yarn cache if possible
    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --mutex <type>[:specifier]          use a mutex to ensure only one yarn instance is executing
    --emoji [bool]                      enable emoji in output (default: false)
    -s, --silent                        skip Yarn console logs, other types of logs (script output) will be printed
    --cwd <cwd>                         working directory to use (default: D:\wamp-laragon\instances\live-tlg\www)
    --proxy <host>
    --https-proxy <host>
    --registry <url>                    override configuration registry
    --no-progress                       disable progress bar
    --network-concurrency <number>      maximum number of concurrent network requests
    --network-timeout <milliseconds>    TCP timeout for network requests
    --non-interactive                   do not show interactive prompts
    --scripts-prepend-node-path [bool]  prepend the node executable dir to the PATH in scripts
    --no-node-version-check             do not warn when using a potentially unsupported Node version
    --focus                             Focus on a single workspace by installing remote copies of its sibling workspaces.
    --otp <otpcode>                     one-time password for two factor authentication
    -S, --scope <scope>                 upgrade packages under the specified scope
    -L, --latest                        list the latest version of packages, ignoring version ranges in package.json
    -E, --exact                         install exact version. Only used when --latest is specified.
    -P, --pattern [pattern]             upgrade packages that match pattern
    -T, --tilde                         install most recent release with the same minor version. Only used when --latest is specified.
    -C, --caret                         install most recent release with the same major version. Only used when --latest is specified.
    -A, --audit                         Run vulnerability audit on installed packages
    -h, --help                          output usage information
  Visit https://yarnpkg.com/en/docs/cli/upgrade for documentation about this command.
```

where we can see:

```
-C, --caret >>> install most recent release with the same major version. Only used when --latest is specified.
```

But unfortunatelly, the command: `$ yarn upgrade --latest --caret` upgrades the major version as well.

In the other hand, the command: `$ yarn upgrade` doesn't update the file: `package.json` (which is very convenient).

### System info:

```
$ node -v
v10.16.3

$ npm -v
6.9.0

$ yarn -v
1.19.1
```

## Usage

```
$ yarn global add yarn-upgrade-minor
$ cd my-project
$ yarn-upgrade-minor
```
