import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
  padding: 20px;
  color: #ffffff;
`;

export const MainHeadline = ({ children }) => (
  <StyledHeader>{children}</StyledHeader>
);
