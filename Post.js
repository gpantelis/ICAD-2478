import React, {Component} from 'react'
import { List, Avatar, Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class Posts extends Component{
	render(){


		return(
		  <List
		    itemLayout="vertical"
		    size="large"
		    pagination={{
		      onChange: (page) => {
		        console.log(page);
		      },
		      pageSize: 10,
		    }}
		    dataSource={this.props.data}
		 
		    renderItem={item => (
		      <List.Item
		        key={item.title}
		        actions={[<IconText type="time" text={item.post_date} />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
		        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
		      >
		        <List.Item.Meta
		          avatar={<Avatar src={item.avatar} />}
		          title={<a href={`/${item.id}`}>{item.user}</a>}
		          description={item.title}
		        />
		        {item.text}
		      </List.Item>
		    )}
		  />
		);
		
	}
}
export default Posts;