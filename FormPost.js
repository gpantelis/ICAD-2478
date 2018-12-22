import React from 'react'
import {  Form, Input, Button,} from 'antd';
import axios from 'axios';

class CustomForm extends React.Component {

  handleFormSubmit=(event,requestType,postID) => {

    //event.preventDefault()
    const title = event.target.elements.title.value;
    const text = event.target.elements.text.value;

    switch (requestType){
      case 'post':
        return axios.post('api/',{
          "title": title,
          "text": text,
          "post_date": "2018-12-22T05:44:00+02:00",
          "user": 8
        })
        .then(res => console.log(res))
        .catch(error =>console.error(error));
      case 'put':
        return axios.put(`api/${postID}/`,{
          title:title,
          text:text
        })
        .then(res => console.log(res))
        .catch(error =>console.error(error));

    }
  }





 render() {

    return (
      <div>
        <Form onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.requestType,
          this.props.postID
          )}>
          <Form.Item >
          </Form.Item>
          <Form.Item
            label="title"
          >
            <Input name = "title" placeholder="put title here" />
          </Form.Item>
          <Form.Item
            label="text"
          >
            <Input name = "text" placeholder="Enter some content here..." />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm