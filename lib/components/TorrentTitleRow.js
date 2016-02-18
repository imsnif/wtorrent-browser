"use strict";

import prettyMs from 'pretty-ms';

import React from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import DeleteButton from '../containers/DeleteButton';

export default class TorrentTitleRow extends React.Component {
  render () {
    const torrent     = this.props.torrent
    const downloadSpeed = torrent.downloadSpeed ? Math.round(torrent.downloadSpeed / 1000) + "K" : "0K";
    const uploadSpeed = torrent.downloadSpeed ? Math.round(torrent.uploadSpeed / 1000) + "K" : "0K";
    const progress = torrent.progress ? Math.floor(torrent.progress * 100) : 0
    const timeRemaining = torrent.timeRemaining ? 
      prettyMs(Math.round(torrent.timeRemaining), { compact: true }) + " remaining":
      0
    return (
      <Row>
        <Col xs={5} className="textOverflow" title={torrent.name}>{torrent.name}</Col>
        <Col xs={3}>
          <ProgressBar 
            striped
            bsStyle="success"
            now={progress}
            label="%(percent)s%"
          />
        </Col>
        <Col xs={3}><small>{timeRemaining}</small></Col>
        <Col xs={1}><DeleteButton torrentId={torrent.infoHash} status={torrent.status}/></Col>
      </Row>
    );
  }
};

TorrentTitleRow.propTypes = {
  torrent: React.PropTypes.object
};
