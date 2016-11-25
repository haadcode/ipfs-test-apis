'use strict'

const DAGNode = require('ipld-dag-pb').DAGNode

let objects = {}

module.exports = {
  object : {
    get: (hash) => Promise.resolve(objects[hash]),
    put: (data) => {
      return new Promise((resolve, reject) => {
        return DAGNode.create(new Buffer(data, 'utf-8'), (err, node) => {
          if (err) reject(err)
          objects[node.toJSON().hash] = node
          resolve(node)
        })        
      })
    }
  }
}
