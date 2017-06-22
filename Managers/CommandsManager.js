const fs = require('fs-extra')
const path = require('path')

const BaseCommand = require(`../Objects/Command`)

const CommandMetaDefault = {
  'file': 'mycommand',
  'args': ['arg1', 'arg2'],
  'permissions': 'ADMIN, MODERATOR, null'
}

class CommandsManager {
  constructor (client, commandsPath, plugin = null) {
    this.client = client
    this.commandsPath = commandsPath
    this.plugin = plugin
    this.commands = new Map()
    this.aliases = new Map()
    this.groups = new Map()
  }

  load (file, group, settings) {
    try {
      var Command = require(file)
      var loadedCommand = new Command(this.client, settings)
      if (!(loadedCommand instanceof BaseCommand)) {
        this.client.log(`The ${settings.file} command from the ${settings.plugin} plugin could not be loaded because it is invalid.`, true)
      } else {
        var command = settings.command ? settings.command : settings.file
        var alias = settings.aliases ? settings.aliases : []
        this.commands.set(command, loadedCommand)
        alias.forEach(a => {
          this.aliases.set(a, command)
        })
        this.groups.get(group).push(command)
      }
    } catch (e) {
      if (e.message.includes('Cannot find module')) {
        this.invalidMeta(settings, true)
      } else this.client.logError(e)
    }
  }

  get (cstr) {
    return new Promise((resolve, reject) => {
      var alias = this.aliases.get(cstr)
      resolve(alias ? this.commands.get(alias) : this.commands.get(cstr))
    })
  }

  loadCommands () {
    return new Promise((resolve, reject) => {
      var jsonPath = path.join(this.commandsPath, 'commands.json')
      fs.exists(jsonPath).then(exists => {
        if (!exists) {
          this.client.log(`No commands.json found in ${jsonPath}! Commands will not be loaded`, true)
          return resolve()
        }
        try {
          var commandsMeta = require(jsonPath)
        } catch (e) {
          this.client.log(`An error occurred while loading the commands.json file at ${jsonPath}`, true)
          this.client.logError(e)
          return resolve()
        }
        Object.keys(commandsMeta.categories).forEach(c => {
          this.groups.set(c, [])
          commandsMeta.categories[c].forEach(command => {
            if (!command.file) return this.invalidMeta(command)
            this.load(path.join(this.commandsPath, command.file), c, command)
          })
        })
        resolve()
      })
    })
  }

  invalidMeta (availableMeta, missing = false) {
    this.client.log(`${availableMeta.plugin ? `The ${availableMeta.plugin} plugin` : 'A plugin'} tried to load command '${availableMeta.file ? availableMeta.file : availableMeta.command ? availableMeta.command : 'a command'}' ${missing ? 'but it could not be found' : 'with invalid syntax'}!`, true)
  }
}

module.exports = CommandsManager
module.exports.CommandMetaDefault = CommandMetaDefault
