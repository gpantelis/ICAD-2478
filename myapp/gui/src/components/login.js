import React from 'react';
import {
    Form, Icon, Input, Button, Divider,Spin,
  } from 'antd';
import * as actions from '../actions/auth';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Login extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.onAuth(values.userName, values.password);

            
          }
          if(this.props.loading){
            this.props.history.push('/posts');
          }
        });
    }

    render(){
      let errorMessage = null;

      if (localStorage.getItem('userid')){
        return (
          <h3>Συνδέθηκες επιτυχώς {localStorage.getItem('username')}</h3>
        )
      }
      if (this.props.error) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
          console.log(this.props)
      }
        const { getFieldDecorator } = this.props.form;
        return (

            <div className="row justify-content-center">

            {errorMessage}
            {
                this.props.loading ?

                <Spin indicator={antIcon} />

                :
              <Form onSubmit={this.handleSubmit} className="login-form">
                        
                  <Form.Item>
                  <Divider><h2>Είσοδος</h2></Divider>
                  </Form.Item>
                
                  <Form.Item>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                  </Form.Item>
                  <Form.Item>
                  <div className="row justify-content-center">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Σύνδεση
                    </Button>
                  </div>
                    ή αν δεν είσαι μελός για Εγγραφή πάτα <NavLink to="/signup"> εδώ</NavLink>
                  </Form.Item>
                </Form>
              }
              </div>
        );
          
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
  console.log('login state: ',state)
  return {
      loading: state.reducer.loading,
      error: state.reducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);