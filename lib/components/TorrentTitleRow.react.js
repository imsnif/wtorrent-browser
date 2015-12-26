"use strict";

import prettyMs from 'pretty-ms';

import React from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';

export default class TorrentTitleRow extends React.Component {
  render () {
    let torrent     = this.props.torrent;
    let timeRemaining = torrent.timeRemaining ? 
      prettyMs(Math.round(torrent.timeRemaining), { compact: true }) :
      0
    let progress = torrent.progress ? Math.floor(torrent.progress * 100) : 0
    return (
      <Row>
        <Col md={3}>
          <ProgressBar 
            striped
            bsStyle="success"
            now={progress}
            label="%(percent)s%"
          />
        </Col>
        <Col md={6}><strong>{torrent.name}</strong></Col>
        <Col md={3}>Time remaining: {timeRemaining}</Col>
      </Row>
    );
  }
};

TorrentTitleRow.propTypes = {
  torrent: React.PropTypes.object
};
