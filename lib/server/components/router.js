"use strict";

import express from 'express';
import download from '../controllers/download';
import client from '../controllers/client'; 

export const dependencies = [ "components/Config", "controllers" ]
export default function Router (Config, controllers) {
  let config = new Config()
  this.router = express.Router()
  this.router.get("/", function (req, res) {
    res.render('home')
  })
  _applyControllers.call(this, controllers)
  this.router.use("/", express.static(config.staticRoute))
  return this.router
}

function _applyControllers(controllers) {
  Object.keys(controllers).forEach((controllerName) => {
    let controller = new controllers[controllerName]
    _addController.call(this, controller.name, controller.routes)
  })
}

function _addController (name, controller) {
  Object.keys(controller).forEach((path) => {
    _addRoute.call(this, name, path, controller[path])
  })
}

function _addRoute (name, path, route) {
  let method = route.method
  let action = route.action
  this.router[method](`/${name}${path}`, action);
}
