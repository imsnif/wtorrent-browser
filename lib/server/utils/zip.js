"use strict";

import { EventEmitter } from 'events';
import Packer from 'zip-stream';
import fs     from 'fs';
import async  from 'async';
import path   from 'path';

export const dependencies = [ "components/Config" ]
export default class Zip extends EventEmitter {
  constructor(Config, files) {
    super()
    let config = new Config;
    this.basePath = config.storagePath 
    this.archive  = new Packer()
    this.files    = files
  }
  stream () {
    /**
     * Zip all the files in this archive and return them as a stream
     * 
     * @return {stream}
     */
    async.eachSeries(this.files, (file, next) => {
      fs.readFile(path.join(this.basePath, file.path), (err, fileContents) => {
        this.archive.entry(fileContents, {name: `${file.path}`}, next)
      })
    }, (err) => {
      this.archive.finish()
    });
    return this.archive
  }
}
