import { Switch, Route } from 'react-router-dom'
import React from 'react';
import Jumpotron from './jumbotron';
import PostList from '../containers/post-list';
import RegistrationForm from '../containers/signup';
import UserProf from'../containers/user_prof';
import WrappedNormalLoginForm from '../components/login';
import CreatePost from './create-post';
import Commend from './comment';
import Profile from './profile';
import { Row, Col} from 'antd';

class Main extends React.Component {
    render() {
        return (

            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Switch>
                        <Route exact path='/' component={Jumpotron}/>
                        <Route exact path='/signup' component={RegistrationForm}/>
                        <Route exact path='/login' component={WrappedNormalLoginForm}/>
                        <Route exact path='/posts' component={PostList}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Route exact path='/posts/create' component={CreatePost}/> 
                        <Route exact path='/posts/:postid' component={Commend}/>
                        <Route exact path='/users/:userid' component={UserProf}/>
                                             
                    </Switch>
                </Col>
                <Col span={6}></Col>
            </Row>
                
        );
    }
}

export default Main;