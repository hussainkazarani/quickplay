const errorElement = document.querySelector(".error-message");
const controlsElement = document.querySelector(".controls");
const customSpeedElement = document.querySelector(".custom-speed");
const allVisibleSpeedButtons = () => document.querySelectorAll(".control-item.visible");

export const UIManager = {
  //to show success and error animation in .custom-speed
  showSpeedSuccess() {
    customSpeedElement.classList.add("success");
    setTimeout(() => {
      customSpeedElement.classList.remove("success");
    }, 2000);
  },
  showSpeedError(customSpeedElement, errorType) {
    customSpeedElement.classList.add("error");
    errorElement.style.display = "block";
    setTimeout(() => {
      customSpeedElement.classList.remove("error");
      errorElement.style.display = "none";
    }, 3000);
    errorElement.innerHTML = errorType == "wrong-value" ? "Speed must be between 0 and 5" : "Speed already exists";
  },

  //to show success and error animation in .default-speed
  showPlaybackSuccess(defaultSpeedElement) {
    defaultSpeedElement.classList.add("success");
    setTimeout(() => {
      defaultSpeedElement.classList.remove("success");
    }, 2000);
  },
  showPlaybackError(defaultSpeedElement) {
    defaultSpeedElement.classList.add("error");
    setTimeout(() => {
      defaultSpeedElement.classList.remove("error");
    }, 3000);
  },

  //speeds is an array of numbers which is sorted
  //updating the buttons after some change
  updateCustomSpeedButtons(speeds) {
    //remove all & insert again
    allVisibleSpeedButtons().forEach((button) => button.remove());
    speeds.forEach((speed) => {
      const newButton = document.createElement("button");
      newButton.className = "control-item";
      newButton.innerHTML = `${speed.toFixed(2)}x`;
      controlsElement.insertBefore(newButton, customSpeedElement);
      newButton.classList.add("visible");
    });
  },
};
