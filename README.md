# Nexellia Desktop

Nexellia Desktop is a dedicated desktop process manager for
[Nexellia node](https://github.com/nexellia-network/nexelliad).

Nexellia Desktop process configuration (available via a simple JSON
editor) allows user to specify command-line arguments for executables,
as such it is possible to configure it to run multiple instances of
Nexellia or potentially run multiple networks simultaneously (provided
Nexellia nodes do not pro-actively auto-discover each-other).

Like many desktop applications, Nexellia Desktop can run in the tray
bar, out of the way.

Nexellia Desktop is built using [NWJS](https://nwjs.io) and is
compatible Windows, Linux and Mac OS X.

## Building Nexellia Desktop

### Pre-requisites

* [Node.js 14.0.0+](https://nodejs.org/)
* [Emanator](https://www.npmjs.com/package/emanator)

**NOTE:** Nexellia Desktop build process builds and includes latest
Nexellia binaries from Git master branches. To build from specific
branches, you can use `--branch...` flags (see below).

### Generating Nexellia Desktop installers

To build and deploy Nexellia Desktop production-ready builds, do the
following:

```
mkdir nexellia-build
cd nexellia-build
npm install emanator@latest
git clone https://github.com/nexellia-network/nexellia-desktop
cd nexellia-desktop
```

Emanator will help to create standalone desktop applications using
NWJS. It accepts the following flags:

* `--portable` will create a portable zipped application.
* `--innosetup` will generate Windows setup executable.
* `--dmg` will generate a DMG image for macOS.
* `--all` will generate all OS compatible packages.

Additionally the following flags can be used to reset the environment:

* `--clean` clean build folders: purges cloned `GOPATH` folder
* `--reset` deletes downloaded/cached NWJS and NODE binaries

The `--clean` and `--reset` can be combined to cleanup build folder
and cached files.

DMG - Building DMG images on macOS requires `sudo` access in order to
use system tools such as `diskutil` to generate images: 

```
sudo ../node_modules/.bin/emanate build --dmg
```

To build the Windows portable deployment, run the following command:

```
../node_modules/.bin/emanate build --archive --portable
```

To build the Windows installer, you need to install
[Innosetup](https://jrsoftware.org/isdl.php) and run:

```
../node_modules/.bin/emanate build --innosetup
```

Emanator stores build files in the `~/emanator` folder.

### Running Nexellia Desktop from development environment

In addition to Node.js (must be 14.0+), please download and install
[Latest NWJS SDK https://nwjs.io](https://nwjs.io/) - make sure that
`nw` executable is available in the system PATH and that you can run
`nw` from command line.

On Linux / Darwin, as good way to install `node` and `nwjs` is as
follows:

```
cd ~/
mkdir bin
cd bin

wget https://nodejs.org/dist/v14.4.0/node-v14.4.0-linux-x64.tar.xz
tar xvf node-v14.4.0-linux-x64.tar.xz
ln -s node-v14.4.0-linux-x64 node

wget https://dl.nwjs.io/v0.46.2/nwjs-sdk-v0.46.2-linux-x64.tar.gz
tar xvf nwjs-sdk-v0.46.2-linux-x64.tar.gz
ln -s nwjs-sdk-v0.46.2-linux-x64 nwjs

```
Once done add the following to `~/.bashrc`

```
export PATH="~/bin/node/bin:~/bin/nwjs:${PATH}"
```

The above method allows you to deploy latest binaries and manage
versions by re-targeting symlinks pointing to target folders.
Once you have `node` and `nwjs` working, you can continue with
Nexellia Desktop.

Nexellia Desktop installation:

```
git clone https://github.com/nexellia-network/nexellia-desktop
cd nexellia-desktop
npm install
npm install emanator@latest
node_modules/.bin/emanate --local-binaries
nw .
```

### Building installers from specific Nexellia Git branches

The `--branch` argument specifies common branch name for Nexellia, for
example:

```
node_modules/.bin/emanate --branch=2024_initial_nexellia_support
```

The branch for each repository can be overriden using
`--branch-<repo-name>=<branch-name>` arguments as follows:

```
emanate --branch=2024_initial_nexellia_support --branch-nexelliad=2024_fixes_next
```

## Nexellia Desktop Process Manager

### Configuration

Nexellia Desktop runtime configuration is declared using a JSON object.

Each instance of the process is declared using it's **type** (for
example: `nexelliad`) and a unique **identifier** (`kd0`). Most
process configuration objects support `args` property that allows
passing arguments or configuration options directly to the process
executable. The configuration is passed via configuration file
(nexelliad).

Supported process types:
- `nexelliad` - Nexellia full node

**NOTE:** For Nexellia, to specify multiple connection endpoints,
you must use an array of addresses as follows: `"args" : { "connect" : [ "peer-addr-port-a", "peer-addr-port-b", ...] }`

### Default Configuration File

```js
{
	"description": "Nexelliad Node",
	"modules": {
		"nexelliad:kd0": {
			"reset-peers": false,
			"args": {
				"rpclisten": "0.0.0.0:33455",
				"listen": "0.0.0.0:33456",
				"profile": 8110
			},
			"upnpEnabled": true
		}
	},
	"ident": "nexelliad-node-only",
	"network": "mainnet",
	"upnpEnabled": true,
	"dataDir": "",
	"theme": "light",
	"invertTerminals": false,
	"compounding": {
		"auto": false,
		"useLatestAddress": false
	}
}
```

### Data Storage

Nexellia Desktop stores it's configuration file as
`~/.nexellia-desktop/config.json`. Each configured process data is
stored in `<datadir>/<process-type>-<process-identifier>` where
`datadir` is a user-configurable location.  The default `datadir`
location is `~/.nexellia-desktop/data/`.  For example, `nexelliad`
process with identifier `kd0` will be stored in
`~/.nexellia-desktop/data/nexelliad-kd0/` and it's logs in
`~/.nexellia-desktop/data/nexelliad-kd0/logs/nexelliad.log`.

### Nexellia Binaries

Nexellia Desktop can run Nexellia from two locations:

1. From integrated `bin` folder that is included with Nexellia
   Desktop redistributables.
2. Fron `~/.nexellia-desktop/bin` folder that is created during
   the Nexellia build process.
