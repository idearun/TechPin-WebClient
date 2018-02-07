import React from 'react'
import { browserHistory } from 'react-router'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  toolbarHomeIcon: {
    cursor: 'pointer'
  }
}

export default class SinglePageToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackBarOpen: false
    }
  }

  checkAuthAndRedirect = () => {
    if (!this.props.auth) {
      this.setState({ snackBarOpen: true })
    } else {
      browserHistory.push(`/${this.props.slug}/edit`)
    }
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false })
  }

  handleBackButton = () => {
    if (this.props.inModal) {
      this.props.closeModal()
    } else {
      browserHistory.push(`/`)
    }
  }

  render() {
    const { showInvestmentRecord, editAble } = this.props
    return (
      <div>
        <Toolbar className="toolbar">
          <ToolbarGroup firstChild={true}>
            <IconButton
              tooltip="back to home"
              tooltipPosition="top-center"
              onClick={this.handleBackButton}
              style={styles.toolbarHomeIcon}
            >
              <NavigationArrowBack hoverColor={'#9C27B0'} color="#505050" />
            </IconButton>
          </ToolbarGroup>
          {editAble && (
            <ToolbarGroup>
              {showInvestmentRecord && (
                <FlatButton
                  key={0}
                  label="add investment record"
                  labelPosition="after"
                  style={{ marginRight: 0 }}
                  onClick={this.props.handleInvRecAdd}
                />
              )}
              <FlatButton
                key={1}
                label="Edit"
                labelPosition="after"
                style={{ marginRight: '10px', marginLeft: 0 }}
                onClick={this.checkAuthAndRedirect}
              />
            </ToolbarGroup>
          )}
        </Toolbar>
        <Snackbar
          open={this.state.snackBarOpen}
          message="you are not logged in, please log in first"
          autoHideDuration={5000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    )
  }
}
