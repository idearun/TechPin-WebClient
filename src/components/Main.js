import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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

  componentDidMount = () => {
    const authed = JSON.parse(localStorage.getItem('techpin'))
    try {
      if (authed['api-token']) {
        this.props.wasAuthed(authed)
      }
    } catch (e) {
      // no-op
    }
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
            <Header />
          </nav>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="main"
            transitionEnterTimeout={350}
            transitionLeaveTimeout={1}
          >
            {React.cloneElement(this.props.children, {
              ...this.props,
              key: location.pathname
            })}
          </ReactCSSTransitionGroup>
          <Footer />
        </div>
      </main>
    )
  }
}

// bad idea => move this down to Top25 Component
function mapStateToProps(state) {
  return {
    allProducts: state.allProducts,
    singleProducts: state.singleProducts,
    topProducts: state.topProducts
  }
}

export default connect(mapStateToProps, actions)(Main)
