import React from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import mapPhoto from '../../../images/map-photo.png'
const title = 'The Biggest Network of Startups & VCs in MENA'

const Map = () => (
  <div className="map">
    <Card style = {{backgroundColor: '#F6F7F9'}}>
      <CardTitle>
        <h1>{title}</h1>
      </CardTitle>
      <CardText
      style = {{display: 'flex', padding: '0px 0px'}}
      >
      <img src={mapPhoto} className="map-photo" />
      </CardText>
    </Card>
  </div>
)

export default Map
