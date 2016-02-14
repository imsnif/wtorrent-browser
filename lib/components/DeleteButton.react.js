"use strict";

import { Component }from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

export default class DeleteButton extends Component {
  render () {
    return (
      <span>
        <Button bsStyle="danger btn-xs">
          <Glyphicon glyph="remove" />
        </Button>
      </span>
    );
  }
};
