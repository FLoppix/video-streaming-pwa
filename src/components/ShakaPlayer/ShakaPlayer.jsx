import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import shaka from 'shaka-player';
import { sizes } from '../../utils/styleUtils';
import { Button } from 'reactstrap';
import CircularProgressbar from 'react-circular-progressbar';
import isElectron from 'is-electron';
import {
  createNotification,
  createDesktopNotification,
  createNativeNotification,
} from '../../managers/NotificationManager';
import 'react-circular-progressbar/dist/styles.css';
import DbApi from '../../api/DbApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { languageCodeMap } from '../../utils/languageCodeMap';
import { TrackSelectionDialog } from '../Dialogs';

const StyledProgressBar = styled(CircularProgressbar)`
  width: 50px !important;
  height: 50px;
  margin-left: 20px;
  margin-top: 20x;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 50px !important;
  height: 50px;
  margin-left: 20px;
  margin-top: 20x;
`;

const StyledSpan = styled.span`
  color: white;
  margin-left: 10px;
`;

const PrimaryButton = styled(Button)`
  background-color: #1f3651;
  color: #ffffff;
  width: 150px;
  margin-left: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const TrackSelectionSection = styled.div`
  display: flex;
  align-items: center;
  div {
    background: #5a6268;
  }
  span {
    color: white;
    padding-right: 10px;
    padding-left: 10px;
  }
