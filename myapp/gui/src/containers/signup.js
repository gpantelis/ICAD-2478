import React from 'react';

import {
    Form, Input, Tooltip, Icon, Select, Button, DatePicker,Divider,
  } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../actions/auth';
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.onAuth(
            values.nickname,
            values.password,
            values.confirm,
            values.dep,
            values.year
        );

        this.props.history.push('/posts');

        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Οι δυο κωδικοί δεν ταιριάζουν!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
  
    render() {
      let errorMessage = null;
      if (this.props.error) {
          errorMessage = (
              <p>{this.props.error.message}</p>
          );
          console.log(this.props)
      }
      const { getFieldDecorator } = this.props.form;
    
  
      return (
        <Form layout = "vertical" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Divider><h2>Εγγραφή</h2></Divider>
        </Form.Item>
          <Form.Item
            label={(
              <span>
                Όνομα Χρήστη&nbsp;
                <Tooltip title="Πώς θες οι άλλοι να σε φωνάζουν?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Συμπληρώστε το όνομα χρήστη!', whitespace: true }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username"/>
            )}
          </Form.Item>
          <Form.Item
            label="Κωδικός"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Παρακαλώ συμπλήρωσε το κωδικό!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder = "password" type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="Επιβεβαίωση κωδικού"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Παρακαλώ έλεξε τον κωδικό!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder = "validate password" type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <Form.Item
          label="Τμήμα"
          hasFeedback
        >
          {getFieldDecorator('dep', {
            rules: [
              { required: true, message: 'Επέλεξε τμήμα!' },
            ],
          })(
            <Select name = "dep" placeholder="Παρακαλώ επέλεξε τμήμα">
              <Option value="det">ΔΕΤ</Option>
              <Option value="ode">ΟΔΕ</Option>
              <Option value="pl">ΠΛΗΡΟΦΟΡΙΚΗ</Option>
              <Option value="deos">ΔΕΟΣ</Option>
              <Option value="st">ΣΤΑΤΙΣΤΙΚΗ</Option>
              <Option value="mkt">ΜΑΡΚΕΤΙΝΓΚ</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Έτος εισαγωγής"
          hasFeedback
        >
          {getFieldDecorator('year', {
            rules: [
              { required: true, message: 'Επέλεξε έτος!' },
            ],
          })(
              /*Υπο κατασκευη συνάρτηση που θα επιστρέφει τα 5 τελευταία έτη εισαγωγής*/
            <Select placeholder="Παρακαλώ επέλεξε έτος εισαγωγής">
              <Option value="6">... - 2014</Option>
              <Option value="5">2014</Option>
              <Option value="4">2015</Option>
              <Option value="3">2016</Option>
              <Option value="2">2017</Option>
              <Option value="1">2018</Option>
            </Select>
          )}
        </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">Εγγραφή</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create()(RegistrationForm);



const mapStateToProps = (state) => {
    return {
        loading: state.reducer.loading,
        error: state.reducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password1, password2,dep,year) => dispatch(actions.authSignup(username, password1, password2,dep,year)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);