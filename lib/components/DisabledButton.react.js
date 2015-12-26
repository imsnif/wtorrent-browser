"use strict";

import React from 'react';

import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

export default class DisabledButton extends React.Component {
  render () {
    return (
      <Button bsStyle="danger" disabled>
        <Glyphicon glyph="ban-circle" />
      </Button>
    );
  }
};
