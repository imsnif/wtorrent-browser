"use strict";

import React from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import TorrentActionCreators from '../actions/TorrentActionCreators';

export default class MagnetSection extends React.Component {
  constructor() {
    super();
    this.state = { magnet: "" };
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }
  _onChange (event, value) {
    this.state.magnet = event.target.value
    this.setState({magnet: event.target.value});
  }
  _onClick (event) {
    TorrentActionCreators.addTorrentMagnet(this.state.magnet);
    this.setState({magnet: ""})
  }
  render () {
    return (
      <Row>
        <Col md={9}>
          <Input
            bsSize="large"
            type="text"
            placeholder="Magnet URI"
            onChange={this._onChange}
            value={this.state.magnet}
          />
        </Col>
        <Col md={3}>
          <Button bsStyle="success"
            bsSize="large"
            onClick={this._onClick}
            block>Submit Magnet
          </Button>
        </Col>
      </Row>
    )
  }
};
