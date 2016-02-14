"use strict";

import { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import Loader from 'react-loader';
import TorrentTitleRow from './TorrentTitleRow.react.js';
import TorrentStats from './TorrentStats.react.js';

export default class TorrentListItem extends Component {
  render () {
    const torrent = this.props.torrent;
    const loaded  = torrent.status === "pending" ? false : true
    return (
      <ListGroupItem bsStyle="success">
        <Loader loaded={loaded} color="white"/>
        <TorrentTitleRow
          torrent={this.props.torrent}
        />
        <TorrentStats
          torrent={this.props.torrent}
        />
      </ListGroupItem>
    );
  }
};

TorrentListItem.propTypes = {
  torrent: PropTypes.object
};
