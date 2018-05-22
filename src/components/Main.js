import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { connect } from 'react-redux'

import * as actions from '../actions/actionCreators'
import Header from './header/Header'
import Footer from './footer/Footer'

import TechpinFavIcon from '../../images/favicon.png'
import Favicon from 'react-favicon'

class Main extends React.Component {
  constructor() {
    super()
    injectTapEventPlugin()
  }

  componentWillMount = () => {
    this.props.loadDynamicTextContents()
  }

  render() {
    return (
      <main id="container">
        <Favicon url={TechpinFavIcon} />
        <div className="app-wrapper">
          <nav className="header" id="header">
            <Header router={this.props.router}/>
          </nav>

          {/* routes under "/" */}
          {this.props.children}

          <Footer />
        </div>
      </main>
    )
  }
}

export default connect(null, actions)(Main)
