import React from 'react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import * as actions from '../actions/getPostsActions';
import Posts from '../components/post'

import {Avatar, Card} from 'antd';

  const { Meta } = Card;

class Profile extends React.Component {

    componentWillMount() {

            this.props.actions.loadUser(localStorage.getItem('userid'));
        
      
    }

    render(){
        if(!this.props.user){
            return (
                <h4>περιμενετε..</h4>
            )
        }
        console.log('User prof is Running to PROFILWE..****************************************************.',this.props.user)
        const year = 'Έτος : ' + this.props.user.date_of_birth
        const dep = 'Τμήμα : ' + this.props.user.department
        return (
            <div>
                
                <Card style={{ width: '100%' , marginTop: 16 }}>
                    <Meta
                        avatar={<Avatar size={64} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwsXX4i9jKQeP34wuJasVhdDeUrcNPUbUgvslv5G1lcG9EYArspQ" />}
                        title={localStorage.getItem('username')}
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
    console.log('Profile is Running..****************************************************.',state)
    if(state.postOneReducer){
            return {
        
        posts : state.postsReducer.filter(post => post.user === localStorage.getItem('userid')) ,
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

export default connect(mapStateToProps,mapDispatchToProps)(Profile);