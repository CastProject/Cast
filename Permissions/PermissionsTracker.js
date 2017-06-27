class PermissionsTracker {
  constructor (options = {userID: null, roleID: null, guildID: null}) {
    if (!options.userID && !options.roleID) throw new Error("The user and role ID cannot both be null");
    this.options = options;
    this.guildID = this.options.guildID;
    this.permissions = new Map();
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
   * @param {PermNode} permission The permission to check against
   */
  hasPermission(permission) {
    return !!this.permissions.get(permission.serialize());
  }

  /**
   * Add a permission to this tracker
   * @param {PermNode} permission The permission to add to the tracker
   */
  addPermission(permission) {
    if (this.permissions.get(permission.serialize())) return;
    this.permissions.set(permission.serialize(), permission);
  }

  /**
   * Remove a permission from this tracker
   * @param {PermNode} permission The permission to remove from the tracker
   */
  removePermission(permission) {
    return this.permissions.delete(permission.serialize());
  }

}

module.exports = PermissionsTracker;