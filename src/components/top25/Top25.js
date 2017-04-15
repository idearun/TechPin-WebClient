import React, {PropTypes} from 'react';

import Modal from 'react-modal';
import AddForm from './AddForm';
import EditInfo from '../singlePage/EditInfo';
import WidgetColumn from './WidgetColumn'
import sort from '../../helpers/helpers';

import StartUpWidget from './StartUpWidget';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';

function generateListItem (product, i) {
  return <StartUpWidget product={product} key={product.name_en} i={i}/>
};
const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.4)',
  },

};

export default class Top25 extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        snackbarIsOpen: false,
        snackbarText: '',
        newProductSlug: null,
        addProductModalIsOpen : false,
        addVersionModalIsOpen : false,
        topProducts: {
          topNew: [],
          topRanked: [],
          randomProducts: []
        }
      }
    }

    handleAddProductModalOpen = () => {
      this.setState({addProductModalIsOpen: true});
    }

    closeAddProductModal = () => {
     this.setState({addProductModalIsOpen: false});
   }

    handleAddVersionModalOpen = () => {
      this.setState({addVersionModalIsOpen: true});
    }

    closeAddVersionModal = () => {
     this.setState({addVersionModalIsOpen: false});
   }

   componentWillMount = () => {
     if (Object.keys(this.props.topProducts).length > 0) {
       const topProducts = this.props.topProducts;
       this.setState({topProducts: {
        //topNew: sort(topProducts.topNew, 'nps'), 
        //topNew will be in timely order form server
         topNew: topProducts.topNew, 
         topRanked: sort(topProducts.topRanked, 'nps'), 
         randomProducts: sort(topProducts.randomProducts, 'nps') 
       }}
       );
     }
   }

   componentWillReceiveProps = (nextProps) => {
     if (Object.keys(nextProps.topProducts).length > 0) {
       this.setState({topProducts: {
         topNew: nextProps.topProducts.topNew, 
         topRanked: sort(nextProps.topProducts.topRanked, 'nps'), 
         randomProducts: sort(nextProps.topProducts.randomProducts, 'nps') 
       }}
       );
     }
   }
   persistNewProduct = (slug) => {
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
        snackbarIsOpen: false,
      });
    };


    render() {
      return (
        <div className='top25 main-content'>
          <header className="top25-header">
            <span>Top Pins</span>
            <p className="sub-header">Dynamic list of startups & accelerators</p>
          </header>
          <main className="flex-container">
            <WidgetColumn
              productList={this.state.topProducts.topRanked}
              title='Rated By Poeple'/>
            <WidgetColumn
              productList={this.state.topProducts.randomProducts}
              title='Random'/>
            <WidgetColumn
              productList={this.state.topProducts.topNew}
              title='New Pins'/>
          </main>
          <FloatingActionButton secondary={true} className='floating-action-button' onClick={this.handleAddProductModalOpen}>
            <ContentAdd />
          </FloatingActionButton>
          <Modal
            isOpen={this.state.addProductModalIsOpen}
            onRequestClose={this.closeAddProductModal}
            style={modalStyle}
            className='add-modal'
            overlayClassName="add-overlay"
            contentLabel="Modal">
              <AddForm closeModal={this.closeAddProductModal} persistNewProduct={this.persistNewProduct}/>
          </Modal>
          <Modal
            isOpen={this.state.addVersionModalIsOpen}
            onRequestClose={this.closeAddVersionModal}
            style={modalStyle}
            className='add-modal'
            overlayClassName="add-overlay"
            contentLabel="Modal">
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
            autoHideDuration={4000}
            onRequestClose={this.handleSnackbarRequestClose}
          />
        </div>
      );
    }
  }
