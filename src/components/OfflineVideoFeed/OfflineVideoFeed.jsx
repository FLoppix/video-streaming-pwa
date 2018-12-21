import React, { Component } from 'react';
import VideoItem from '../VideoFeed/VideoItem';
import DbApi from '../../api/DbApi';

export class OfflineVideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineVideos: [],
    };
  }

  async componentWillMount() {
    if (await DbApi.checkForOfflineDatabase()) {
      const entries = await DbApi.getOfflineVideos();
      this.setState({
        offlineVideos: entries,
      });
    }
  }

  renderOfflineVideos() {}
  render() {
    return (
      <div>
        {this.state.offlineVideos.map((video, index) => {
          return (
            <VideoItem 
              key={index}
              id={`offline/${index}`}
              title={video.appMetadata.title}
              description={`Downloaded: ${video.appMetadata.downloaded.toLocaleDateString()}`}
            />
          );
        })}
      </div>
    );
  }
}
