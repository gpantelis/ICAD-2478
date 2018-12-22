import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';

import {Link} from 'react-router-dom'

const { Header, Content, Footer } = Layout;

class CustomLayout extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
     <Layout className="layout">
      <Header style={{ textAlign: 'left' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to ="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to ="/">List</Link></Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Anomologita ©2018 Created by Giorgos
      </Footer>
    </Layout>

      );
    }

}
export default CustomLayout