import React from 'react'

class AnswerChallenge extends React.Component {

  componentDidMount() {
    // todo: add the required data for Formaloo to be use able
  }

  render() {
    const { challenge } = this.props
    return <div className="answer-challenge">{challenge.title}</div>
  }
}

export default AnswerChallenge
