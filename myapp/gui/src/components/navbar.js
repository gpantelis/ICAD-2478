import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link,} from 'react-router-dom';


export default class NavBar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      a:false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  isAuthNav(){
    return(
      <Navbar color="dark" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <LinkContainer to='/'>
            <NavbarBrand >ΑΝΟΜΟΛΟΓΗΤΑ</NavbarBrand>
          </LinkContainer>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/profile" > Προφίλ </NavLink>
              </NavItem> 
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                Επιλογές
                </DropdownToggle>
                <DropdownMenu right>
                  <LinkContainer to = '/posts'>
                    <DropdownItem>
                    Αναρτήσεις
                    </DropdownItem>
                  </LinkContainer>
                  <LinkContainer to = '/posts/create'>
                    <DropdownItem>
                    Δημιουργία ανάρτησηςQQQQQQQQQQQQ
                    </DropdownItem>
                  </LinkContainer>
                  <DropdownItem divider />
                  <LinkContainer to = '/logout'>
                    <DropdownItem>
                      Αποσύνδεση
                    </DropdownItem>
                  </LinkContainer>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }

  isNotAuthNav(){
    return(
      <Navbar color="dark" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <LinkContainer to='/'>
            <NavbarBrand >ΑΝΟΜΟΛΟΓΗΤΑ</NavbarBrand>
          </LinkContainer>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <LinkContainer to = '/login'>
                <NavItem>
                <NavLink>
                   Σύνδεση 
                </NavLink>
                </NavItem>
              </LinkContainer>
              <NavItem>
                <NavLink tag={Link} to="/signup" > Εγγραφή </NavLink>
              </NavItem>
              <NavItem>
                <Link  to="/signup" > Εγ2γραφή </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
  render() {
    console.log('------------------KOITA NAVBAR----------------------')
    return (
      <div>
        
            {
              this.state.a ? 
              this.isAuthNav()
              :
              this.isNotAuthNav()
            }
            
    </div>
    );
  }
}