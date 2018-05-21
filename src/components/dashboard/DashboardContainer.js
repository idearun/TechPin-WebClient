import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import sidebarItems from './sidebarItems'

const DashboardContainer = ({ children }) => (
  <div className="dashboard-container main-content">
    <DashboardSidebar sidebarItems={sidebarItems} />
    {children}
  </div>
)

export default DashboardContainer
