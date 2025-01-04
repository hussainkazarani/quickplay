const CUSTOM_SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_SPEED = 1.0;

export const StorageManager = {
  //initialization on install
  initializeOnInstall() {
    chrome.storage.local.set({ speeds: CUSTOM_SPEEDS, defaultPlayback: DEFAULT_SPEED });
    console.log("initialized successfully!!!");
  },

  //adding a customSpeed in storage
  async addCustomSpeed(speedInString) {
    const { speeds } = await chrome.storage.local.get();
    const floatSpeed = parseFloat(speedInString);
    console.log("BEFORE SORTING:", speeds);
    let speedsToAdd = [...speeds, Number(floatSpeed)].sort((a, b) => a - b);
    console.log("AFTER SORTING:", speedsToAdd);
    await chrome.storage.local.set({ speeds: speedsToAdd });
    return speedsToAdd;
  },
};
