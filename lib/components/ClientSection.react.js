"use strict";

import React from 'react';
import ClientStore from '../stores/ClientStore';

import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import TransferRate from './TransferRate.react';
import Throttle from './Throttle.react';

function getStateFromStores() {
  return {
    clientData: ClientStore.getData()
  };
}

export default class ClientSection extends React.Component {
  constructor() {
    super();
    this.state = getStateFromStores();
    this._onChange = this._onChange.bind(this);
    ClientStore.addChangeListener(this._onChange);
  }
  componentWillUnmount () {
    ClientStore.removeChangeListener(this._onChange);
  }
  _onChange () {
    this.setState(getStateFromStores());
  }
  render () {
    return (
      <div className="clientSection">
        <Row>
          <TransferRate
            uploadSpeed   = {this.state.clientData.uploadSpeed}
            downloadSpeed = {this.state.clientData.downloadSpeed}
          />
        </Row>
      </div>
    );
  }
};
