let speeds = [];
let defaultSpeed = 0.50; // prettier-ignore

document.addEventListener("DOMContentLoaded", async () => {
  // Load saved speeds and defaultSpeed from local storage
  const data = await chrome.storage.local.get(["speeds", "defaultSpeed"]);
  speeds = data.speeds || [];
  defaultSpeed = data.defaultSpeed || defaultSpeed;

  // Populate default speed input and buttons
  const defaultSpeedInput = document.querySelector(".default-speed");
  defaultSpeedInput.value = defaultSpeed;

  addSpeedButton();
});

//function call
const customSpeedInput = document.querySelector(".custom-speed");
customSpeedInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const speed = validateSpeed(e.target.value);
    if (speed === false) {
      showError(e.target, "wrong-value");
      return;
    }
    if (speeds.includes(speed)) {
      showError(e.target, "already-exists");
      return;
    }

    speeds.push(speed);
    speeds.sort((a, b) => a - b);

    // Save updated speeds to storage
    await chrome.storage.local.set({
      speeds: speeds,
      defaultSpeed: defaultSpeed,
    });

    showSuccess(e.target);
    addSpeedButton();
  }
});

//validation
function validateSpeed(speedFromUser) {
  const floatSpeed = parseFloat(speedFromUser).toFixed(2);
  const isValid = !isNaN(floatSpeed) && floatSpeed >= 0.5 && floatSpeed <= 5;
  return isValid ? floatSpeed : false;
}

//success
function showSuccess(speedElement) {
  speedElement.classList.add("success");
  setTimeout(() => {
    speedElement.classList.remove("success");
  }, 2000);
}

//error
function showError(speedElement, errorType) {
  const errorMsgElement = document.querySelector(".error-message");
  speedElement.classList.add("error");
  errorMsgElement.style.display = "block";
  setTimeout(() => {
    speedElement.classList.remove("error");
    errorMsgElement.style.display = "none";
  }, 3000);
  if (errorType == "wrong-value") {
    errorMsgElement.innerHTML = "Speed must be between 0 and 5";
  } else if (errorType == "already-exists") {
    errorMsgElement.innerHTML = "Speed already exists";
  }
}

//addition
function addSpeedButton() {
  const controlsElement = document.querySelector(".controls");
  const allButtons = controlsElement.querySelectorAll(".control-item");
  const customSpeedInput = document.querySelector(".custom-speed");

  //remove all
  allButtons.forEach((button) => button.remove());

  //create and insert again
  speeds.forEach((speed, index) => {
    const newButton = document.createElement("button");
    newButton.className = "control-item";
    newButton.innerHTML = `${speed}x`;

    controlsElement.insertBefore(newButton, customSpeedInput);
    setTimeout(() => {
      newButton.classList.add("visible");
    }, index * 200);
  });
}

const defaultSpeedInput = document.querySelector(".default-speed");
defaultSpeedInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const defaultSpeed2 = validateSpeed(e.target.value);

    if (defaultSpeed2 === false) {
      showError2();
      return;
    }

    // Retrieve current storage data
    const data = await chrome.storage.local.get(["speeds", "defaultSpeed"]);

    // If speeds is not yet set in storage, initialize it as an empty array
    const speeds = data.speeds || [];

    // Update the defaultSpeed while preserving other data
    await chrome.storage.local.set({
      speeds: speeds, // Keep existing speeds
      defaultSpeed: defaultSpeed2, // Set new default speed
    });

    showSuccess2();
  }
});

//error
function showError2() {
  const errorMsgElement = document.querySelector(".default-speed");
  errorMsgElement.classList.add("error");
  setTimeout(() => {
    speedElement.classList.remove("error");
  }, 3000);
}

function showSuccess2() {
  const defaultElement = document.querySelector(".default-speed");
  defaultElement.classList.add("success");
  setTimeout(() => {
    defaultElement.classList.remove("success");
  }, 2000);
}
