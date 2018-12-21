import React from 'react';
import styled from 'styled-components';
import ViewLayout from '../components/ViewLayout';
import OfflinePlayer from '../components/OfflinePlayer';

const CenteredVideo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OfflinePlayback = () => (
  <ViewLayout>
    <CenteredVideo>
      <OfflinePlayer />
    </CenteredVideo>
  </ViewLayout>
);

export default OfflinePlayback;
