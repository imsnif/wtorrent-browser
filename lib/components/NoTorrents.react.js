"use strict";

import { Component } from 'react';

export default class NoTorrents extends Component {
  render () {
    if (this.props.enabled) {
      return (
        <div className="noTorrents">
          No Active Torrents
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
};
