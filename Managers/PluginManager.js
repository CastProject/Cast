const MetaDefaults = {
  bundleID: null,
  main: null,
  commandsPath: null,
  disabledByDefault: true,
  version: '0.0.1',
  dev: true
}

const LoadOptions = {
  autogen: true
}

const PluginMeta = 'plugin.json'

const Util = require('discord.js').Util

const path = require(`path`)
const fs = require(`fs-extra`)

class PluginManager {
  constructor (client, dir) {
    this.client = client
    this.dir = dir
  }

  load (dir) {
    fs.pathExists(path.join(dir, PluginMeta)).then(exists => {
      var loadedMeta = {}
      try {
        loadedMeta = require(path.join(dir, PluginMeta))
      } catch (e) {
        if (e.name !== 'SyntaxError') {
          this.client.logError(e)
          return
        }
      }
      loadedMeta = Util.mergeDefault(MetaDefaults, loadedMeta)
      if (!loadedMeta.main) {
        console.log(`Plugin doesn't have a main class in ${path.join(dir, PluginMeta)}`)
      }
    })
  }

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
        fs.readdir(dir).then(directory => {
          directory.forEach(plDir => {
            this.load(path.join(dir, plDir))
          })
          resolve()
        })
      })
    })
  }
}

module.exports = PluginManager
