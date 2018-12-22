import React from 'react';
import {Route} from 'react-router-dom';

import PostListView from './PostListView';
import PostDetailView from './PostDetailView';
const BaseRouter = () => (
<div>
	<Route exact path='/' component={PostListView}/>
	<Route exact path='/:postID' component={PostDetailView}/>
</div>

);

export default BaseRouter;