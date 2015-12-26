"use strict";

import { EventEmitter } from 'events';
import fs               from 'fs';
import path             from 'path';
import rmdir            from 'rmdir';

export const dependencies = [ "utils/Zip", "components/Config", "components/Client" ]
export default class Download extends EventEmitter {
  constructor(Zip, Config, Client, magnetUri) {
    super()
    let config = new Config()
    this.Zip         = Zip
    this.storagePath = config.storagePath
    this.client      = new Client()
    this.magnetUri   = magnetUri
    this.state = {
      status: "Initializing"
    }
  }
  start(cb) {
    /**
     * Start the download, update and report its state, subscribe to state changes
     * and set a report timer.
     *
     * @param  {Function} cb
     */
    this.client.add(this.magnetUri, {path: this.storagePath}, (torrent) => {
      this.torrent = torrent
      this._updateState.call(this, torrent, "Downloading")
      this._report.call(this)
      this.torrent.on("download", this._updateState.bind(this, torrent, false))
      this.torrent.on("upload", this._updateState.bind(this, torrent, false))
      this.torrent.on("done", this._updateState.bind(this, torrent, "Done"))
      this.reportTimer = setInterval(this._report.bind(this), 1000)
      cb()
    });
  }
  stream() {
    /**
     * Streams the contents of the torrent as a zip file
     * @return {stream} 
     */
    if (this.state.status !== "Done") throw("Download not ready!")
    let zippedDownload = new this.Zip(this.torrent.files);
    return zippedDownload.stream();
  }
  destroy(cb) {
    /**
     * Destroy the download, clear the report timer, remove the file contents
     * saved to the disk and remove all listeners
     * 
     * @param  {Function} cb
     */
    this.client.remove(this.state.id, () => {
      this._updateState(null, "Deleted")
      clearInterval(this.reportTimer)
      rmdir(path.join(this.storagePath, this.torrent.name), () => {
        this._report.call(this)
        this.removeAllListeners()
        cb()
      })
    })
  }
  _updateState(updatedTorrent, updatedStatus) {
    /**
     * Update the download state, updatedStatus should be false if it is not updated
     * 
     * @param  {Torrent} updatedTorrent
     * @param  {string} updatedTorrent
     */
    let torrent = updatedTorrent || this.torrent
    let status = updatedStatus || this.state.status
    this.state = {
        name          : torrent.name,
        id            : torrent.infoHash,
        progress      : torrent.progress,
        downloaded    : torrent.downloaded,
        uploaded      : torrent.uploaded,
        downloadSpeed : torrent.downloadSpeed(),
        uploadSpeed   : torrent.uploadSpeed(),
        timeRemaining : torrent.timeRemaining,
        status
    }
  }
  _report () {
    this.emit("update", this.state)
  }
}
