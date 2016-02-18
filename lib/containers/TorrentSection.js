"use strict";

import { connect } from 'react-redux'
import { Component }from 'react';
import { ListGroup } from 'react-bootstrap';
import TorrentListItem from '../components/TorrentListItem.js';
import NoTorrents from '../components/NoTorrents.js';

function getTorrentListItems(torrent) {
  return <TorrentListItem
      key={torrent.infoHash}
      torrent={torrent}
    />
}

const mapStateToProps = (state) => {
  return {
    torrents: state.torrents
  }
}

class TorrentSection extends Component {
  render () {
    const torrentListItems = Object.values(this.props.torrents).map(getTorrentListItems);
    const noTorrents = torrentListItems.length > 0 ? false : true
    return (
      <div>
        <NoTorrents enabled={noTorrents} />
        <ListGroup>
          {torrentListItems}
        </ListGroup>
      </div>
    );
  }
};

export default connect(mapStateToProps)(TorrentSection)
