import React from 'react';
import styled from 'styled-components';

const StyledSecondaryHeadline = styled.h2`
  padding-bottom: 10px;
  color: #b0bec5;
`;

export const SecondaryHeadline = ({ children }) => (
  <StyledSecondaryHeadline>{children}</StyledSecondaryHeadline>
);
