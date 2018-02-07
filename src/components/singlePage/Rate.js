import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import Skeleton from 'react-loading-skeleton'

const int = input => parseInt(input, 10)

const NumberBox = ({ number, userRate }) => (
  <div
    id={number}
    className={`rate-box ${int(userRate) === int(number) ? 'rate-selected' : ''}`}
  >
    {number}
  </div>
)

export default class Rate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userRate: null,
      userRated: false,
      snackBarIsOpen: false,
      snackBarText: ''
    }
  }

  formatRateToSend = rate => {
    let rateToInt = parseInt(rate, 10)
    if (rateToInt === 0 || rateToInt === 1 || rateToInt === 2) return 1
    if (rateToInt === 3 || rateToInt === 4) return 2
    if (rateToInt === 5 || rateToInt === 6) return 3
    if (rateToInt === 7 || rateToInt === 8) return 4
    if (rateToInt === 9 || rateToInt === 10) return 5
  }

  handleRate = event => {
    if (this.props.authenticated) {
      this.setState({ userRate: event.target.id })
      this.props.submitRate(this.formatRateToSend(event.target.id), this.props.slug)
    } else {
      this.setState({
        snackBarIsOpen: true,
        snackBarText: 'Please login'
      })
    }
  }

  handleSnackBarClose = () => {
    this.setState({
      snackBarIsOpen: false
    })
  }

  render() {
    if (this.props.isLoading) {
      return <Skeleton className="single-page-rate" />
    } else {
      return (
        <div className="single-page-rate">
          <span style={{ alignSelf: 'flex-start' }}>
            <span>How likely do you recommend {this.props.name} to others ?</span>
          </span>
          <div className="rate-box-container" onClick={this.handleRate}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
              <NumberBox
                key={number}
                number={number}
                userRate={this.state.userRate}
              />
            ))}
            {/* <div
          id="0"
          className={`rate-box ${this.state.userRate == 0
            ? "rate-selected"
            : ""}`}
        >
          0
        </div>
        <div
          id="1"
          className={`rate-box ${this.state.userRate == 1
            ? "rate-selected"
            : ""}`}
        >
          1
        </div>
        <div
          id="2"
          className={`rate-box ${this.state.userRate == 2
            ? "rate-selected"
            : ""}`}
        >
          2
        </div>
        <div
          id="3"
          className={`rate-box ${this.state.userRate == 3
            ? "rate-selected"
            : ""}`}
        >
          3
        </div>
        <div
          id="4"
          className={`rate-box ${this.state.userRate == 4
            ? "rate-selected"
            : ""}`}
        >
          4
        </div>
        <div
          id="5"
          className={`rate-box ${this.state.userRate == 5
            ? "rate-selected"
            : ""}`}
        >
          5
        </div>
        <div
          id="6"
          className={`rate-box ${this.state.userRate == 6
            ? "rate-selected"
            : ""}`}
        >
          6
        </div>
        <div
          id="7"
          className={`rate-box ${this.state.userRate == 7
            ? "rate-selected"
            : ""}`}
        >
          7
        </div>
        <div
          id="8"
          className={`rate-box ${this.state.userRate == 8
            ? "rate-selected"
            : ""}`}
        >
          8
        </div>
        <div
          id="9"
          className={`rate-box ${this.state.userRate == 9
            ? "rate-selected"
            : ""}`}
        >
          9
        </div>
        <div
          id="10"
          className={`rate-box ${this.state.userRate == 10
            ? "rate-selected"
            : ""}`}
        >
          10
        </div> */}
          </div>
          <Snackbar
            open={this.state.snackBarIsOpen}
            message={this.state.snackBarText}
            autoHideDuration={3500}
            onRequestClose={this.handleSnackBarClose}
          />
        </div>
      )
    }
  }
}
