import React from 'react';
import styled from 'styled-components';
import { Container, Col, Row } from 'reactstrap';
import videoOverviewImage from '../assets/videoOverview.png';
import parametersImages from '../assets/parameters.png';
import downloadImage from '../assets/download.png';
import ViewLayout from '../components/ViewLayout';

const StyledCol = styled(Col)`
  color: #ffffff;
`;

const StyledRow = styled(Row)`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const HowToView = () => (
  <ViewLayout>
    <Container>
      <StyledRow>
        <StyledCol sm="12" lg="6">
          <h2>1. Select your video.</h2>
          <p>
            Select the video you want to watch among the ones proposed by the
            large catalog.
          </p>
        </StyledCol>
        <StyledCol sm="12" lg="6">
          <img
            className="img-fluid"
            src={videoOverviewImage}
            alt="video thumbnail"
          />
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol sm="12" lg="6">
          <img
            src={parametersImages}
            alt="video thumbnail"
            className="img-fluid"
          />
        </StyledCol>
        <StyledCol sm="12" lg="6">
          <h2>2. Set the parameters.</h2>
          <p>
            Select the video quality you want (among those available for your
            device/internet speed), the sound quality and tongue, and eventually
            the subtitles.
          </p>
        </StyledCol>
      </StyledRow>
      <StyledRow>
        <StyledCol sm="12" lg="6">
          <h2>3. Enjoy your video.</h2>
          <p>
            You can now enjoy your video. You can also download the video with
            desired parameters on your personal space to retrieve it and watch
            it later in oﬄine mode.
          </p>
        </StyledCol>
        <StyledCol sm="12" lg="6">
          <img
            src={downloadImage}
            alt="video thumbnail"
            className="img-fluid"
          />
        </StyledCol>
      </StyledRow>
    </Container>
  </ViewLayout>
);

export default HowToView;
