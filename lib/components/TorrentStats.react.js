"use strict";

import React from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default class TorrentStats extends React.Component {
  render () {
    let torrent     = this.props.torrent;
    let uploadSpeed = torrent.uploadSpeed ? 
      Math.round(torrent.uploadSpeed / 1000) + "KBps" : 
      "0KBps"
    let downloadSpeed = torrent.downloadSpeed ? 
      Math.round(torrent.downloadSpeed / 1000) + "KBps" : 
      "0KBps"
    let ratio = torrent.uploaded && torrent.downloaded ? 
      (torrent.uploaded / torrent.downloaded).toFixed(2) :
      0
    return (
      <Row>
        <Col xs={2}>D/L: {downloadSpeed}/{uploadSpeed}</Col>
        <Col xs={1}>Ratio: {ratio}</Col>
      </Row>
    );
  }
};

TorrentStats.propTypes = {
  torrent: React.PropTypes.object
};
