export const playbackInputElement = document.querySelector(".default-speed");
const errorElement = document.querySelector(".error-message");
const controlsElement = document.querySelector(".controls");
const allSpeedButtons = controlsElement.querySelectorAll(".control-item");
export const speedInputElement = document.querySelector(".custom-speed");

export const SpeedValidator = {
  validateSpeed(speedFromUser) {
    const floatSpeed = parseFloat(speedFromUser).toFixed(2);
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5;
    return isValid ? floatSpeed : false;
  },
};

export const UIManager = {
  showSpeedError(speedInputElement, errorType) {
    speedInputElement.classList.add("error");
    errorElement.style.display = "block";
    setTimeout(() => {
      speedInputElement.classList.remove("error");
      errorElement.style.display = "none";
    }, 3000);
    errorType == "wrong-value" ? "Speed must be between 0 and 5" : "Speed already exists"; // prettier-ignore
  },

  showSpeedSuccess(speedInputElement) {
    speedInputElement.classList.add("success");
    setTimeout(() => {
      speedInputElement.classList.remove("success");
    }, 2000);
  },

  showPlaybackError() {
    playbackInputElement.classList.add("error");
    setTimeout(() => {
      playbackInputElement.classList.remove("error");
    }, 3000);
  },

  showPlaybackSuccess() {
    playbackInputElement.classList.add("success");
    setTimeout(() => {
      playbackInputElement.classList.remove("success");
    }, 2000);
  },

  updateSpeeds(speeds) {
    //remove all
    allSpeedButtons.forEach((button) => button.remove());

    //create and insert again
    speeds.forEach((speed, index) => {
      const newButton = document.createElement("button");
      newButton.className = "control-item";
      newButton.innerHTML = `${speed}x`;
      controlsElement.insertBefore(newButton, speedInputElement);
      setTimeout(() => {
        newButton.classList.add("visible");
      }, index * 200);
    });
  },
};
