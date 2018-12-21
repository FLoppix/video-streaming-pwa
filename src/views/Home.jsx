import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { MainHeadline } from '../components/Headline/MainHeadline';
import { SecondaryHeadline } from '../components/Headline/SecondaryHeadline';
import videoSources from '../videoSources';
import VideoItem from '../components/VideoFeed/VideoItem';
import ViewLayout from '../components/ViewLayout';
import { Offline, Online } from 'react-detect-offline';

const HeadlineWrapper = styled.div`
  text-align: center;
  color: #ffffff;
`;

const HomeView = () => (
  <ViewLayout>
    <Online polling={{ enabled: true, interval: 500 }}>
      <Container>
        <HeadlineWrapper>
          <MainHeadline>
            View all the videos you want using adaptive media streaming
            technologies
          </MainHeadline>
          <SecondaryHeadline>It’s quick, simple and eﬃcient.</SecondaryHeadline>
        </HeadlineWrapper>
        <Row>
          <Col>
            {videoSources.map((video, i) => <VideoItem {...video} key={i} />)}
          </Col>
        </Row>
      </Container>
    </Online>
    <Offline polling={{ enabled: true, interval: 500 }}>
      <Container>
        <MainHeadline>The application is currently used offline.</MainHeadline>
        <SecondaryHeadline>
          You can only watch your downloaded videos under{' '}
          <a className="button-link" href="/downloads">
            MY DOWNLOADS
          </a>.
        </SecondaryHeadline>
      </Container>
    </Offline>
  </ViewLayout>
);

export default HomeView;
