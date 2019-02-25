import React, {Component} from 'react'
import { List, Avatar, Icon,} from 'antd';
import * as actions from '../actions/getPostsActions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class Posts extends Component{
	
	temp(item){
		console.log(item,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
		this.props.actions.getOnePost(item);
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

	render(){
	//	if(this.props.data.length < 2 && !this.props.data.user){
			if(!this.props.data){
			return (
				<div>
						<hr/>
						<h2>Δεν υπάρχουν αναρτήσεις</h2>
						<hr/>
				</div>
				
			)
		}
		
		return(
			
      <List
		    itemLayout="vertical"
		    size="medium"
		    pagination={{
		      onChange: (page) => {
		        console.log(page);
		      },
		      pageSize: 10,
		    }}
		    dataSource={this.props.data.reverse()}
				
		    renderItem={item => (
		      <List.Item onClick={() =>this.temp(item)}
		        key={item.id}
		        actions={[<IconText type="time" text={this.compatibleDate(item.post_date)} />]}>
		        <List.Item.Meta
		          avatar={<Avatar style={{ backgroundColor: '#ff4d4d' }} icon="user" />}
		          title={<Link to = {`/users/${item.user}`} ><div style = {{color:'black'}}>{item.username}</div></Link>}
							description={<Link to = {`/posts/${item.id}`} ><div style = {{color:'black'}}>{item.title}</div></Link>}
							
		        />
						{<Link to = {`/posts/${item.id}`} ><div style = {{color:'black'}}>{item.text}</div></Link>}
		        
		      </List.Item>
		    )}
		  />
		);
		
	}
}

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(null,mapDispatchToProps)(Posts);