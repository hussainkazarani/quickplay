const errorElement = document.querySelector(".error-message");
const speedInputElement = document.querySelector(".custom-speed");
const controlsElement = document.querySelector(".controls");
const allVisibleSpeedButtons = () => controlsElement.querySelectorAll(".control-item.visible");

export const UIManager = {
  showSpeedError(speedInputElement, errorType) {
    speedInputElement.classList.add("error");
    errorElement.style.display = "block";
    setTimeout(() => {
      speedInputElement.classList.remove("error");
      errorElement.style.display = "none";
    }, 3000);
    errorElement.innerHTML = errorType == "wrong-value" ? "Speed must be between 0 and 5" : "Speed already exists";
  },

  showSpeedSuccess(speedInputElement) {
    speedInputElement.classList.add("success");
    setTimeout(() => {
      speedInputElement.classList.remove("success");
    }, 2000);
  },

  showPlaybackError(playbackInputElement) {
    playbackInputElement.classList.add("error");
    setTimeout(() => {
      playbackInputElement.classList.remove("error");
    }, 3000);
  },

  showPlaybackSuccess(playbackInputElement) {
    playbackInputElement.classList.add("success");
    setTimeout(() => {
      playbackInputElement.classList.remove("success");
    }, 2000);
  },

  updateSpeeds(speeds) {
    //remove all
    allVisibleSpeedButtons().forEach((button) => button.remove());
    console.log(typeof speeds);

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
