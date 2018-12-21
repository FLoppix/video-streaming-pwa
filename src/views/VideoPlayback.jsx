import React, { Component } from 'react';
import styled from 'styled-components';
import { fetchMpd } from 'dash-mpd-parser';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import LanguageIcon from '@material-ui/icons/Language';
import TextIcon from '@material-ui/icons/Textsms';
import videoSources from '../videoSources';
import ShakaPlayer from '../components/ShakaPlayer';
import ViewLayout from '../components/ViewLayout';
import {
  extractSubtiltes,
  extractLanuges,
  extractVideoResolutions,
} from '../utils/mpdParser';
import { languageCodeMap } from '../utils/languageCodeMap';
import { filterDuplicates } from '../utils/filter';

const HeadlineWrapper = styled.div`
  text-align: center;
`;

const VideoDetailsWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: end;
  justify-content: space-between;
  flex-direction: column;
  padding-left: 30px;
  position: relative;
  height: 100%;
`;

const MainHeadline = styled.h1`
  padding: 20px;
  color: white;
`;

const SubHeadline = styled.h3`
  color: white;
  font-weight: 500;
`;

const IconWrapper = styled.span`
  display: flex;

  svg {
    padding-right: 5px;
    fill: white;
  }
`;

const Paragraph = styled.p`
  color: white;
`;

const VideoDescription = styled.p`
  color: white;
  padding-top: 40px;
`;


export class VideoPlaybackView extends Component {
  constructor(props) {
    super(props);
    this.mediaQuery = {};
    this.state = {
      loading: true,
      video: null,
      selectedVideoQuality: '',
      selectedSoundQuality: '',
      selectedLanguage: '',
      selectedSubtitles: '',
    };
  }

  async componentWillMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const video = videoSources[id - 1];
    fetchMpd(video.manifestUri, mpd => {
      // Here's our parsed MPD!
      const {
        Period: { AdaptationSet },
      } = mpd;
      video.languages = extractLanuges(AdaptationSet);
      video.subtitles = extractSubtiltes(AdaptationSet);
      video.resolutions = extractVideoResolutions(AdaptationSet);
    });
    this.setState({
      ...this.state,
      video,
    });
  }

  render() {
    const { video } = this.state;
    return (
      <ViewLayout>
        <HeadlineWrapper>
          <MainHeadline variant="headline">
            {this.state.video.title}
          </MainHeadline>
        </HeadlineWrapper>
        <Container>
          <Row>
            <ShakaPlayer {...video} />
            <VideoDetailsWrapper>
              <div>video details</div>
              <IconWrapper>
                <LanguageIcon />
                <Paragraph>
                  {filterDuplicates(this.state.video.languages).map(
                    language => `${languageCodeMap[language]} `
                  )}
                </Paragraph>
              </IconWrapper>
              <IconWrapper>
                <TextIcon />
                <Paragraph>
                  {filterDuplicates(this.state.video.subtitles).map(
                    subtitle => `${languageCodeMap[subtitle]} `
                  )}
                </Paragraph>
              </IconWrapper>
            </VideoDetailsWrapper>
          </Row>
          <Row>
            <VideoDescription>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </VideoDescription>
          </Row>
          <Row>
            <SubHeadline>Download this video</SubHeadline>
          </Row>
          <Row>
            <Paragraph>
              You can download this video by selecting the audio language
            </Paragraph>
          </Row>
        </Container>
      </ViewLayout>
    );
  }
}

VideoPlaybackView.propTypes = {
  match: object.isRequired,
};

export default withRouter(VideoPlaybackView);
