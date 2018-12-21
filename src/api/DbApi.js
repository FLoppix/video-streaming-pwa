import Dexie from 'dexie';

const DB_NAME = 'shaka_offline_db';
const TABLE_NAME = 'manifest-v3';

const checkForOfflineDatabase = async () => {
  try {
    const exists = await Dexie.exists(DB_NAME);
    if (exists) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const getOfflineVideos = async () => {
    const db = await new Dexie(DB_NAME).open();
    const result = await db.table(TABLE_NAME).toArray();
    db.close();
    return result;
};

const isDownloaded = async uri => {
    const db = await new Dexie(DB_NAME).open();
    const elements = await db.table(TABLE_NAME).toArray();
    for (var element of elements) {
      if (element.originalManifestUri === uri) return true;
    }
    return false;
}

const DbApi = {
    checkForOfflineDatabase: checkForOfflineDatabase,
    getOfflineVideos: getOfflineVideos,
    isDownloaded: isDownloaded
};

export default DbApi;