class PermNode {
  /**
   * @param {String} name The name of this node
   * @param {PermNode} [parent] The parent permnode, if any
   */
  constructor (name, parent) {
    this.name = name
    this.parent = parent
  }

  /** Convert the permnode into a permission string */
  serialize () {
    var builder = ''
    /* this.parent.forEach(node => {
      builder += `${node.name}.`
    }); */
    var nodes = []
    var selection = this.parent
    while (true) {
      if (!selection) break
      nodes.unshift(selection)
      selection = selection.parent
    }
    nodes.forEach(node => builder += `${node.name}.`)
    builder += this.name
    return builder
  }

  wildcard () {
    return this.name === '*'
  }
}

/**
 * Convert a permission string to a permnode
 * @param {String} permission The permission to deserialize into nodes
 */
const deserialize = function (permission) {
  var parent = null
  var finalNode = null
  var nodes = permission.split('.')
  nodes.forEach((node, index) => {
    var root = !nodes[index - 1]
    var bottom = !nodes[index + 1]
    var permNode = new PermNode(node, root ? null : parent)
    parent = permNode
    if (bottom) finalNode = permNode
  })
  return finalNode
}

module.exports = PermNode
module.exports.deserialize = deserialize
