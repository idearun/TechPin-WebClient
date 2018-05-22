import React from 'react'
import ChallengesList from './ChallengesList'
import faker from 'faker'
import Modal from 'react-modal'
import  "react-modal/";
import AnswerChallenge from './AnswerChallenge'
import '../../../styles/hackaton.css'

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'auto',
  },
  content: {
    width: '85%',
    height: '80vh'
  }
}

const fakeChallenges = Array(10)
  .fill()
  .map(_ => ({
    title: faker.fake('{{name.firstName}}'),
    description: faker.fake('{{lorem.sentences}}'),
    has_answered: Math.random() > 0.5,
  }))

class ChallengesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      selectedChallenge: null,
    }
  }

  onChallengeSelect = challenge => {
    this.setState({
      isModalOpen: true,
      selectedChallenge: challenge,
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      selectedChallenge: null,
    })
  }

  render() {
    return (
      <div className="challenges-container">
        <div className="challenges-title">Challenges</div>
        <ChallengesList challenges={fakeChallenges} onClick={this.onChallengeSelect} />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          className="add-modal"
          overlayClassName="add-overlay"
          contentLabel="Modal"
        >
          <AnswerChallenge challenge={this.state.selectedChallenge} />
        </Modal>
      </div>
    )
  }
}

export default ChallengesContainer
