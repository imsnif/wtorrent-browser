"use strict";

import { connect } from 'react-redux'
import { Component } from 'react';
import { Row } from 'react-bootstrap';

import TransferRate from '../components/TransferRate';

const mapStateToProps = (state) => {
  return {
    uploadSpeed: state.client.uploadSpeed,
    downloadSpeed: state.client.downloadSpeed
  }
}

class ClientSection extends Component {
  render () {
    return (
      <div className="clientSection">
        <Row>
          <TransferRate
            uploadSpeed   = {this.props.uploadSpeed}
            downloadSpeed = {this.props.downloadSpeed}
          />
        </Row>
      </div>
    );
  }
};

export default connect(mapStateToProps)(ClientSection)
