"use strict";

import React from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

export default class DownloadButton extends React.Component {
  render () {
    let link = this.props.link;
    if (this.props.enabled) {
      return (
        <span>
          <a href={link}>
            <Button bsStyle="danger" download>
              <Glyphicon glyph="cloud-download" />
            </Button>
          </a>
        </span>
      );
    } else {
      return (
        <span>
          <Button bsStyle="danger" disabled>
            <Glyphicon glyph="cloud-download" />
          </Button>
        </span>
      );
    };
  }
};
