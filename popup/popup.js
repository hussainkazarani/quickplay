import { StorageManager } from "../utils/storage.js";
import {
  SpeedValidator,
  UIManager,
  speedInputElement,
  playbackInputElement,
} from "../utils/validation.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { speeds, defaultPlayback } = await StorageManager.getStorageData();
  initializeUI(speeds, defaultPlayback);
  eventListeners();
});

function initializeUI(speeds, defaultPlayback) {
  document.querySelector(".default-speed").value = defaultPlayback.toFixed(2);
  UIManager.updateSpeeds(speeds);
}

function eventListeners() {
  speedInputEventListener();
  playbackInputEventListener();
}

function speedInputEventListener() {
  speedInputElement.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const speed = SpeedValidator.validateSpeed(e.target.value);
      if (speed === false) {
        UIManager.showSpeedError(e.target, "wrong-value");
        return;
      }
      const { speeds } = await StorageManager.getStorageData();
      if (speeds.includes(speed)) {
        UIManager.showSpeedError(e.target, "already-exists");
        return;
      }

      // Save updated speeds to storage
      const updatedSpeeds = [...speeds, Number(speed)].sort((a, b) => a - b);
      await StorageManager.updateSpeeds(updatedSpeeds);
      UIManager.showSpeedSuccess(e.target);
      UIManager.updateSpeeds(updatedSpeeds);
    }
  });
}

function playbackInputEventListener() {
  playbackInputElement.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const defaultPlayback = SpeedValidator.validateSpeed(e.target.value);
      if (defaultPlayback === false) {
        UIManager.showSpeedError;
        return;
      }
      StorageManager.updatePlaybackSpeed(defaultPlayback);
      UIManager.showPlaybackError();
    }
  });
}
