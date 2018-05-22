import React from 'react'
import ProfileForm from './ProfileForm'
import Loading from '../../common/Loading/Loading'
import { connect } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../../actions/actionCreators'
import { appendToFormData } from '../../../helpers/helpers'

class ProfileContainer extends React.Component {
  componentWillMount() {
    this.props.fetchUserProfile()
  }

  onSubmit = values => {
    const formData = appendToFormData(values)
    this.props.updateUserProfile(formData)
  }

  render() {
    if (this.props.profile.isLoading) return <Loading />

    return (
      <section className="profile-container">
        <ProfileForm
          onSubmit={this.onSubmit}
          initialValues={this.props.profile.profileData}
        />
      </section>
    )
  }
}

const mapStateToProps = ({ profile }) => ({ profile })
const actions = { fetchUserProfile, updateUserProfile }

export default connect(mapStateToProps, actions)(ProfileContainer)
