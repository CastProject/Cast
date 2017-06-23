const EventEmitter = require('events').EventEmitter
const fs = require(`fs-extra`)
const path = require(`path`)
const CommandsManager = require(`../Managers/CommandsManager`)
const Logger = require(`../Util/Logger`)

class Plugin extends EventEmitter {
  constructor (client, metadata, pluginPath, resolve = null) {
    super()
    this.client = client
    this.metadata = metadata
    this.metadata.pluginPath = pluginPath
    this.managers = {}
    if (metadata.commandsPath) {
      var cmdPath = path.join(pluginPath, metadata.commandsPath)
      if (fs.pathExistsSync(cmdPath)) {
        var cmdMgr = new CommandsManager(this.client, cmdPath, this)
        cmdMgr.loadCommandsSync()
        this.managers.commands = cmdMgr
      }
    }
    this.logger = new Logger(metadata.main);
    this.log = this.logger.log
    this.logError = this.logger.logError
  }
}

module.exports = Plugin
