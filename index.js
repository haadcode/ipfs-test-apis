'use strict'

const MemIpfs = require('./mem-ipfs')
const IPFS = require('ipfs')
const IPFSDaemon = require('ipfs-daemon')

let ipfsDaemon

const IpfsApis = [
  {
    // mem-ipfs
    name: 'mem-ipfs',
    start: () => Promise.resolve(MemIpfs),
    stop: () => Promise.resolve()
  },
  {
    // js-ipfs
    name: 'js-ipfs',
    start: (options) => {
      return new Promise((resolve, reject) => {
        const ipfs = new IPFS()
        // ipfs.goOnline(() => resolve(ipfs))
        resolve(ipfs)
      })
    },
    stop: () => Promise.resolve()
    // stop: () => new Promise((resolve, reject) => ipfs.goOffline(resolve))
  },
  {
    // js-ipfs-api via local daemon
    name: 'js-ipfs-api',
    start: (options) => {
      return IPFSDaemon(options)
        .then((res) => {
          ipfsDaemon = res.daemon
          return res.ipfs
        })
    },
    stop: () => new Promise((resolve, reject) => ipfsDaemon.stopDaemon(resolve))
  }
]

module.exports = IpfsApis
