import React from 'react'
import SidebarItem from './SidebarItem'

const DashboardSidebar = ({ sidebarItems }) => (
  <aside className="dashboard-sidebar">
    {sidebarItems.map(item => <SidebarItem key={item.linkTo} item={item} />)}
  </aside>
)

export default DashboardSidebar