`;

export class ShakaPlayer extends Component {
  constructor(props) {
    super(props);
    this.progressbarRef = React.createRef();
    this.videoRef = React.createRef();
    this.mediaQueryDesktop = {};
    this.mediaQueryMobile = {};
    this.state = {
      width: 600,
      downloadProgress: 0,
      openDialog: false,
      tracks: [],
      textTracks: [],
      preferredLanguage: '',
      selectedTrackLanguage: '',
      selectedTextTrackLanguage: '',
    };
  }

  componentDidMount() {
    // add media queries for resizing the player!
    this.mediaQueryDesktop = window.matchMedia(
      `(min-width: ${sizes.tablet}px)`
    );
    this.mediaQueryDesktop.addListener(mq => {
      if (mq.matches) {
        this.setState({
          ...this.state,
          width: 600,
        });
      }
    });

    this.mediaQueryMobile = window.matchMedia(`(max-width: 670px)`);
    this.mediaQueryMobile.addListener(mq => {
      if (mq.matches) {
        this.setState({
          ...this.state,
          width: 300,
        });
      }
    });

    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  async componentWillMount() {
    if (await DbApi.checkForOfflineDatabase()) {
      DbApi.isDownloaded(this.props.manifestUri).then(res => {
        this.setState({ isDownloaded: res });
      });
    }
  }

  componentWillUnmount() {
    // unmount stuff
    // kill stream hogging...:)
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  initPlayer() {
    const player = new shaka.Player(this.videoRef.current);
    // attach player to the global window
    window.player = player;

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // init storage
    this.initStorage(player);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.props.manifestUri)
      .then(() => {
        // This runs if the asynchronous load is successful.
        player.setTextTrackVisibility(true);
        this.setState({
          ...this.state,
          tracks: player.getAudioLanguages(),
          textTracks: player.getTextTracks(),
        });
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  handleTrackChange = event => {
    console.log(event.target.value);
    this.setState({
      ...this.state,
      selectedTrackLanguage: event.target.value,
    });
    window.player.selectAudioLanguage(event.target.value);
  };

  handleTextTrackChange = event => {
    console.log(event.target.value);
    this.setState({
      ...this.state,
      selectedTextTrackLanguage: event.target.value,
    });
    window.player.selectTextTrack(event.target.value);
  };

  selectTrack = track => {
    console.log(track);
    this.setState(
      {
        ...this.state,
        openDialog: false,
        preferredLanguage: track,
      },
      this.onDownloadClick()
    );
  };

  openTrackSelection = tracks => {
    // Store the highest bandwidth variant.
    const { preferredLanguage } = this.state;
    console.log('SELECT TRACK');
    console.log({ preferredLanguage });

    const found = tracks
      .filter(track => track.type === 'variant')
      .filter(track => track.language === preferredLanguage)
      .sort((a, b) => a.bandwidth > b.bandwidth)
      .pop();
    return [found];
  };

  setDownloadProgress(_, progress) {
    this.setState({
      ...this.state,
      downloadProgress: Math.floor(progress * 100),
    });
  }

  initStorage(player) {
    window.storage = new shaka.offline.Storage(player);
    window.storage.configure({
      progressCallback: (content, progress) =>
        this.setDownloadProgress(content, progress),
      trackSelectionCallback: this.openTrackSelection,
    });
  }

  downloadContent(manifestUri, title) {
    const metadata = {
      title,
      downloaded: new Date(),
    };

    return window.storage.store(manifestUri, metadata);
  }

  openDownloadDialog() {
    this.setState({
      ...this.state,
      openDialog: true,
    });
  }

  onDownloadClick() {
    const { title, manifestUri } = this.props;
    this.setDownloadProgress(null, 0);
    this.downloadContent(manifestUri, title)
      .then(content => {
        this.setState({ isDownloaded: true });
        this.setDownloadProgress(content, 1);
        createNotification(
          'success',
          'Download completed successfully.',
          '[AWT-PWA] Download'
        );
        if (isElectron()) {
          createNativeNotification(
            'Download completed successfully.',
            '[AWT-PWA] Download'
          );
        } else {
          createDesktopNotification('Your download is ready!');
        }
      })
      .catch(error => {
        // In the case of an error, re-enable the download button so
        // that the user can try to download another item.
        createNotification(
          'error',
          'Download could not be completed.',
          '[AWT-PWA] Download'
        );
        if (isElectron()) {
          createNativeNotification(
            'An error occured during downloading. Please try it again.',
            '[AWT-PWA] Download'
          );
        }
        this.onError(error);
      });
  }

  render() {
    const {
      openDialog,
      tracks,
      textTracks,
      selectedTrackLanguage,
      selectedTextTrackLanguage,
    } = this.state;
    return (
      <div>
        <TrackSelectionDialog
          open={openDialog}
          tracks={tracks}
          selectTrack={event => this.selectTrack(event)}
        />
        <video
          ref={this.videoRef}
          width={this.state.width}
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
        />
        <DownloadSection>
          {this.state.isDownloaded ? (
            <Fragment>
              <StyledIcon className="color-green" icon={faCheckCircle} />
              <StyledSpan>This video is already downloaded.</StyledSpan>
            </Fragment>
          ) : (
            <Fragment>
              <PrimaryButton
                secondary="true"
                onClick={() => this.openDownloadDialog()}
              >
                Download
              </PrimaryButton>
              <StyledProgressBar percentage={this.state.downloadProgress} />
            </Fragment>
          )}
        </DownloadSection>
        <TrackSelectionSection>
          <span>Audio language</span>
          <Select
            onChange={this.handleTrackChange}
            value={selectedTrackLanguage}
            inputProps={{
              name: 'selectedTrackLanguage',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {tracks.map((language, ind) => (
              <MenuItem key={ind} value={language}>
                {languageCodeMap[language]}
              </MenuItem>
            ))}
          </Select>
          <span>Subtitle language</span>
          <Select
            onChange={this.handleTextTrackChange}
            value={selectedTextTrackLanguage}
            inputProps={{
              name: 'selectedTextTrackLanguage',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {textTracks.map((track, ind) => (
              <MenuItem key={ind} value={track}>
                {languageCodeMap[track.language]}
              </MenuItem>
            ))}
          </Select>
        </TrackSelectionSection>
      </div>
    );
  }
}

ShakaPlayer.propTypes = {
  manifestUri: string.isRequired,
};
