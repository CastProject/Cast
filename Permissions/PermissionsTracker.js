class PermissionsTracker {
  constructor (permissions = [], options = {userID: null, roleID: null, guildID: null}) {
    if (!options.userID && !options.roleID) throw new Error("The user and role ID cannot both be null");
    this.options = options;
    this.guildID = this.options.guildID;
    this.permissions = permissions
  }

  /** Check whether or not this tracker is for a role */
  role() {
    return !!this.options.roleID;
  }

  /** Check whether or not this tracker is for a user */
  user() {
    return !!this.options.userID;
  }

  /**
   * Check whether or not this tracker has the given permission
   * @param {String} permission The permission to check against
   */
  hasPermission(permission) {
    return this.permissions.indexOf(permission) > -1;
  }

  /**
   * Add a permission to this tracker
   * @param {String} permission The permission to add to the tracker
   */
  addPermission(permission) {
    if (this.permissions.indexOf(permission) > -1) return;
    this.permissions.push(permission.serialize())
  }

  /**
   * Remove a permission from this tracker
   * @param {String} permission The permission to remove from the tracker
   */
  removePermission(permission) {
    return this.permissions.splice(this.permissions.indexOf(permission));
  }

  toMongo() {
    var asMongo = {
      guildID: this.guildID,
      permissions: this.permissions
    }
    if (this.options.userID) asMongo.userID = this.options.userID;
    else asMongo.roleID = this.options.roleID;
    return asMongo;
  }
}

const fromMongo = (schema) => new PermissionsTracker(schema.permissions, {userID: schema.userID, roleID: schema.roleID, guildID: schema.guildID});

module.exports = PermissionsTracker;
module.exports.Deserialize = fromMongo;