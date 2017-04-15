import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Main from '../components/Main';
import Top25 from '../components/top25/Top25';
import AllProducts from '../components/a-z/AllProducts';
import EditInfo from '../components/singlePage/EditInfo';
import RequireAuth from '../components/HOCs/RequireAuth';
import ContributePage from '../components/staticPages/ContributePage';
import AboutPage from '../components/staticPages/AboutPage';
import SinglePage from '../components/singlePage/SinglePage';
import CategoryPage from '../components/categoryPage/CategoryPage';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Top25} />
    <Route path="about" component={AboutPage} />
    <Route path="contribute" component={ContributePage} />
    <Route path="categories/:category" component={CategoryPage} />
    <Route path="all-entries" component={AllProducts} />
    <Route path=":startUpName" component={SinglePage}/>
    <Route path=":startUpName/edit" component={RequireAuth(EditInfo)} />
  </Route>
);
