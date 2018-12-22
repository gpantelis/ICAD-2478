import React from 'react';
import axios from 'axios';

import {Button,Card} from 'antd'
import Posts from '../component/Post';
import CustomForm from '../component/FormPost';

class PostDetailView extends React.Component{
	
	state = {
		post:{}
	}
/*Προκειμένου να εμφανισεί στο Layout ΤΗΝ ΜΙΑ ΑΝΑΡΤΗΣΗ πρεπει να περάσει στο Posts σαν array και οχι σαν ατοφιο λεξικο,
ετσι δημιουργώ μια προσωρινή μεταβλητη temp η οποία είναι αυτό το array και σε αυτην κάνω push τη μια αναρτηση και στη συνέχεια περνάω στο posts
αυτη τη συγκεκριμένη μεταβλητη temp*/
	componentDidMount(){
		const id = this.props.match.params.postID;
		axios.get(`/api/${id}/`)
		.then(res => {
			var temp = []
			temp.push(res.data)
			this.setState({
				//post:temp	
				post:res.data		
			})
			console.log(this.state.post)

		})
	}

	handleDelete(event){
		//const id = this.props.match.params.postID;
		axios.delete('/api/7/')
		.then(res => {
			console.log(res)
		}).catch(error =>console.error(error))
		///this.props.history.push('/');
		//this.forceUpdate();
		
	}
	render(){

		return(
			<div>
		        <Card title={this.state.post.title}>
		          <p> {this.state.post.text} </p>
		        </Card>
			<CustomForm requestType = "put" postID={this.props.match.params.postID} btnText="Update"/>
			<form onSubmit={(event) => this.handleFormSubmit(event)}>
				<Button type="danger" htmlType ="submit">Delete</Button>
			</form>
			</div>
		);
	}
}

export default PostDetailView;