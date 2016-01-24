"use strict";

import React from 'react';

export default class NoTorrents extends React.Component {
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
