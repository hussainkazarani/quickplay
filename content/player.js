let intervalId;

window.onload = () => {
  PlayerOptions.removeOGPlaybackSpeed();
  PlayerOptions.setDefaultYTSpeed();
  PlayerButton.customButton();
  startUpdatingSpedUpTime();
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PLAYBACK_SPEED_CHANGED") {
    PlayerOptions.setDefaultYTSpeed(message.speed);
    updateCustomButton();

    spedUpDurationUI();
    startUpdatingSpedUpTime();
  }
});

async function updateCustomButton() {
  let customButton = document.querySelector(".custom-button");
  if (!customButton) {
    PlayerButton.customButton();
    return;
  }
  let { defaultPlayback } = await chrome.storage.local.get();
  customButton.innerHTML = `${defaultPlayback}x`;
}

function startUpdatingSpedUpTime() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(async () => {
    await spedUpDurationUI();
  }, 1000);
}

async function spedUpDurationUI() {
  //player time element
  const timeDisplay = document.querySelector(".ytp-time-display");
  if (!timeDisplay) return;

  //creating custom time element
  let customTime = document.querySelector(".custom-speed-time");
  if (!customTime) {
    customTime = document.createElement("span");
    customTime.className = "custom-speed-time";
    customTime.style.marginLeft = "10px";
    timeDisplay.appendChild(customTime);
  }

  //getting the time
  let { defaultPlayback } = await chrome.storage.local.get(); // prettier-ignore
  defaultPlayback = parseFloat(defaultPlayback); // prettier-ignore
  // if (defaultPlayback === 1.0) {
  //   customTime.style.display = "none";
  //   return;
  // }
  // customTime.style.display = "block";
  const currentTime = document.querySelector(".ytp-time-current").textContent;
  const currentDuration = document.querySelector(".ytp-time-duration").textContent; // prettier-ignore
  const [ currMinTime, currSecTime ] = currentTime.split(":").map(Number); // prettier-ignore
  const [ currMinDuration, currSecDuration ] = currentDuration.split(":").map(Number); // prettier-ignore

  //calculating the sped up time
  const currentSpedUpTimeInSeconds =(currMinTime * 60 + currSecTime) / defaultPlayback; // prettier-ignore
  const spedMinTime = Math.floor(currentSpedUpTimeInSeconds / 60);
  const spedSecTime = Math.floor(currentSpedUpTimeInSeconds % 60);
  const currentSpedUpDurationInSeconds = (currMinDuration * 60 + currSecDuration) / defaultPlayback; // prettier-ignore
  const spedMinDuration = Math.floor(currentSpedUpDurationInSeconds / 60);
  const spedSecDuration = Math.floor(currentSpedUpDurationInSeconds % 60);

  //setting the sped up time
  // prettier-ignore
  customTime.innerHTML = `(${spedMinTime.toString().padStart(2, "0")}:${spedSecTime.toString().padStart(2, "0")}/${spedMinDuration.toString().padStart(2, "0")}:${spedSecDuration.toString().padStart(2, "0")})`;
}
