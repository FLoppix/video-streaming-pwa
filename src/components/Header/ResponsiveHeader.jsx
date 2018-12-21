import React, { Component } from 'react';
import styled from 'styled-components';
import { Offline, Online } from 'react-detect-offline';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const StyledNavbar = styled(Navbar)`
  background-color: #18293b !important;
`;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <StyledNavbar color="dark" dark expand="md">
          <NavbarBrand href="/">AWT PWA</NavbarBrand>
          <Offline polling={{ enabled: true, interval: 500 }}>
            <span className="color-red">OFFLINE</span>
          </Offline>
          <Online polling={{ enabled: true, interval: 500 }}>
            <span className="color-green">ONLINE</span>
          </Online>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Online polling={{ enabled: true, interval: 500 }}>
                <NavItem>
                  <NavLink href="/">MY LIBRARY</NavLink>
                </NavItem>
              </Online>
              <NavItem>
                <NavLink href="/downloads">MY DOWNLOADS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/howto">HOW TO</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </StyledNavbar>
      </div>
    );
  }
}
