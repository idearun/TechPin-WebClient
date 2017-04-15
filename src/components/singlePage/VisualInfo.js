import React, {PropTypes} from 'react';
import StarRating from '../sharedComponents/StarRating'

import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionWork from 'material-ui/svg-icons/action/work';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

const styles = {
    svgIcon: {
        width: '20px', 
        color:'#0D47A1'
    },
}
export default class VisualInfo extends React.Component {

  constructor() {
    super();
    this.state = {
      snackBarOpen: false,
      rateCount: null,
      averageRate: null,
      product: {}
    }
  }

  componentDidMount = () => {
    if(this.props.product) {
        this.setState({product: this.props.product})
    }
  }

  componentWillReceiveProps = (nextProps) => {
      if(nextProps.rating) {
          this.setState({product: Object.assign({}, this.state.product, {
              rate_count: nextProps.rateCount,
              average_p_rate: nextProps.rating
          })})
      }
  }


  render() {
    // let product = this.props.product
    const editAble = this.props.editAble;
    return (
        <div className='visual-info'>
        <div className='single-page-visual-parent' >
            <div className='single-page-visual-widget'>
            {`${this.props.average_p_rate.toFixed(1)}`}
            <StarRating rating={this.props.average_p_rate} className='visual-info-star' editable={false}/>
            </div>
            <div>
                <div className='visual-info-sub-span'>
                    <span>{this.props.rate_count}</span> 
                    <SocialPeople style={styles.svgIcon}/>
                </div>
            </div>
        </div>
        <div className='single-page-visual-parent' >
            <div className='single-page-visual-widget'>
                {this.props.n_p_score}
            </div>
            <div>
                <div className='visual-info-sub-span'>
                    <span>NPS</span>
                    <ActionGrade style={styles.svgIcon}/>
                </div>
            </div>
        </div>
        <div className='single-page-visual-parent' >
            <div className='single-page-visual-widget'>
                {this.props.employees || '?'}
            </div>
            <div>
                <div className='visual-info-sub-span'>
                    <span>Empl.</span>
                    <ActionWork style={styles.svgIcon}/>
                </div>
            </div>
        </div>
        <div className='single-page-visual-parent' >
            <div className='single-page-visual-widget'>
                {this.props.year || '?'}
            </div>
            <div>
                <div className='visual-info-sub-span'>
                    <span>Launch</span>
                    <ActionFlightTakeoff style={styles.svgIcon}/>   
                </div>
            </div>
        </div>
    </div>);
  }
}

VisualInfo.propTypes = {
};

