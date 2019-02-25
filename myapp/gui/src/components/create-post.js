import React from 'react';
import {
    Form, Button,Input,Icon
  } from 'antd';
import Axios from 'axios';
  
  
const TextArea = Input.TextArea;



class CreatePost extends React.Component {

    handleFormSubmit=(event) => {
        event.preventDefault()
        const title = event.target.elements.title.value;
        const text = event.target.elements.text.value;
        console.log('tha steilw: ',title,text,new Date(),8)
        console.log('*************-------------------*************-------',this.props.history)
        Axios.defaults.headers = {
            "Content-Type":"application/json",
            Authorization : localStorage.getItem('token')
        }
        return Axios.post('http://127.0.0.1:8000/api/posts/',{
            "title":title,
            "text":text,
            "post_date":new Date(),
            "user":localStorage.getItem('userid')
        })
        .then(res => {
            console.log(res)
            this.props.history.push('/');
        })
        .catch(error => console.error(error));
        
        
    }
    render(){
        return(
            <div className="row justify-content-center">               
                <Form onSubmit={(event) => this.handleFormSubmit(event)}>
                    <Form.Item>
                        <h2>Δημιουργία ανάρτησης</h2>
                    </Form.Item>
                    <Form.Item label='Τιτλος'>
                        <Input name = 'title' placeholder="Τιτλος" />
                    </Form.Item>
                    <Form.Item label='Κείμενο'>
                        <TextArea name ='text' rows={4} placeholder='κείμενο' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" >
                            Aνέβασμα
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CreatePost;