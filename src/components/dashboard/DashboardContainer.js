import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import sidebarItems from './sidebarItems'
import { connect } from 'react-redux'

class DashboardContainer extends React.Component {
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.router.push('/')
    }
  }

  render() {
    if (!this.props.authenticated) return null

    return (
      <div className="dashboard-container main-content">
        <DashboardSidebar sidebarItems={sidebarItems} />
        {this.props.children}
      </div>
    )
  }
}

const mstp = state => ({ authenticated: state.auth.authenticated })

export default connect(mstp)(DashboardContainer)
