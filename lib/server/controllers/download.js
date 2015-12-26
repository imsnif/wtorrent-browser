"use strict";

import { EventEmitter } from "events";
import parseTorrent from 'parse-torrent';

export const dependencies = [ "components/Dashboard" ]
export default class DownloadController extends EventEmitter {
  constructor(Dashboard) {
    super()
    this.dashboard = new Dashboard()
  }
  get name() {
    return "download"
  }
  get routes() {
    let dashboard = this.dashboard
    return {
      "/:torrent_id": {
        method: "get",
        action: function(req, res) {
          let download = dashboard.get(req.params.torrent_id);
          if (!download) return res.json({err: "No such torrent"});
          if (download.state.status !== "Done") return res.json({err: "Download not finished yet."})
          res.setHeader("Content-disposition", `attachment; filename="${download.state.name}.zip"`);
          res.setHeader("Content-type", "application/zip");
          download.stream().pipe(res)
        }
      },
      "/add": {
        method: "post",
        action: function(req, res) {
          let magnetUri = req.body.magnet_uri
          try { parseTorrent(magnetUri) } catch(err) { return cb(err) } // Verify magnet URI
          dashboard.add(magnetUri, res.end.bind(res))
        }
      },
      "/delete": {
        method: "post",
        action: function(req, res) {
          dashboard.remove(req.body.torrent_id, res.end.bind(res))
        }
      }
    }
  }
}
