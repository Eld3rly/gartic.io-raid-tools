# Gartic.io Raid Tools
 
<img src="https://cdn.upload.systems/uploads/RRzSjTjj.png" width="900">

### Raid menu for the online game [gartic.io](https://gartic.io/)

### Written by [Eld3rly](https://github.com/Eld3rly)

## Installation

Clone the repo:

```console
$ git clone https://github.com/Eld3rly/gartic.io-raid-tools
$ cd gartic.io-raid-tools
```

Install dependencies:

```console
$ npm install
```

Finally, run it:
```console
$ node index.js
```

## Commands

### Spam:

The command is intended for spam in room chat

`Arguments:`

The first argument you must specify is the ServerID, see below for how to get it.

The second argument is InviteCode, see below for how to get it.

The third argument is name of the bots.

The fourth argument is the number of bots you want to spam.

The fifth argument is the message you want to spam.

### Connect:

The command is intended for connecting to the room.

`Arguments:`

The first argument you must specify is the ServerID, see below for how to get it.

The second argument is InviteCode, see below for how to get it.

The third argument is name of the bots.

The fourth argument is the number of bots you want to spam.

The fifth argument is the choice of fashion epilepsm.

`If True, then random colors will appear on the screen while the bot draws`

### Cfg:

This command is designed to start an attack using the config

Example:

`config.json`
```json
{
    "mode": "spam",
    "id": 0,
    "name": "Example",
    "invite": "0000",
    "amount": 0,
    "message": "Example"
}
```

or

`config.json`
```json
{
    "mode": "connect",
    "id": 0,
    "name": "Example",
    "invite": "0000",
    "amount": 0,
    "epilepsy": true
}
```

## How to find the Server ID and the Invite code

First of all you need to know the Server ID:

Press `CTRL + SHIFT + E` in your browser and select filter by websockets (WS)

In the headers of the websocket you can find the ServerID

<img src="https://cdn.upload.systems/uploads/b2jKSy68.png" width="450">

In the answers you can find the Invite code

<img src="https://cdn.upload.systems/uploads/qcMui30c.png" width="450">

