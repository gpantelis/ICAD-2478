import React from 'react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import * as actions from '../actions/getPostsActions';
import Posts from '../components/post'

import {Avatar, Card} from 'antd';

  const { Meta } = Card;

class UserProf extends React.Component {

    componentWillMount() {
        if(this.props.post){
            this.props.actions.loadUser(this.props.post.user);
        }
      
    }

    render(){
        if(!this.props.post || !this.props.user){
            return (<h1>Δεν επιλεχθηκε χρήστης</h1>)
        }
        console.log('User prof is Running..****************************************************.',this.props.posts)
        const year = 'Έτος : ' + this.props.user.date_of_birth
        const dep = 'Τμήμα : ' + this.props.user.department
        return (
            <div>
                
                <Card style={{ width: '100%' , marginTop: 16 }}>
                    <Meta
                        avatar={<Avatar size={64} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwsXX4i9jKQeP34wuJasVhdDeUrcNPUbUgvslv5G1lcG9EYArspQ" />}
                        title={this.props.post.username}
                        description={dep}
                    />
                    <Meta
    
                        description={year}
                    />
                </Card>
                <hr/>
                <h4>Αναρτήσεις</h4>
                <br/>
                <div>
                    <Posts data={this.props.posts} posts={this.props.posts}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log('User prof is Running..****************************************************.',state)
    if(state.postOneReducer){
            return {
        post: state.postOneReducer ,
        posts : state.postsReducer.filter(post => post.user === state.postOneReducer.user) ,
        user : state.userReducer
    }
   
    } 
    return {
        post:null,
        posts:null
    }

}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProf);