"use strict";

import { EventEmitter } from 'events';
import express    from 'express';
import exphbs     from 'express-handlebars';
import http       from 'http';
import bodyParser from 'body-parser';
import io         from 'socket.io';

export const dependencies = [ "components/Router", "components/Dashboard", "components/Config" ]
export default class AppServer extends EventEmitter {
  constructor (Router, Dashboard, Config) {
    super()
    this.dashboard = new Dashboard()
    this.app       = express()
    this.config    = new Config

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.engine("handlebars", exphbs({defaultLayout: "main"}));
    this.app.set("view engine", "handlebars");
    this.app.disable("etag");

    this.app.use("/", new Router())
  }
  init () {
    let server = http.createServer(this.app).listen(this.config.port, () => {
      console.log(`Wtorrent listening on port ${this.config.port}`);
    });
    let socket = io.listen(server);
    this.dashboard.on("torrent", socket.emit.bind(socket, "torrent"));
    this.dashboard.on("update", socket.emit.bind(socket, "client"));
  }
}
