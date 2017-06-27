class PermNode {

  /**
   * @param {String} name The name of this node
   * @param {PermNode[]} [parent] The parent permnodes, if any
   */
  constructor(name, parents = null) {
    this.name = name;
    this.parents = parents;
  }

  /** Convert the permnode into a permission string */
  serialize() {
    var builder = "";
    this.parents.forEach(node => {
      builder += `${node.name}.`
    });
    builder += this.name;
    return builder;
  }

  wildcard() {
    return this.name === '*';
  }
}

/**
 * Convert a permission string to a permnode
 * @param {String} permission The permission to deserialize into nodes
 */
const deserialize = function(permission) {
  var parents = [];
  var finalNode = null;
  var nodes = permission.split(".");
  nodes.forEach((node, index) => {
    var root = !nodes[index - 1];
    var bottom = !nodes[index + 1];
    var permNode = new PermNode(node, root ? [] : parents);
    if (!bottom) parents.push(permNode);
    else finalNode = permNode;
  })
  return finalNode;
}

module.exports = PermNode;
module.exports.deserialize = deserialize;