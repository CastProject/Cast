const EventEmitter = require('events').EventEmitter
const Events = require('discord.js').Constants.Events

class Plugin extends EventEmitter {
  constructor (client, metadata) {
    super()
    this.client = client
    this.metadata = metadata
  }
}
