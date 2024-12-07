# Nexell-AI Desktop

Nexell-AI Desktop is a dedicated desktop process manager for
[Nexellia node](https://github.com/nexell-ai-network/nexelliad).



### Running Nexell-AI Desktop from binary

```
wget https://github.com/Nexell-AI-Network/nexellia-desktop-wallet/releases/download/v1.0.2/nexellia-desktop-v1.0.2-linux-x64.zip
cd nexellia-desktop
nw .
```


### Building Nexell-AI Desktop from source

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
Nexell-AI Desktop.

Nexell-AI Desktop installation:

```
git clone https://github.com/nexell-ai-network/nexellia-desktop
cd nexellia-desktop
npm install
npm install emanator@latest
node_modules/.bin/emanate --local-binaries
nw .
```


### Configuration

Nexell-AI Desktop runtime configuration is declared using a JSON object.

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

Nexell-AI Desktop stores it's configuration file as
`~/.nexellia-desktop/config.json`. Each configured process data is
stored in `<datadir>/<process-type>-<process-identifier>` where
`datadir` is a user-configurable location.  The default `datadir`
location is `~/.nexellia-desktop/data/`.  For example, `nexelliad`
process with identifier `kd0` will be stored in
`~/.nexellia-desktop/data/nexelliad-kd0/` and it's logs in
`~/.nexellia-desktop/data/nexelliad-kd0/logs/nexelliad.log`.
