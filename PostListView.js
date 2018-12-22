import React from 'react';
import axios from 'axios';

import Posts from '../component/Post';
import CustomForm from '../component/FormPost';


class PostListView extends React.Component{
	
	state = {
		posts:[]
	}

	componentDidMount(){
		axios.get('/api/')
		.then(res => {
			this.setState({
				posts:res.data
			})
			console.log(res.data)
		})
	}
	render(){
		return(
			<div>
				<Posts data={this.state.posts}/>
				<br/>
				<h2>Create Post</h2>
				<CustomForm requestType = "post" postID={null} btnText="Create"/>
			</div>
			);
	}
}

export default PostListView;

