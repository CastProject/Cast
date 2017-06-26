class PermNode {

  /**
   * @param {String} name The name of this node
   * @param {PermNode[]} [parent] The parent permnodes, if any
   */
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
  }

  serialize() {
    var builder = "";
    this.parent.forEach(node => {
      builder += `${node.name}.`
    });
    builder += this.name;
    return builder;
  }
}

module.exports = PermNode;