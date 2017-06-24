const MetaDefaults = {
  bundleID: null,
  main: null,
  commandsPath: null,
  disabledByDefault: true,
  version: '0.0.1',
  dev: true,
  dm: false
}

const LoadOptions = {
  autogen: true
}

const PluginMeta = 'plugin.json'

const BasePlugin = require('../Objects/Plugin')

const Discord = require('discord.js')

const Util = Discord.Util

const Events = Discord.Constants.Events

const path = require(`path`)
const fs = require(`fs-extra`)

class PluginManager {
  /**
   * @param {Discord.Client} client A reference to the client that created the instance
   * @param {String} dir The path the plugins are stored in
   */
  constructor (client, dir) {
    this.client = client
    this.dir = dir
    this.plugins = new Map()
  }

  /**
   * Load a specific plugin
   *
   * @param {String} dir The path to the specific plugin
   */
  load (dir) {
    return new Promise((resolve, reject) => {
      fs.pathExists(path.join(dir, PluginMeta)).then(exists => {
        var loadedMeta = {}
        try {
          loadedMeta = require(path.join(dir, PluginMeta))
        } catch (e) {
          if (e.name !== 'SyntaxError' && !e.message.includes('Cannot find module')) {
            this.client.logError(e)
            return resolve()
          } else if (e.message.includes('Cannot find module')) {
            this.client.log(`${dir} is an invalid plugin!`, true)
            return resolve()
          }
        }
        // Adds any missing variables to the plugin config, read from the default plugin config. Likely to fail if the default is null.
        loadedMeta = Util.mergeDefault(MetaDefaults, loadedMeta)
        if (!loadedMeta.main) {
          return this.client.log(`Plugin doesn't have a main class in ${path.join(dir, PluginMeta)}`, true)
        }
        var exists = fs.existsSync(path.join(dir, loadedMeta.main))
        if (!exists) return this.client.log(`Plugin doesn't have a main class in ${path.join(dir, PluginMeta)}`, true)
        var PluginMain = require(path.join(dir, loadedMeta.main))
        var newPlugin = new PluginMain(this.client, loadedMeta)
        if (!(newPlugin instanceof BasePlugin)) return this.client.log(`${loadedMeta.bundleID} does not have a main class that conforms to the Cast BasePlugin. Disabling.`, true)
        this.plugins.set(loadedMeta.bundleID, {plugin: newPlugin, meta: loadedMeta})
        if (PluginMain.events) {
          if (!(PluginMain.events instanceof Array)) return this.client.log(`${loadedMeta.bundleID} did not have an Array for their events variable. Events will not be loaded.`, true)
          this.attachEvents(newPlugin, PluginMain.events)
        }
        resolve()
      })
    })
  }

  /**
   *
   * @param {String} dir
   * @param {LoadOptions} [opts]
   */
  loadAll (dir = this.dir, opts = LoadOptions) {
    return new Promise((resolve, reject) => {
      fs.pathExists(dir).then(e => {
        if (!e) {
          this.client.log(`Plugin directory does not exist: ${dir} - ${opts.autogen ? 'Creating' : 'Skipping'}`)
          if (!opts.autogen) return resolve()
          fs.mkdir(dir).catch(e => {
            this.client.logError(e)
            return resolve()
          })
        }
        // Loop through directory and load them
        fs.readdir(dir).then(directory => {
          if (directory.length === 0) return resolve()
          directory.forEach((plDir, index) => {
            this.load(path.join(dir, plDir)).then(() => {
              if (index === directory.length - 1) return resolve()
            })
          })
        })
      })
    })
  }

