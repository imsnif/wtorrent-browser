"use strict";

import React from 'react';
import TorrentStore from '../stores/TorrentStore';
import { ListGroup } from 'react-bootstrap';
import TorrentListItem from './TorrentListItem.react.js';

function getStateFromStores() {
  return {
    torrents: TorrentStore.getAll()
  };
}

function getTorrentListItems(torrent) {
  return <TorrentListItem
      key={torrent.infoHash}
      torrent={torrent}
    />
}

export default class TorrentSection extends React.Component {
  constructor() {
    super()
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
    TorrentStore.addChangeListener(this._onChange)
  }
  componentWillUnmount () {
    TorrentStore.removeChangeListener(this._onChange);
  }
  _onChange () {
    this.setState(getStateFromStores());
  }
  render () {
    let torrentListItems = Object.values(this.state.torrents).map(getTorrentListItems);
    return (
      <ListGroup>
        {torrentListItems}
      </ListGroup>
    );
  }
};
