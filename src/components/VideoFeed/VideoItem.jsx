import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { string, object } from 'prop-types';
import { Container, Button } from 'reactstrap';
import thumbnail from '../../assets/video-thumbnail-overlay1.png';
import { media } from '../../utils/styleUtils';

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  &:hover {
    background-color: #283545;
  }
`;

const TitleHeadline = styled.h3`
  color: #ffffff;
`;

const DescriptionHeadline = styled.h4`
  color: #ffffff;
`;

const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoThumbnail = styled.div`
  padding-right: 10px;
  cursor: pointer;
`;

// const IconWrapper = styled.span`
//   display: flex;

//   svg {
//     padding-right: 5px;
//     fill: #ffffff;
//   }
// `;

const PrimaryButton = styled(Button)`
  background-color: #1f3651;
  color: #ffffff;
  width: 150px;

  ${media.mobile`
    display: none !important;
  `};
`;

const LeftItemCardContent = styled.div`
  display: flex;
`;

export const VideoItem = ({ title, description, id, history }) => (
  <Container>
    <ContentWrapper>
      <LeftItemCardContent>
        <VideoThumbnail onClick={() => history.push(`/${id}`)}>
          <img src={thumbnail} alt="video thumbnail" width={150} height={100} />
        </VideoThumbnail>
        <VideoDetails>
          <TitleHeadline>{title}</TitleHeadline>
          <DescriptionHeadline>{description}</DescriptionHeadline>
        </VideoDetails>
      </LeftItemCardContent>
      <PrimaryButton secondary="true" onClick={() => history.push(`/${id}`)}>
        WATCH
      </PrimaryButton>
    </ContentWrapper>
  </Container>
);

VideoItem.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  history: object.isRequired
};

export default withRouter(VideoItem);
