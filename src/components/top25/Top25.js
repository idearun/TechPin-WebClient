import React from 'react'

import Modal from 'react-modal'
import AddForm from './AddForm'
import EditInfo from '../singlePage/EditInfo'
import WidgetColumn from './WidgetColumn'
import sort from '../../helpers/helpers'
import SiteDesc from './SiteDesc'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Snackbar from 'material-ui/Snackbar'
import DueDiligenceInfo from './DueDiligenceInfo'
import { debounce } from '../../helpers/helpers'
import { connect } from 'react-redux'
import DataAnalysis from './DataAnalysis'
import Map from './Map'
import { Helmet } from 'react-helmet'

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'auto'
  }
}

const editModalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'auto'
  },
  content: {
    minHeight: 800
  }
}

class Top25 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarIsOpen: false,
      snackbarText: '',
      newProductSlug: null,
      addProductModalIsOpen: false,
      addVersionModalIsOpen: false,
      topProducts: {
        topNew: [],
        between1And10Million: [],
        plus10Million: [],
        plus100Million: []
      }
    }
  }

  handleAddProductModalOpen = () => {
    this.setState({ addProductModalIsOpen: true })
  }

  closeAddProductModal = () => {
    this.setState({ addProductModalIsOpen: false })
  }

  handleAddVersionModalOpen = () => {
    this.setState({ addVersionModalIsOpen: true })
  }

  closeAddVersionModal = () => {
    this.setState({ addVersionModalIsOpen: false })
  }

  componentWillReceiveProps = nextProps => {
    if (Object.keys(nextProps.topProducts).length > 0) {
      this.setState({
        topProducts: {
          topNew: nextProps.topProducts.topNew,
          plus10Million: sort(nextProps.topProducts.plus10Million, 'nps'),
          between1And10Million: sort(
            nextProps.topProducts.between1And10Million,
            'nps'
          ),
          plus100Million: sort(nextProps.topProducts.plus100Million, 'nps')
        }
      })
    }
  }

  updateInitialState = () => {
    if (Object.keys(this.props.topProducts).length > 0) {
      const topProducts = this.props.topProducts
      this.setState({
        topProducts: {
          topNew: topProducts.topNew,
          between1And10Million: sort(topProducts.between1And10Million, 'nps'),
          plus10Million: sort(topProducts.plus10Million, 'nps'),
          plus100Million: sort(topProducts.plus100Million, 'nps')
        }
      })
    }
  }

  componentDidMount = () => {
    // load state
    this.updateInitialState()
    // attach event listeners
    this.attachEventListeners()
  }

  attachEventListeners() {
    const floatingButton = document.querySelector('.floating-action-button')
    const shortDesc = document.querySelector('.site-desc')
    floatingButton.style.top =
      shortDesc.getBoundingClientRect().bottom -
      floatingButton.offsetHeight / 2 +
      'px'
    window.addEventListener(
      'scroll',
      debounce(() => {
        if (window.pageYOffset > 0) {
          floatingButton.style.top = ''
          floatingButton.style.bottom = '35px'
        } else {
          floatingButton.style.top =
            shortDesc.getBoundingClientRect().bottom -
            floatingButton.offsetHeight / 2 +
            'px'
          floatingButton.style.bottom = ''
        }
      }, 10),
      {
        passive: true
      }
    )
  }

  persistNewProduct = slug => {
    this.setState({
      newProductSlug: slug,
      addProductModalIsOpen: false,
      addVersionModalIsOpen: true
    })
  }

  cleanNewProduct = () => {
    this.setState({
      newProductSlug: null,
      addVersionModalIsOpen: false,
      snackbarIsOpen: true,
      snackbarText: 'Thank you! We will review and publish your submission.'
    })
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbarIsOpen: false
    })
  }

  render() {
    const Plus10Million = [
      ...this.state.topProducts.plus100Million,
      ...this.state.topProducts.plus10Million
    ]
    const { title, text } = this.props

    return (
      <div className="top25 main-content">
        <Helmet>
          <title>TechPin - Discover & Connect to startups, VCs and accelerators in MENA</title>
        </Helmet>

        <SiteDesc openAddProductModal={this.handleAddProductModalOpen} />
        <header className="top25-header">
          <span>{title}</span>
          <p className="sub-header">{text}</p>
        </header>
        <main className="flex-container">
          <WidgetColumn productList={this.state.topProducts.topNew} title="New" />
          <WidgetColumn productList={Plus10Million} title="$10 Million+" />
          <WidgetColumn
            productList={this.state.topProducts.between1And10Million}
            title="$1 Million+"
          />
        </main>
        <DataAnalysis />
        <Map />
        <DueDiligenceInfo />
        <FloatingActionButton
          secondary={true}
          className="floating-action-button"
          onClick={this.handleAddProductModalOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Modal
          isOpen={this.state.addProductModalIsOpen}
          onRequestClose={this.closeAddProductModal}
          style={modalStyle}
          className="add-modal"
          overlayClassName="add-overlay"
          contentLabel="Modal"
        >
          <AddForm
            closeModal={this.closeAddProductModal}
            persistNewProduct={this.persistNewProduct}
          />
        </Modal>
        <Modal
          isOpen={this.state.addVersionModalIsOpen}
          onRequestClose={this.closeAddVersionModal}
          style={editModalStyle}
          className="edit-modal"
          overlayClassName="edit-overlay"
          contentLabel="Modal"
        >
          <EditInfo
            inModal={this.state.addVersionModalIsOpen}
            closeModal={this.closeAddVersionModal}
            newProductSlug={this.state.newProductSlug}
            cleanNewProduct={this.cleanNewProduct}
            actions={this.props.actions}
          />
        </Modal>
        <Snackbar
          open={this.state.snackbarIsOpen}
          message={this.state.snackbarText}
          autoHideDuration={7000}
          onRequestClose={this.handleSnackbarRequestClose}
        />
      </div>
    )
  }
}

export default connect(state => ({
  ...state.dynamicTextContents.main_section
}))(Top25)
