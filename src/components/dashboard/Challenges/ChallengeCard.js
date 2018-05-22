import React from 'react'

const ChallengeCard = ({ challenge, onClick }) => {
  const clickHandler = () => onClick(challenge)
  return (
    <div className="challenge-card" onClick={clickHandler}>
      <div className="challenge-title">{challenge.title}</div>
      <div className="challenge-description">{challenge.description}</div>
      <div className="challenge-has-answered-before">
        {challenge.has_answered && <AlreadyAnswered />}
      </div>
    </div>
  )
}

const AlreadyAnswered = () => (
  <div className="already-answered">
    <span>Answered</span>
    <i className="fa fa-check" aria-hidden="true" />
  </div>
)

export default ChallengeCard
