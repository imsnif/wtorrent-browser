"use strict";

import prettyMs from 'pretty-ms';
import React from 'react';

import { ListGroupItem } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import Loader from 'react-loader';
import TorrentTitleRow from './TorrentTitleRow.react.js';
import TorrentStats from './TorrentStats.react.js';
import DeleteButton from './DeleteButton.react.js';

export default class TorrentListItem extends React.Component {
  render () {
    let torrent     = this.props.torrent;
    let loaded = torrent.status === "pending" ? false : true
    return (
      <ListGroupItem bsStyle="success">
        <Loader loaded={loaded} color="white"/>
        <TorrentTitleRow
          torrent={this.props.torrent}
        />
      </ListGroupItem>
    );
  }
};

TorrentListItem.propTypes = {
  torrent: React.PropTypes.object
};
