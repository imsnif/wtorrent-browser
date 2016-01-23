"use strict";

import prettyMs from 'pretty-ms';

import React from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import DeleteButton from './DeleteButton.react';

export default class TorrentTitleRow extends React.Component {
  render () {
    let torrent     = this.props.torrent
    let downloadSpeed = torrent.downloadSpeed ? Math.round(torrent.downloadSpeed / 1000) + "K" : "0K";
    let uploadSpeed = torrent.downloadSpeed ? Math.round(torrent.uploadSpeed / 1000) + "K" : "0K";
    let progress = torrent.progress ? Math.floor(torrent.progress * 100) : 0
    let timeRemaining = torrent.timeRemaining ? 
      prettyMs(Math.round(torrent.timeRemaining), { compact: true }) :
      0
    return (
      <Row>
        <Col xs={3}>{torrent.name}</Col>
        <Col xs={3}>{downloadSpeed}/{uploadSpeed}</Col>
        <Col xs={1}>{timeRemaining}</Col>
        <Col xs={3}>
          <ProgressBar 
            striped
            bsStyle="success"
            now={progress}
            label="%(percent)s%"
          />
        </Col>
        <Col xs={1}><DeleteButton torrentId={torrent.infoHash} /></Col>
      </Row>
    );
  }
};

TorrentTitleRow.propTypes = {
  torrent: React.PropTypes.object
};
