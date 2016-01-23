"use strict";

import React from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

import TorrentActionCreators from '../actions/TorrentActionCreators';

export default class DeleteButton extends React.Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  _onClick () {
    TorrentActionCreators.deleteTorrent(this.props.torrentId);
  }
  render () {
    return (
      <span>
        <Button bsStyle="danger btn-xs" onClick={this._onClick}>
          <Glyphicon glyph="remove" />
        </Button>
      </span>
    );
  }
};
