import React, { Component } from 'react';
import styled from 'styled-components';
import shaka from 'shaka-player';
import { Button } from 'reactstrap';
import { MainHeadline } from '../Headline';
import { sizes } from '../../utils/styleUtils';

const PrimaryButton = styled(Button)`
  background-color: #1f3651;
  color: #ffffff;
  width: 150px;
  margin-top: 40px;
`;

const OfflineContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export class OfflinePlayer extends Component {
  constructor(props) {
    super(props);
    this.offlinePlayerRef = React.createRef();
    this.mediaQueryDesktop = {};
    this.mediaQueryMobile = {};
    this.state = {
      width: 600,
      video: {},
      title: 'Video Title',
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    shaka.polyfill.installAll();
    const player = this.initPlayer();
    const offlineVideos = await this.listContent();

    this.mediaQueryDesktop = window.matchMedia(
      `(min-width: ${sizes.tablet}px)`
    );
    this.mediaQueryDesktop.addListener(mq => {
      if (mq.matches) {
        this.setState({
          width: 800,
        });
      }
    });

    this.mediaQueryMobile = window.matchMedia(
      `(max-width: ${sizes.tablet - 1}px)`
    );
    this.mediaQueryMobile.addListener(mq => {
      if (mq.matches) {
        this.setState({
          width: 300,
        });
      }
    });

    this.setState(
      {
        video: offlineVideos[id],
        title: offlineVideos[id].appMetadata.title,
      },
      () => {
        player.load(this.state.video.offlineUri);
      }
    );
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }

  initPlayer() {
    const player = new shaka.Player(this.offlinePlayerRef.current);
    player.addEventListener('error', this.onErrorEvent);
    this.initStorage(player);
    return player;
  }

  initStorage(player) {
    window.storage = new shaka.offline.Storage(player);
  }

  listContent() {
    return window.storage.list();
  }

  deleteContent() {
    return window.storage.remove(this.state.video.offlineUri);
  }

  render() {
    const { history } = this.props;
    return (
      <OfflineContent>
        <MainHeadline>{this.state.title}</MainHeadline>
        <video
          ref={this.offlinePlayerRef}
          width={this.state.width}
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
        />
        <PrimaryButton
          onClick={() => {
            history.push('/');
            this.deleteContent();
          }}
        >
          Delete
        </PrimaryButton>
      </OfflineContent>
    );
  }
}
