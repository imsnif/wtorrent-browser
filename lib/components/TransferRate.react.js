"use strict";

import React from 'react';
import { Col } from 'react-bootstrap';

export default class TransferRate extends React.Component {
  render () {
    let uploadSpeed   = Math.round(this.props.uploadSpeed / 1000);
    let downloadSpeed = Math.round(this.props.downloadSpeed / 1000);
    return (
      <div>
        <Col xs={6}>
          <center><small><b>Total Download (KBps):</b> {downloadSpeed}</small></center>
        </Col>
        <Col xs={6}>
          <center><small><b>Total Upload (KBps):</b> {uploadSpeed}</small></center>
        </Col>
      </div>
    );
  }
};
