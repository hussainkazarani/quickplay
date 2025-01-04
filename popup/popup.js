import { speedValidator } from "../utils/speed_validator.js";
import { StorageManager } from "../utils/storage_manager.js";
import { UIManager } from "../utils/ui_manager.js";

document.addEventListener("DOMContentLoaded", async () => {
  const { speeds, defaultPlayback } = await chrome.storage.local.get(); //getting the data from storage
  initializeUI(speeds, defaultPlayback); //updating the values each time popup is opened
  inputEventListeners(speeds, defaultPlayback); //listeners for different events of input elements
});

function initializeUI(speeds, defaultPlayback) {
  UIManager.updateCustomSpeedButtons(speeds);
  speedValidator.fixedInputListeners();
  document.querySelector(".default-speed").value = `${defaultPlayback.toFixed(2)}`;
  document.querySelector(".default-speed").placeholder = `${defaultPlayback.toFixed(2)}x`;
}

function inputEventListeners(speeds, defaultPlayback) {
  //customSpeed listeners
  customSpeedListener(speeds);
  controlItemRemovalListener(speeds, defaultPlayback);
  //defaultSpeed listeners
  defaultSpeedListener(speeds, defaultPlayback);
}

//custom speed event listener
function customSpeedListener(speeds) {
  const customSpeedElement = document.querySelector(".custom-speed");
  customSpeedElement.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const isValid = speedValidator.validateCustomSpeed(e.target.value, speeds);
      console.log("RESPONSE i got : ", isValid);
      if (isValid === true) {
        const speedsToAdd = await StorageManager.addCustomSpeed(e.target.value);
        UIManager.updateCustomSpeedButtons(speedsToAdd);
        UIManager.showSpeedSuccess(customSpeedElement);
      } else if (isValid === false) {
        UIManager.showSpeedError(customSpeedElement, "wrong-value");
      } else {
        UIManager.showSpeedError(customSpeedElement, "included-value");
      }
    }
  });
}

//removing items on-click
function controlItemRemovalListener(speeds, defaultPlayback) {
  const allCustomSpeedButtons = document.querySelectorAll(".control-item.visible");
  allCustomSpeedButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const buttonValue = parseFloat(button.innerHTML);
      if (buttonValue === parseFloat(defaultPlayback)) {
        console.log("ITS DEFAULT VALUE");
        return;
      }
      speeds = speeds.filter((speed) => speed !== buttonValue);
      chrome.storage.local.set({ speeds: speeds });
      button.remove();
      console.log(`Removed speed: ${buttonValue}, Updated speeds: ${speeds}`);
    });
  });
}

function defaultSpeedListener(speeds, defaultPlayback) {
  const defaultSpeedElement = document.querySelector(".default-speed");
  defaultSpeedElement.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const isValid = speedValidator.validateDefaultSpeed(e.target.value, defaultPlayback, speeds);
      console.log("RESPONSE i got : ", isValid);
      if (isValid === false) {
        UIManager.showPlaybackError(defaultSpeedElement);
      } else if (isValid === "included-value") {
        // UIManager.showPlaybackExists(defaultSpeedElement);
      } else if (isValid === "exists-in-array") {
        const floatDefault = parseFloat(e.target.value);
        console.log(floatDefault);
        chrome.storage.local.set({ defaultPlayback: floatDefault });
        document.querySelector(".default-speed").value = `${floatDefault.toFixed(2)}`;
        document.querySelector(".default-speed").placeholder = `${floatDefault.toFixed(2)}x`;
        UIManager.showPlaybackSuccess(defaultSpeedElement);
        syncYoutubeTabs();
      } else if (isValid === "not-exists-in-array") {
        const speedsToAdd = await StorageManager.addCustomSpeed(e.target.value);
        UIManager.updateCustomSpeedButtons(speedsToAdd);
        const floatDefault = parseFloat(e.target.value);
        console.log(floatDefault);
        chrome.storage.local.set({ defaultPlayback: floatDefault });
        document.querySelector(".default-speed").value = `${floatDefault.toFixed(2)}`;
        document.querySelector(".default-speed").placeholder = `${floatDefault.toFixed(2)}x`;
        UIManager.showPlaybackSuccess(defaultSpeedElement);
        syncYoutubeTabs();
      }
    }
  });
}

function syncYoutubeTabs() {
  chrome.runtime.sendMessage({ type: "changeSpeed" },(response) =>{
     console.log("Background response in POPUP:", response);
  });
}
