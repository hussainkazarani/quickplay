import { UIManager } from "./interface.js";

const CUSTOM_SPEEDS = [0.75, 1.0, 1.25, 1.5, 2.0];
const DEFAULT_PLAYBACK_SPEED = 1.0;

export const StorageManager = {
  initialize() {
    chrome.storage.local.set({ speeds: CUSTOM_SPEEDS, defaultPlayback: DEFAULT_PLAYBACK_SPEED });
    UIManager.updateSpeeds(CUSTOM_SPEEDS);
    console.log("initialized successfully!!!");
  },

  async addCustomSpeed(speedInString) {
    console.log("inside addCustomSpeed", speedInString);

    const { speeds = [] } = await chrome.storage.local.get("speeds");
    console.log(typeof speeds);

    console.log("BEFORE SORTING:", speeds);
    const floatSpeed = parseFloat(speedInString);
    let speedsToAdd = [...speeds, Number(floatSpeed)].sort((a, b) => a - b);
    console.log("AFTER SORTING:", speedsToAdd);
    await chrome.storage.local.set({ speeds: speedsToAdd });
    console.log(typeof speedsToAdd);
    return speedsToAdd;
  },
};
