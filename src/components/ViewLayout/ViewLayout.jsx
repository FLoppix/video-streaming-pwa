import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import * as ReactNotifications from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import '../../styles/styles.css'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #102132;
`;

const ViewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;

export const ViewLayout = ({ children }) => (
  <LayoutWrapper>
    <Header />
    <ViewContent>{children}</ViewContent>
    <Footer />
    <ReactNotifications.NotificationContainer/>
  </LayoutWrapper>
);

ViewLayout.propTypes = {
  children: any.isRequired,
};

export default ViewLayout;