  /**
   * Listens for events on a given plugin
   * @param {Plugin} plugin
   * @param {String[]} [events]
   */
  attachEvents (plugin, events = [], self = this) {
    if (!events || events.length === 0) return
    var listens = event => events.indexOf(event) > -1
    var validate = function (...object) {
      var validated = false
      object.some(o => {
        if (o instanceof Discord.Guild) {
          return validated = !self.pluginDisabled(plugin.metadata.bundleID, o)
        } else if (o.guild) {
          return validated = !self.pluginDisabled(plugin.metadata.bundleID, o.guild)
        } else if (o.message) {
          return validated = !self.pluginDisabled(plugin.metadata.bundleID, o.message.guild)
        } else if (plugin.metadata.dm) {
          return validated = true;
        }
        return validated = false
      })
      return validated
    }
    var noArg = event => {
      this.client.on(event, () => plugin.emit(event))
    }
    var oneArg = (event, checkGuild = true) => {
      this.client.on(event, arg => {
        if (checkGuild && !validate(arg)) return
        plugin.emit(event, arg)
      })
    }
    var twoArg = (event, checkGuild = true) => {
      this.client.on(event, (arg1, arg2) => {
        if (checkGuild && !validate(arg1, arg2)) return
        plugin.emit(event, arg1, arg2)
      })
    }
    var threeArg = (event, checkGuild = true) => {
      this.client.on(event, (arg1, arg2, arg3) => {
        if (checkGuild && !validate(arg1, arg2, arg3)) return
        plugin.emit(event, arg1, arg2, arg3)
      })
    }
    if (listens(Events.READY)) oneArg(Events.READY, false)
    if (listens(Events.CHANNEL_CREATE)) oneArg(Events.CHANNEL_CREATE)
    if (listens(Events.CHANNEL_DELETE)) oneArg(Events.CHANNEL_DELETE)
    if (listens(Events.CHANNEL_PINS_UPDATE)) twoArg(Events.CHANNEL_PINS_UPDATE)
    if (listens(Events.CHANNEL_UPDATE)) twoArg(Events.CHANNEL_UPDATE)
    if (listens(Events.CLIENT_USER_SETTINGS_UPDATE)) oneArg(Events.CLIENT_USER_SETTINGS_UPDATE, false)
    if (listens(Events.DEBUG)) oneArg(Events.DEBUG, false)
    if (listens(Events.DISCONNECT)) oneArg(Events.DISCONNECT, false)
    if (listens(Events.GUILD_EMOJI_CREATE)) oneArg(Events.GUILD_EMOJI_CREATE)
    if (listens(Events.GUILD_EMOJI_DELETE)) oneArg(Events.GUILD_EMOJI_DELETE)
    if (listens(Events.GUILD_EMOJI_UPDATE)) oneArg(Events.GUILD_EMOJI_UPDATE)
    if (listens(Events.GUILD_BAN_ADD)) twoArg(Events.GUILD_BAN_ADD)
    if (listens(Events.GUILD_BAN_REMOVE)) twoArg(Events.GUILD_BAN_REMOVE)
    if (listens(Events.GUILD_CREATE)) oneArg(Events.GUILD_CREATE)
    if (listens(Events.GUILD_DELETE)) oneArg(Events.GUILD_DELETE)
    if (listens(Events.GUILD_MEMBER_ADD)) oneArg(Events.GUILD_MEMBER_ADD)
    if (listens(Events.GUILD_MEMBER_AVAILABLE)) oneArg(Events.GUILD_MEMBER_AVAILABLE)
    if (listens(Events.GUILD_MEMBER_REMOVE)) oneArg(Events.GUILD_MEMBER_REMOVE)
    if (listens(Events.GUILD_MEMBERS_CHUNK)) twoArg(Events.GUILD_MEMBERS_CHUNK)
    if (listens(Events.GUILD_MEMBER_SPEAKING)) twoArg(Events.GUILD_MEMBER_SPEAKING)
    if (listens(Events.GUILD_MEMBER_UPDATE)) twoArg(Events.GUILD_MEMBER_UPDATE)
    if (listens(Events.GUILD_UNAVAILABLE)) oneArg(Events.GUILD_UNAVAILABLE)
    if (listens(Events.GUILD_UPDATE)) twoArg(Events.GUILD_UPDATE)
    if (listens(Events.MESSAGE_CREATE)) oneArg(Events.MESSAGE_CREATE)
    if (listens(Events.MESSAGE_DELETE)) oneArg(Events.MESSAGE_DELETE)
    if (listens(Events.MESSAGE_BULK_DELETE)) {
      this.client.on(Events.MESSAGE_BULK_DELETE, messages => {
        if (!validate(messages.first())) return
        plugin.emit(Events.MESSAGE_BULK_DELETE, messages)
      })
    }
    if (listens(Events.MESSAGE_REACTION_ADD)) twoArg(Events.MESSAGE_REACTION_ADD)
    if (listens(Events.MESSAGE_REACTION_REMOVE)) twoArg(Events.MESSAGE_REACTION_REMOVE)
    if (listens(Events.MESSAGE_UPDATE)) twoArg(Events.MESSAGE_UPDATE)
    if (listens(Events.PRESENCE_UPDATE)) twoArg(Events.PRESENCE_UPDATE)
    if (listens(Events.RECONNECTING)) noArg(Events.RECONNECTING)
    if (listens('resume')) oneArg('resume', false)
    if (listens(Events.GUILD_ROLE_CREATE)) oneArg(Events.GUILD_ROLE_CREATE)
    if (listens(Events.GUILD_ROLE_DELETE)) oneArg(Events.GUILD_ROLE_DELETE)
    if (listens(Events.GUILD_ROLE_UPDATE)) twoArg(Events.GUILD_ROLE_UPDATE)
    if (listens(Events.TYPING_START)) twoArg(Events.TYPING_START)
    if (listens(Events.TYPING_STOP)) twoArg(Events.TYPING_STOP)
    if (listens(Events.USER_NOTE_UPDATE)) threeArg(Events.USER_NOTE_UPDATE, false)
    if (listens(Events.USER_UPDATE)) twoArg(Events.USER_UPDATE, false)
    if (listens(Events.VOICE_STATE_UPDATE)) twoArg(Events.VOICE_STATE_UPDATE)
    if (listens(Events.WARN)) oneArg(Events.WARN, false)
  }

  /**
   * Checks whether a given plugin is disabled in a guild.
   * @param {String} bundleID
   * @param {Discord.Guild} guild
   */
  pluginDisabled (bundleID, guild) {
    if (!this.client.pluginsController) return false;
    if (!this.client.pluginsController[guild.id]) return false;
    return this.client.pluginsController[guild.id].disabled.indexOf(bundleID) > -1
  }
}

module.exports = PluginManager
