import React from 'react';
import NavBar from './components/navbar';
import Main from './components/main';

import * as actions from './actions/auth';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import CustomLayout from './containers/layout';


class App extends React.Component{

    componentDidMount () {
       this.props.onTryAutoSignUp();
    }

    render(){
        console.log('---------------ARXH-------------',{...this.props})
        return (
            <CustomLayout {...this.props}>
                <Main/>

            </CustomLayout>
        );
    }
}




const mapStateToProps = state => {
    console.log('state in src.App :',state)
    return {
        isAuthenticated: state.reducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);


