export const playbackInputElement = document.querySelector(".default-speed");
const errorElement = document.querySelector(".error-message");
const controlsElement = document.querySelector(".controls");
const allSpeedButtons = controlsElement.querySelectorAll(".control-item");
const allVisibleSpeedButtons = () => controlsElement.querySelectorAll(".control-item.visible"); // prettier-ignore
export const speedInputElement = document.querySelector(".custom-speed");

export const SpeedValidator = {
  validateSpeed(speedFromUser) {
    const floatSpeed = parseFloat(speedFromUser);
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.50 && floatSpeed <= 5.00; // prettier-ignore
    return isValid ? floatSpeed : false;
  },
  validateDuration(durationFromUser) {
    const floatSpeed = parseFloat(durationFromUser);
    const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.50 && floatSpeed <= 5.00; // prettier-ignore
    return isValid ? floatSpeed.toFixed(2) : false;
  },
  truncateSpeed() {
    playbackInputElement.addEventListener("input", (event) => {
      const value = event.target.value;
      if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
        event.target.value = value.slice(0, -1);
      }
    });

    speedInputElement.addEventListener("input", (event) => {
      const value = event.target.value;
      if (!/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
        event.target.value = value.slice(0, -1);
      }
    });
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
    errorElement.innerHTML = errorType == "wrong-value" ? "Speed must be between 0 and 5" : "Speed already exists"; // prettier-ignore
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
    allVisibleSpeedButtons().forEach((button) => button.remove());

    //create and insert again
    speeds.forEach((speed, index) => {
      const newButton = document.createElement("button");
      newButton.className = "control-item";
      newButton.innerHTML = `${parseFloat(speed).toFixed(2)}x`;
      controlsElement.insertBefore(newButton, speedInputElement);
      newButton.classList.add("visible");
    });
  },
};
