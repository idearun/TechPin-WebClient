import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import animationWebM from '../../../images/Machine.webm'
import animationMP4 from '../../../images/Machine.mp4'
const title = 'Make Smart Decisions With Data'

const ourGoal =
  ' TechPin goal is to become the main database of MENA’s most innovative companies, based on true and transparent data, not fake advertisements. We created a powerful and scalable crowdsourcing approach for data collection, leveraging a strong network of contributors, entrepreneurs, VCs and accelerators, and in-house data teams armed with our powerful data-mining solution, to achieve this goal.'

const desc =
  "TechPin's Data mining machine is the leading tool for VCs and Entrepreneurs to discover industry trends, investments, and information about middle east's companies, from startups to the most established companies."

const DataAnalysis = () => (
  <div className="data-analysis">
    <Card>
      <CardTitle>
        <h1>{title}</h1>
      </CardTitle>
      <CardText
      className = "data-analysis-card-text" 
      style = {{display: 'flex', padding: '0 25px', boxShadow: 'none'}}
      >
        {/* <p className="desc">{desc}</p> */}
        <div className="animation">
          <video loop muted autoPlay>
            <source src={animationWebM} type="video/webm" />
            <source src={animationMP4} type="video/mp4" />
          </video>
        </div>
        <p className="desc">{desc}<br/>{ourGoal}</p>
      </CardText>
    </Card>
  </div>
)

export default DataAnalysis
