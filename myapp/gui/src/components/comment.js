import {Button ,Avatar, Comment, Tooltip, List , Icon, Form, Input} from 'antd';
import { Collapse } from 'antd';
import * as actions from '../actions/getPostsActions';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';
import{bindActionCreators} from 'redux';
import Axios from "axios";


const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

 class Commend extends React.Component{
  
  handleFormSubmit=(event) => {
    event.preventDefault()
    
    const text = event.target.elements.text.value;
    console.log('tha steilw: ',this.props.post.id,text,8)
    return Axios.post('http://127.0.0.1:8000/api/comments/',{
        "user":8,
        "post":this.props.post.id,
        "text":text
        
        
    })
    .then(res => {
        console.log(res)
        this.props.history.push('/');
    })
    .catch(error => console.error(error));
  }

    componentWillMount() {
        
          this.props.actions.loadComments(this.props.post.id);
        
      }

        compatibleDate(date){
          let old = new Date(date)
          let year = old.getFullYear()
          let month = old.getMonth() + 1;
          let day = old.getDate();
          let hour = old.getHours();
          let minute = old.getMinutes();
          if(hour < 10 || hour === 0){
            hour = '0' + hour 
          }
          if(minute < 10 || minute ===0){
            minute = '0' + minute
          }
          if(day < 10 ){
            day = '0' + day
          }
          if(month < 10){
            month = '0' + month
          }
          let nea = day + '/' +month + '/' + year + ' ' + hour + ':' + minute;
          return nea;
          
        }

        render () {
          console.log('000000000000000000000000000000 ',this.props)
          if (!this.props.post){
            return (<h3>Δεν έχετε επιλεξει κάποια ανάρτηση</h3>)
          }

          if(!this.props.commends || this.props.commends===undefined){
            return (
              <div>
              <Comment
              author={this.props.post.username}
              
              avatar={(
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="User"
                />
              )}
              content={(
                <p>{this.props.post.text}</p>
              )}
              datetime={this.compatibleDate(this.props.post.post_date)}
                
      
            />

            <h4>Δεν υπάρχουν σχόλια για αυτή την ανάρτηση</h4>
            </div>
            )
          }
          return (
          <div>

            <Comment
              author={this.props.post.username}
              
              avatar={<Avatar style={{ backgroundColor: '#ff4d4d' }} icon="user" />}
   
              
              content={(
                <p>{this.props.post.text}</p>
              )}
              datetime={this.compatibleDate(this.props.post.post_date)}
                
      
            />
 
              <List
                size = "large"
                className="comment-list"
                header={`${this.props.commends.length} replies`}
                itemLayout="horizontal"
                dataSource={this.props.commends}
                renderItem={item => (
                  <Comment
                    //actions={item.actions}
                    author={item.username}
                    avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    content={item.text}
                    //datetime={item.datetime}
                  />
                )}
              />
            <Collapse expandIcon={<Icon type="plus" />}>
                
                <Panel showArrow={false} header="Σχολιάστε..." key="1">
                  <Form onSubmit={(event) => this.handleFormSubmit(event)}>
                          <Form.Item >
                              <TextArea name ='text' rows={3} />
                          </Form.Item>
                          <Form.Item>
                              <Button htmlType="submit" type="primary">
                                  Aνέβασμα
                              </Button>
                          </Form.Item>
                      </Form>
                </Panel>

                
              </Collapse>
            
          </div>
          )

        }
    }


const mapStateToProps = (state) => {
 
  console.log('commend state: ',state)
 
  return {
      post: state.postOneReducer,
      commends:  state.commentReducer,
      hascommends : !state.commentReducer
  }
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps,mapDispatchToProps)(Commend);