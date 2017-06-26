# CastAPI
The backing API of Cast, for plugins to be developed against.

![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)
[![Join the Cast Discord](https://img.shields.io/badge/chat-Cast%20Discord-blue.svg)](https://discord.gg/nabFtKN)

## What is CastAPI?
CastAPI is what you develop against in order to create plugins that run on all
Cast-compatible bots, including the 
[official reference implementation](https://github.com/CastProject/Cast).

CastAPI is intended for developers looking to target the Cast platform.
If you are simply looking to host an instance of Cast and add in your own
plugins, head over to [CastProject/Cast](https://github.com/CastProject/Cast)

### What do plugins offer?
Plugins offer many features that enhance your code above shipping as a
standalone bot. For instance:
* Plugins can be easily toggled on and off by a server admin.
* Your plugin can react to a prebuilt permissions system, and a server owner
knows what to expect from any plugin that uses permissions.
* Your plugin can easily be included alongside other plugins

Most importantly, with plugins you can focus on writing the implementation of your
specific features in a modular way, while allowing the implementation of the
bot to be handled by the Cast Project.

### What do plugins look like?
[An example plugin for Cast can be found here.](https://github.com/CastProject/Cast/tree/master/Plugins/Developer)

## Getting Started
This section is relevant to anyone looking to develop CastAPI plugins. If you
are looking to host an instance of Cast, see the
[official Cast bot](https://github.com/CastProject/Cast) here.

Cast works atop JavaScript, Node.js, and Discord.js. Understanding how those
technologies work is recommended before diving into Cast plugin creation.

Once you have some understanding of the underlying libraries, you can
check out the [page on plugins](https://github.com/CastProject/CastAPI/wiki/Plugins)
in the CastAPI wiki, along with any other information.

We recommend joining the [Cast Discord](https://discord.gg/nabFtKN) where you
can ask questions and get answers to questions relating to Cast's API,
as well as recommend joining the [Discord API](https://discord.gg/discord-api) server for help relating to
Discord.js and the Discord API in general.

## Licensing
Like the [Cast reference implementation](https://github.com/CastProject/Cast), CastAPI is licensed under the
MIT License. You may do what you like with the code, and include it in 
both free and proprietary works, as long as you include the license text
as attribution in both source code and binary forms of your bot.