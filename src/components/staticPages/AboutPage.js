import React from 'react';
import aboutText from '../../helpers/aboutText';

import Paper from 'material-ui/Paper';
import SinglePageToolbar from '../singlePage/SinglePageToolbar';

import gitRepo from '../../helpers/links'

const style = {
  Width: '100%',
}

const AboutPage = (props) => {
  return (
    <div className="about-page">
        <Paper style={style} zDepth={3} className="about-content-wrapper">
          <SinglePageToolbar editAble={false}/>
          <div className="about-content">
            <h2>About</h2>
            <p>{aboutText.about}</p>
            <h3>Why Open Source?</h3>
            <p>{aboutText.whyOpenSource} <a href={gitRepo} target='_blank'> TechPin GitHub Repository right here</a></p>
            <h3>Why Crowdsourced?</h3>
            <p>{aboutText.whyCrowdFund}</p>
            <h3>Why Non-profit?</h3>
            <p>{aboutText.whyNonProfit}</p>
            <h3>What is Editor’s Rating?</h3>
            <p>{aboutText.whatIsRating}</p>
            <h3>What is NPS Score?</h3>
            <p>{aboutText.NPS}</p>

            <p><a href="http://www.medallia.com/net-promoter-score/">read more about this rating</a></p>
            <p>TechPin initial codebase was contributed by <a href="http://www.idearun.co/">idearun Startup Studio</a>.</p>
          </div>
        </Paper>
    </div>
  );
}

export default AboutPage;
