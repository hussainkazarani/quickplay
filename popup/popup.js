import { UIManager } from "../utils/interface.js";

document.addEventListener("DOMContentLoaded", () => {
  eventListenersCustomSpeed();
});

function eventListenersCustomSpeed() {
  //customSpeed
  const customSpeedElement = document.querySelector(".custom-speed");
  customSpeedElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("1. you pressed ENTER key.");
      chrome.runtime.sendMessage({ type: "VERIFY_CUSTOM_SPEED", customSpeed: e.target.value }, (response) => {
        console.log("(2.1) this is what i got : ", response);
        if (response.isValid === true) {
          UIManager.showSpeedSuccess(customSpeedElement);
          // chrome.storage.local.get("speeds", ({ speeds = [] }) => {
          console.log(response.speedToAdd);

          UIManager.updateSpeeds(response.speedToAdd);
          // });
        } else if (response.isValid === false) {
          UIManager.showSpeedError(customSpeedElement, "wrong-value");
        } else {
          UIManager.showSpeedError(customSpeedElement, "included-value");
        }
      });
    }
  });

  //FixedInputLimit
  const playbackInputElement = document.querySelector(".default-speed");
  playbackInputElement.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  });

  customSpeedElement.addEventListener("input", (event) => {
    const value = event.target.value;
    if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  });
}
