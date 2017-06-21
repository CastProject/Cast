const fs = require('fs');
const path = require('path');

const BaseCommand = require(`../Objects/Command`);

const CommandMetaDefault = {
    "file": "mycommand",
    "args": ["arg1", "arg2"],
    "permissions": "ADMIN, MODERATOR, null"
}

class CommandsManager {
    constructor(client, commandsPath, plugin = null) {
        this.client = client;
        this.commandsPath = commandsPath;
        this.plugin = plugin;
        this.commands = new Map();
        this.aliases = new Map();
        this.loadCommands()
    }

    load(file, settings) {
        try {
            var Command = require(file);
            var loadedCommand = new Command(this.client);
            if (!loadedCommand instanceof BaseCommand) {
                this.client.log(`The ${settings.file} command from the ${settings.plugin} plugin could not be loaded because it is invalid.`, true)
            } else {
                var command = settings.command ? settings.command : settings.file
                var alias = settings.aliases ? settings.aliases : []
                var args = settings.args
                this.commands.set(command, {execute: loadedCommand.execute, args: args});
                alias.forEach(a => {
                    this.aliases.set(a, command)
                })
            }
        } catch (e) {

        }
    }

    loadCommands() {
        fs.exists(path.join(this.commandsPath, 'commands.json'), (exists) => {
            if (!exists) {
                this.client.log(`No commands.json found in ${path}! Commands will not be loaded`, true)
                return;
            }
            var commandsMeta = require(path.join(this.commandsPath, 'commands.json'));
            Object.keys(commandsMeta.categories).forEach(c => {
                commandsMeta.categories[c].forEach(command => {
                    if (!command.file) return;
                    this.load(path.join(this.commandsPath, command.file), command)
                })
            })
        })
    }
}

module.exports = CommandsManager;
module.exports.CommandMetaDefault = CommandMetaDefault;