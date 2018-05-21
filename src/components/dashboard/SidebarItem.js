import React from 'react'
import { Link } from 'react-router'

const SidebarItem = ({ item }) => (
  <Link to={item.linkTo}>
    <div className="sidebar-item">
      <span className="sidebar-item__icon">{item.icon}</span>
      <span className="sidebar-item__title">{item.title}</span>
    </div>
  </Link>
)

export default SidebarItem
