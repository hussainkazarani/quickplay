const DEFAULT_SPEEDS = [0.75, 1.00, 1.25, 1.75, 2.00]; // prettier-ignore
const DEFAULT_PLAYBACK_SPEED = 1.43 // prettier-ignore

export const StorageManager = {
  async initialize() {
    return chrome.storage.local.set({
      speeds: DEFAULT_SPEEDS,
      defaultPlayback: DEFAULT_PLAYBACK_SPEED,
    });
  },

  async getStorageData() {
    const { speeds, defaultPlayback } = await chrome.storage.local.get();
    return {
      speeds: speeds || DEFAULT_SPEEDS,
      defaultPlayback: defaultPlayback || DEFAULT_PLAYBACK_SPEED,
    };
  },

  async updateSpeeds(speeds) {
    return chrome.storage.local.set({ speeds: speeds });
  },

  async updatePlaybackSpeed(defaultPlayback) {
    return chrome.storage.local.set({ defaultPlayback: defaultPlayback });
  },
};
