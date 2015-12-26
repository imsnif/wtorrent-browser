"use strict";

import React from 'react';

export default class TransferRate extends React.Component {
  render () {
    let uploadSpeed   = Math.round(this.props.uploadSpeed / 1000);
    let downloadSpeed = Math.round(this.props.downloadSpeed / 1000);
    return (
      <span>
        Rate (U/D): {uploadSpeed} / {downloadSpeed} KBps
      </span>
    );
  }
};
