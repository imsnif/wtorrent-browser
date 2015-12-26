"use strict";

import prettyMs from 'pretty-ms';
import React from 'react';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';

import DownloadButton from './DownloadButton.react.js';
import DeleteButton from './DeleteButton.react.js';
import DisabledButton from './DisabledButton.react.js';

export default class TorrentControls extends React.Component {
  render () {
    let torrent     = this.props.torrent
    let downloadLink = `/download/${torrent.infoHash}`
    return (
      <span>
        <Row>
          <ButtonGroup>
            <DisabledButton />
            <DeleteButton
              torrentId={torrent.infoHash}
            />
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup>
            <DisabledButton />
            <DisabledButton />
          </ButtonGroup>
        </Row>
      </span>
    );
  }
};

TorrentControls.propTypes = {
  torrent: React.PropTypes.object
};
