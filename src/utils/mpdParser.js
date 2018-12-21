import { fetchMpd } from 'dash-mpd-parser';

export const parseMpd = async mpd => {
  const parsedMpd = await fetchMpd(mpd);
  const {
    Period: { AdaptationSet },
  } = parsedMpd;
  return AdaptationSet;
};

export const extractSubtiltes = adaptionSet => {
  const subtitles = [];
  adaptionSet.forEach(set => {
    if (set.contentType === 'text') {
      subtitles.push(set.lang);
    }
  });
  return subtitles;
};

export const extractLanuges = adaptionSet => {
  const languages = [];
  adaptionSet.forEach(set => {
    if (set.contentType === 'audio') {
      languages.push(set.lang);
    }
  });
  return languages;
};

export const extractVideoResolutions = adaptionSet => {
  const videoResolutions = [];
  adaptionSet.forEach(set => {
    if (set.contentType === 'video') {
      videoResolutions.push(set.Representation);
    }
  });
  return videoResolutions;
};
