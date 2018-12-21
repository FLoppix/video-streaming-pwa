import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import ViewLayout from '../components/ViewLayout';
import OfflineVideoFeed from '../components/OfflineVideoFeed';
import { MainHeadline, SecondaryHeadline } from '../components/Headline';

const HeadlineWrapper = styled.div`
  text-align: center;
`;

const DownloadView = () => (
  <ViewLayout>
    <Container>
      <HeadlineWrapper>
        <MainHeadline>Here are your downloaded videos!</MainHeadline>
        <SecondaryHeadline>
          You can even watch them offline
          <span role="img" aria-label="hearts">
            😍
          </span>
        </SecondaryHeadline>
      </HeadlineWrapper>
      <OfflineVideoFeed />
    </Container>
  </ViewLayout>
);

export default DownloadView;
