const EventEmitter = require('events').EventEmitter
const fs = require(`fs-extra`)
const path = require(`path`)
const CommandsManager = require(`../Managers/CommandsManager`)
const Logger = require(`../Util/Logger`)

const Plugin = class BasePlugin extends EventEmitter {
  
  /**
   * 
   * @param {Client} client The client that created this instance
   * @param {Object} metadata The metadata for this plugin
   * @param {String} pluginPath The path to the plugin directory
   */
  constructor (client, metadata, pluginPath) {
    super()
    /** A reference to the client that created this instance */
    this.client = client
    /** A reference to the plugin metadata, identical to plugins.json */
    this.metadata = metadata
    this.metadata.pluginPath = pluginPath
    /** The managers for this plugin */
    this.managers = {}
    if (metadata.commandsPath) {
      var cmdPath = path.join(pluginPath, metadata.commandsPath)
      if (fs.pathExistsSync(cmdPath)) {
        var cmdMgr = new CommandsManager(this.client, cmdPath, this)
        cmdMgr.loadCommandsSync()
        /** The commands manager for this plugin */
        this.managers.commands = cmdMgr
      }
    }
    this.logger = new Logger(metadata.main)
    this.prefix = this.logger.prefix
    this.log = this.logger.log
    this.logError = this.logger.logError
  }
}

module.exports = Plugin;