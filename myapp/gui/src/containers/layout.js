import React from 'react';


import * as actions from '../actions/auth';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon,Button } from 'antd';

const { Header, Content,Footer } = Layout;

const SubMenu = Menu.SubMenu;

class CustomLayout extends React.Component{
    constructor(props){
        super(props)
    }


    render(){
        if(localStorage.getItem('userid')){
            return (
                <div>
                    <Layout className='layout' style={{ position: "sticky", bottom: "0" }}>
                        <Header>
                        <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                style={{ lineHeight: '64px' }}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={<span><span>{localStorage.getItem('username')}</span> <Icon type="caret-down" /> </span>}
                                    style={{float: 'right'}}
                                >
                                    <Menu.Item key="3"><Link to="/profile">Προφίλ</Link></Menu.Item>
                                    <Menu.Item key="1" onClick={this.props.logout}>Αποσυνδεση </Menu.Item>
                                </SubMenu>
                
                                <Menu.Item key="2"><Link to="/posts/create">Δημιουργία Ανάρτησης</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/posts">Αναρτήσεις</Link></Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{padding: ' 50px 50px'  }}>
                                <div style={{ background: '#fff', padding: 35, minHeight: 300 }}>{this.props.children}</div>
                            </Content>

                            <Footer style={{ textAlign: 'center'}}>
                                Anomologita ©2018 Created by Giorgos Padelis
                            </Footer>
                    </Layout> 
                </div>
            )
        }

        return (
            <div>
                <Layout className='layout' style={{ position: "sticky", bottom: "0" }}>
                    <Header>
                    <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"                
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to ="/login">Είσοδος</Link></Menu.Item>
                        
                            <Menu.Item key="2"><Link to="/signup">Εγγραφή</Link></Menu.Item>
                            
                            <Menu.Item key="3"><Link to="/posts">Αναρτήσεις</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: ' 50px 50px'  }}>
                    
                    <div style={{ background: '#fff', padding: 35, minHeight: 300 }}>{this.props.children}</div>

                    </Content>

                    <Footer style={{ textAlign: 'center'}}>
                            Anomologita ©2018 Created by Giorgos Padelis
                    </Footer>
                 </Layout>  
             
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => { 
    //console.log('eimai sti dispatch to layout kai exei logout edw')
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null,mapDispatchToProps)(CustomLayout));