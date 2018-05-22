import React from 'react'
import { connect } from 'react-redux'
import { fetchUserProfile } from '../../../actions/actionCreators'
import Loading from '../../common/Loading/Loading'
import { Link } from 'react-router'
import { FlatButton } from 'material-ui'

class UserStatsContainer extends React.Component {
  componentWillMount = () => {
    if (this.props.profile.profileData) return
    this.props.fetchUserProfile()
  }

  render() {
    if (this.props.profile.isLoading) return <Loading />

    const { profileData } = this.props.profile
    if (!profileData) return <div>No Data Was Found, Please Contact the support</div>

    return (
      <div className="profile-stats-container">
        <ul>
          <li>
            Welcome {profileData.first_name || ''} {profileData.last_name || ''}
          </li>

          <li>2. points</li>
          <li>3. user level in Hackathon</li>

          <li>
            <FlatButton label="Go To Hackathon Page" href="/dashboard/challenge" />
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProp = state => ({
  profile: state.profile,
})

export default connect(mapStateToProp, { fetchUserProfile })(UserStatsContainer)
