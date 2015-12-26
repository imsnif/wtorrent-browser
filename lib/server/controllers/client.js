"use strict";

import { EventEmitter } from "events";

export const dependencies = [ "components/Dashboard" ]
export default class ClientController extends EventEmitter {
  constructor(Dashboard) {
    super()
    this.dashboard = new Dashboard()
  }
  get name() {
    return "client"
  }
  get routes() {
    return {
      "/throttleUpload": {
        method: "post",
        action: function(req, res) {
          if (!Number(req.body.value)) return res.json({err: "Value must be numeric"})
          this.dashboard.throttleUpload(req.body.value);
          res.end();
        }
      },
      "/throttleDownload": {
        method: "post",
        action: function(req, res) {
          if (!Number(req.body.value)) return res.json({err: "Value must be numeric"})
          this.dashboard.throttleDownload(req.body.value);
          res.end();
        }
      }
    }
  }
}
