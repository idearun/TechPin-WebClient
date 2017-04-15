import React, {PropTypes} from 'react';
import contributeText from '../../helpers/contributeText';

import Paper from 'material-ui/Paper';
import SinglePageToolbar from '../singlePage/SinglePageToolbar';

import gitRepo from '../../helpers/links'

const style = {
  Width: '100%',
}

const ContributePage = (props) => {
  return (
    <div className="about-page">
        <Paper style={style} zDepth={3} className="about-content-wrapper">
          <SinglePageToolbar editAble={false}/>
          <div className="about-content">
            <h3>Contribute</h3>
            <p>{contributeText.contribute}</p>
            <h3>Add New Products</h3>
            <p>{contributeText.addNewProduct}</p>
            <h3>Rate & Comment</h3>
            <p>{contributeText.rateAndComment}</p>
            <h3>Edit & Update Products</h3>
            <p>{contributeText.editAndUpdate}</p>
            <h3>Share A Product</h3>
            <p>{contributeText.shareAProduct}</p>
            <h3>Development</h3>
            <p>{contributeText.development} <a href={gitRepo} target='_blank'>GitHub.</a></p>
            <h3>Contributor’s Rank</h3>
            <p>{contributeText.contributors}</p>
            <p>{contributeText.contributors}</p>
            <p>
              Once your points reaches a certain amount,
              You will become an Editor.
              Learn more about Editors in our about page.
            </p>
          </div>
        </Paper>
    </div>
  );
}

ContributePage.propTypes = {
};

export default ContributePage;
