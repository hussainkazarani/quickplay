const DEFAULT_SPEEDS = [0.75, 1.0, 1.25, 1.75, 2.0];
const DEFAULT_PLAYBACK_SPEED = 1.0;
const playbackInputElement = document.querySelector(".default-speed");

export const StorageManager = {
  async initialize() {
    chrome.storage.local.set({
      speeds: DEFAULT_SPEEDS,
      defaultPlayback: DEFAULT_PLAYBACK_SPEED,
    });
    const data = await chrome.storage.local.get();
    // UIManager.updateSpeeds(data.speeds);
    console.log("INITIALIZED DATA ON INSTALL:", data.speeds, "\n\n", data.defaultPlayback);
  },
};

export const UIManager = {
  updateSpeeds(speeds) {
    //remove all
    allVisibleSpeedButtons().forEach((button) => button.remove());

    //create and insert again
    speeds.forEach((speed) => {
      const newButton = document.createElement("button");
      newButton.className = "control-item";
      newButton.innerHTML = `${parseFloat(speed).toFixed(2)}x`;
      controlsElement.insertBefore(newButton, speedInputElement);
      newButton.classList.add("visible");
    });
  },
};
