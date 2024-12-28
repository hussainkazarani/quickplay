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
  document.querySelector(".default-speed").value = `${defaultPlayback}`;
  document.querySelector(".default-speed").placeholder = `${defaultPlayback}x`;
  UIManager.updateSpeeds(speeds);
}

function eventListeners() {
  speedInputEventListener();
  playbackInputEventListener();
  controlItemListener();
  SpeedValidator.truncateSpeed();
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
      if (speeds.includes(Number(speed))) {
        UIManager.showSpeedError(e.target, "already-exists");
        return;
      }

      // Save updated speeds to storage
      // controlItemListener();
      const updatedSpeeds = [...speeds, Number(speed)].sort((a, b) => a - b);
      await StorageManager.updateSpeeds(updatedSpeeds);
      UIManager.updateSpeeds(updatedSpeeds);
      controlItemListener();
      UIManager.showSpeedSuccess(e.target);
    }
  });
}

function playbackInputEventListener() {
  playbackInputElement.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const playbackValue = SpeedValidator.validateDuration(e.target.value); //wrong
      const { defaultPlayback } = await StorageManager.getStorageData();
      if (playbackValue === false || playbackValue === defaultPlayback) {
        UIManager.showPlaybackError();
        return;
      }
      StorageManager.updatePlaybackSpeed(playbackValue);
      //UPDATE HERE
      const playbackValueNumber = parseFloat(playbackValue);
      const { speeds } = await StorageManager.getStorageData();
      console.log("BEFORE :", speeds);

      if (!speeds.includes(playbackValueNumber)) {
        speeds.push(playbackValueNumber);
        console.log("AFTER: ", speeds);
        speeds.sort((a, b) => a - b);
        StorageManager.updateSpeeds(speeds);
        UIManager.updateSpeeds(speeds);
        controlItemListener();
      }
      chrome.runtime.sendMessage({
        type: "PLAYBACK_SPEED_CHANGED",
        speed: playbackValueNumber,
      });
      playbackInputElement.placeholder = `${playbackValue}x`;
      // PlayerOptions.spedUpDurationUI();
      UIManager.showPlaybackSuccess();
    }
  });
}

function controlItemListener() {
  const allVisibleSpeedButtons = document.querySelectorAll(".control-item.visible"); // prettier-ignore
  allVisibleSpeedButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      let { speeds, defaultPlayback } = await StorageManager.getStorageData();
      const buttonValue = parseFloat(button.innerHTML);
      if (buttonValue === parseFloat(defaultPlayback)) {
        console.log("ITS DEFAULT VALUE");
        return;
      }
      speeds = speeds.filter((speed) => speed !== buttonValue);
      StorageManager.updateSpeeds(speeds);
      button.remove();
      console.log(`Removed speed: ${buttonValue}, Updated speeds: ${speeds}`);
    });
  });
}
