import HomeView from './views/Home';
import DownloadView from './views/Downloads';
import PlaybackView from './views/VideoPlayback';
import HowToView from './views/HowTo';
import OfflinePlayback from './views/OfflinePlayback';
// eslint-disable-next-line
export const publicRoutes = [
  {
    path: '/',
    exact: true,
    page: HomeView,
  },
  {
    path: '/downloads',
    exact: true,
    page: DownloadView,
  },
  {
    path: '/howto',
    exact: true,
    page: HowToView,
  },
  {
    path: '/:id',
    exact: true,
    page: PlaybackView,
  },
  {
    path: '/offline/:id',
    exact: true,
    page: OfflinePlayback,
  },
];
