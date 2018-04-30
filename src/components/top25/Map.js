import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import mapPhoto from '../../../images/map-photo.png'
const title = 'This is a Placeholder'

const Map = () => (
  <div className="data-analysis">
    <Card style = {{backgroundColor: '#F6F7F9'}}>
      <CardTitle>
        <h1>{title}</h1>
      </CardTitle>
      <CardText 
      style = {{display: 'flex', padding: '20px 0px'}}
      >
      <img src={mapPhoto} />
      </CardText>
    </Card>
  </div>
)

export default Map
