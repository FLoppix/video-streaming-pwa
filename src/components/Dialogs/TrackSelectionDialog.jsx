import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { languageCodeMap } from '../../utils/languageCodeMap';

export const TrackSelectionDialog = ({ open, tracks, selectTrack }) => (
  <Dialog open={open}>
    <DialogTitle>Select Track Language</DialogTitle>
    <div>
      {tracks.map((track, ind) => (
        <Button key={ind} variant="outlined" onClick={() => selectTrack(track)}>
          {languageCodeMap[track]}
        </Button>
      ))}
    </div>
  </Dialog>
);
