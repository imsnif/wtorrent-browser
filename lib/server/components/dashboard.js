"use strict";

import { EventEmitter } from 'events';
import parseTorrent     from 'parse-torrent';
import async            from 'async';

export const dependencies = [ "components/Download", "components/Client" ]
export const singleton = true
export default class Dashboard extends EventEmitter {
  constructor(Download, Client) {
    super()
    this.Download    = Download
    this.client      = new Client()
    this._downloads  = {} // { <torrentId>: <Download Object> }
    this.reportTimer = setInterval(this._report.bind(this), 1000)
  }
  add(magnetUri, cb) {
    /**
     * Adds a download to the dashboard and starts it 
     *
     * @param {string} magnetUri
     * @param {function} cb
     */
    try { parseTorrent(magnetUri) } catch(err) { return cb(err) } // Verify magnet URI
    let dl = new this.Download(magnetUri);
    dl.on("update", this.emit.bind(this, "torrent"));
    dl.start(() => {
      this._downloads[dl.state.id] = dl;
      cb();
    });
  }
  remove(torrentId, cb) {
    /**
     * Remove download from dashboard
     *
     * @param {string} torrentId
     * @param {function} cb
     */
    let dl = this._downloads[torrentId];
    if (!dl) return setImmediate(cb)
    dl.destroy((err) => {
      delete this._downloads[torrentId];
      cb(err)
    });
  }
  get(torrentId) {
    /**
     * Get the download object or undefined if not present
     *
     * @param {string} torrentId
     * @param {function} cb
     */
    return this._downloads[torrentId];
  }
  throttleUpload(value) { // Value in KB
    /**
     * Throttle the global upload limit in KB
     *
     * @param {number} value
     */
    if (!Number(value)) return
    this.client.throttleUpload(value * 1000);
  }
  throttleDownload(value) { // Value in KB
    /**
     * Throttle the global download limit in KB
     *
     * @param {number} value
     */
    this.client.throttleDownload(value * 1000);
  }
  destroy (cb) {
    /**
     * Destroy dashboard object and all downloads associated with it
     *
     * @param {Function} cb
     */
    async.forEach(Object.keys(this._downloads), function(id, next) {
      this_.downloads[id].destroy(next)
    }, function(err) {
      if (err) return cb(err)
      clearInterval(this.reportTimer)
      this.client.destroy(() => {
        this.removeAllListeners()
        cb()
      })
    })
  }
  _report () {
    let state = {
      downloadSpeed    : this.client.downloadSpeed(),
      uploadSpeed      : this.client.uploadSpeed(),
      downloadThrottle : this.client.downloadThrottleRate || "N/A",
      uploadThrottle   : this.client.uploadThrottleRate || "N/A"
    }
    this.emit("update", state)
  }
}
