import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import StartupRow from './StartupRow';
import CircularProgress from 'material-ui/CircularProgress';

const toolbarStyles = {
  color: 'white',
}

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      products: {charecter: []},
      aSyncCall: false,
    }
  }
  componentDidMount = () => {
    if (Object.keys(this.props.allProducts).length === 0) {
      this.setState({aSyncCall: true})
      this.props.getAllProducts()
        .then(allProducts => this.setState({products: allProducts, aSyncCall: false}))
    } else {
      this.setState({products: this.props.allProducts})
    }
    
    var h = document.getElementById("readout");
    var stuck = false;
    var stickPoint = getDistance();

    function getDistance() {
      var topDist = h.offsetTop;
      return topDist;
    }

    window.onscroll = function(e) {
      var distance = getDistance() - window.pageYOffset;
      var offset = window.pageYOffset;
      if ( (distance <= 0) && !stuck) {
        h.classList.add("fixed")
        stuck = true;
      } else if (stuck && (offset <= stickPoint)){
        h.classList.remove("fixed");
        stuck = false;
      }
    }
  }

  searchHandler = (event, value) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filterSearchTerm = (list, searchTerm) => {
    if (searchTerm !== '') {
      let filterdList = list.filter(item => item.name_en.match(new RegExp(searchTerm, 'gi')))
      return filterdList;
    } else {
      return list;
    }
  }

  render() {
    return (
      <div className='main-content'>
        <Toolbar className='all-entries-toolbar' id='readout' >
          <ToolbarGroup firstChild={true} >
            <ToolbarTitle text="Alphabetically ordered list of startups" style={toolbarStyles}/>
          </ToolbarGroup>
          <ToolbarGroup className='search-box-wrapper'>
            <input type='text' name='search' id='search' placeholder='search...' onChange={this.searchHandler}/>
          </ToolbarGroup>
        </Toolbar>
        <div className="all-entries-wrapper">
        {this.state.aSyncCall ? <CircularProgress id='spinner' color={'#2962FF'} size={50}/> :
          Object.keys(this.state.products).sort().map((charecter, i) => {
          if (this.state.products[charecter].length > 0) {
            return <StartupRow
              searchTerm={this.state.searchTerm}
              key={i} char={charecter}
              filterdList={this.filterSearchTerm(this.state.products[charecter], this.state.searchTerm) } />
          }
        })}
        </div>
      </div>
    );
  }
}
AllProducts.propTypes = {
};
export default connect(null, actions)(AllProducts);
