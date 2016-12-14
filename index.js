'use strict'

const IPFSDaemon = require('ipfs-daemon/src/ipfs-node-daemon')
const IPFSGoDaemon = require('ipfs-daemon/src/ipfs-native-daemon')

let ipfs

const IpfsApis = [
  {
    // js-ipfs
    name: 'js-ipfs',
    start: (options) => {
      return new Promise((resolve, reject) => {
         ipfs = new IPFSDaemon(options)
         ipfs.on('ready', () => resolve(ipfs))
         ipfs.on('error', (e) => reject(e))
      })
    },
    stop: () => ipfs.stop()
  },
  {
    // js-ipfs-api via local daemon
    name: 'js-ipfs-api',
    start: (options) => {
      return new Promise((resolve, reject) => {
         ipfs = new IPFSGoDaemon(options)
         ipfs.on('ready', () => resolve(ipfs))
         ipfs.on('error', (e) => reject(e))
      })
    },
    stop: () => ipfs.stop()
  }
]

module.exports = IpfsApis
