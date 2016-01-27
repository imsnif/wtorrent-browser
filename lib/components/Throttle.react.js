"use strict";

import React from 'react';
import { EditableTextField } from 'react-xeditable';

import ClientActionCreators from '../actions/ClientActionCreators';

export default class Throttle extends React.Component {
  constructor() {
    super()
    this._updateUpload = this._updateUpload.bind(this)
    this._updateDownload = this._updateDownload.bind(this)
    this._displayThrottle = this._displayThrottle.bind(this)
  }
  _updateUpload (value) {
    ClientActionCreators.updateThrottleUpload(value)
  }
  _updateDownload (value) {
    ClientActionCreators.updateThrottleDownload(value)
  }
  _displayThrottle (value) {
    if (!Number(value)) return value
    return Math.floor(value / 1000)
  }
  render () {
    let uploadSpeed   = this._displayThrottle(this.props.uploadThrottle);
    let downloadSpeed = this._displayThrottle(this.props.downloadThrottle);
    return (
      <span>
        <span><small><b>Throttle (U/D): </b></small></span>
        <EditableTextField id="uploadThrottle" 
          value={uploadSpeed} 
          onUpdate={this._updateUpload} 
          name="upload" /> 
        <span> / </span>
        <EditableTextField id="downloadThrottle" 
          value={downloadSpeed} 
          onUpdate={this._updateDownload} 
          name="download" /> 
        <span><small> KBps </small></span>
      </span>
    );
  }
};
