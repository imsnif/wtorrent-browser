"use strict";

import { connect } from 'react-redux'
import { Component }from 'react'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { removeTorrent } from '../actions/torrent-actions'

const mapStateToProps = (state, ownProps) => {
  return ownProps
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(removeTorrent(ownProps.torrentId))
    }
  }
}

class DeleteButton extends Component {
  render () {
    const disabled = this.props.status === "pending" ? true : false
    return (
      <span>
        <Button bsStyle="danger btn-xs" onClick={this.props.onClick} disabled={disabled}>
          <Glyphicon glyph="remove" />
        </Button>
      </span>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
