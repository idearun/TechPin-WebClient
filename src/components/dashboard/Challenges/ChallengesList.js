import React from 'react'
import ChallengeCard from './ChallengeCard'

const ChallengesList = ({ challenges, onClick }) => (
  <div className="challenges-list">
    {challenges.map((challenge, index) => (
      <ChallengeCard key={index} challenge={challenge} onClick={onClick} />
    ))}
  </div>
)

export default ChallengesList
