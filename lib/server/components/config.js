"use strict";

export default class Config extends Object {
  constructor (){
    super()
    this.storagePath = process.env.npm_package_config_storagePath
    this.port = process.env.PORT                 || 
      process.env.npm_package_config_port        || 
      8080
    this.staticRoute = `${process.cwd()}/public`
  }
}
