const fs = require('fs-extra')
const path = require('path')

const BaseCommand = require(`../Objects/Command`)
const Logger = require(`../Util/Logger`)

const AssemblePerm = require('../Permissions/PermNode').deserialize

const Collection = require(`discord.js`).Collection;

const CommandMetaDefault = {
  'file': null,
  'command': null,
  'aliases': [],
  'args': null,
  'perm': null,
  'description': null
}

class CommandsManager {
  /**
   * @param {Cast} cast A reference to the Cast instance that created this instance
   * @param {String} commandsPath The path of the folder containing the commands
   * @param {Plugin} [plugin] The plugin, if any, that owns the command.
   */
  constructor (cast, commandsPath, plugin = null) {
    /** A refernce to the Cast instance that created this instance */
    this.cast = cast
    /** The logger for this manager */
    this.logger = new Logger('CommandsManager')
    /** The path to index for commands */
    this.commandsPath = commandsPath
    /** The plugin that owns this command manager and its commands */
    this.plugin = plugin
    /** A map of commands tracked by this manager */
    this.commands = new Collection()
    /** A map of aliases to their commands */
    this.aliases = new Collection()
    /** A map of groups to their commands */
    this.groups = new Collection()
  }

  /**
   * Load a specific command
   *
   * @param {String} file The path of the command to load
   * @param {String} [group] The group the command belongs to, if any.
   * @param {CommandMetaDefault} [settings] The metadata of the command, if any.
   */
  load (file, group = null, settings = CommandMetaDefault) {
    try {
      var Command = require(file)
      if (!settings.command) {
        settings.command = settings.file
      }
      if (!settings.perm) {
        settings.perm = settings.command
      }
      if (!(settings.args instanceof Array)) {
        settings.args = [];
      }
      var loadedCommand = new Command(this.cast, settings, this.plugin)
      loadedCommand.permission = AssemblePerm(this.plugin ? `${this.plugin.metadata.bundleID}.${settings.perm}` : `native.${settings.perm}`)
      // Check to make sure this command extends the BaseCommand
      if (!(loadedCommand instanceof BaseCommand)) {
        this.logger.log(`The ${settings.file} command from the ${this.plugin ? this.plugin.metadata.bundleID : 'native'} plugin could not be loaded because it is invalid.`, true)
      } else {
        var command = settings.command ? settings.command : settings.file
        var alias = settings.aliases ? settings.aliases : []
        this.commands.set(command, loadedCommand)
        // Map the aliases to the command itself
        alias.forEach(a => {
          this.aliases.set(a, command)
        })
        this.groups.get(group).push(command)
      }
    } catch (e) {
      if (e.message.includes('Cannot find module')) {
        this.invalidMeta(settings, true)
      } else this.logger.logError(e)
    }
  }

  /**
   * Create a duplicated map of the groups to allow modification without affecting other services
   *
   * @return {Map} The duplicated map of groups
   */
  duplicateGroups () {
    var duplicated = new Map()
    this.groups.forEach((commands, group) => {
      duplicated.set(group, commands.slice())
    })
    return duplicated
  }

  /**
   * Get the command tied to the command name if it exists
   *
   * @param {String} cstr The command name
   * @return {Promise} A promise that resolves with the command
   */
  get (cstr) {
    return new Promise((resolve, reject) => {
      var alias = this.aliases.get(cstr)
      resolve(alias ? this.commands.get(alias) : this.commands.get(cstr))
    })
  }

  /**
   * Get the command tied to the command name if it exists, synchronously
   *
   * @param {String} cstr The command name
   * @return {Command} The command tied to the command name
   */
  getSync (cstr) {
    var alias = this.aliases.get(cstr)
    return alias ? this.commands.get(alias) : this.commands.get(cstr)
  }

  async loadCommands () {
    return this.loadCommandsSync()
  }

  /**
   * Load all commands from the directory passed in the constructor
   */
  loadCommandsSync () {
    var jsonPath = path.join(this.commandsPath, 'commands.json')
    if (fs.existsSync(jsonPath)) {
      try {
        var commandsMeta = require(jsonPath)
      } catch (e) {
        this.logger.log(`An error occurred while loading the commands.json file at ${jsonPath}`, true)
        this.logger.logError(e)
        return
      }
      Object.keys(commandsMeta.categories).forEach(c => {
        this.groups.set(c, [])
        commandsMeta.categories[c].forEach(command => {
          if (!command.file) return this.invalidMeta(command)
          this.load(path.join(this.commandsPath, command.file), c, command)
        })
      })
    } else {
      this.logger.log(`No commands.json found in ${jsonPath}! Commands will not be loaded`, true)
    }
  }

  /**
   * Generate an invalid meta message using any available data
   *
   * @param {CommandMetaDefault} availableMeta The available metadata
   * @param {boolean} [missing] Whether or not the command file is missing
   */
  invalidMeta (availableMeta, missing = false) {
    this.logger.log(`${this.plugin ? `The ${this.plugin.metadata.bundleID} plugin` : 'A plugin'} tried to load command '${availableMeta.file ? availableMeta.file : availableMeta.command ? availableMeta.command : 'a command'}' ${missing ? 'but it could not be found' : 'with invalid syntax'}!`, true)
  }
}

module.exports = CommandsManager
module.exports.CommandMetaDefault = CommandMetaDefault
