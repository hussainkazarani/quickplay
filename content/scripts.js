const PlayerOptions = {
  async setDefaultYTSpeed() {
    //get playbackSpeed
    let { defaultPlayback } = await chrome.storage.local.get();

    //setPlaybackSpeed function
    function setPlaybackSpeed() {
      defaultPlayback = parseFloat(defaultPlayback);
      const video = document.querySelector("video");
      if (video && video.playbackRate !== defaultPlayback) {
        video.playbackRate = defaultPlayback;
      }
    }

    //initial call on load
    setPlaybackSpeed();

    //update value real-time
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.defaultPlayback) {
        defaultPlayback = changes.defaultPlayback.newValue;
        setPlaybackSpeed();
      }
    });

    //update for dynamic video
    const observer = new MutationObserver(setPlaybackSpeed);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
  async spedUpDurationUI() {
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
    defaultPlayback = defaultPlayback ? parseFloat(defaultPlayback) : 1.00; // prettier-ignore
    if (defaultPlayback === 1.00) return; // prettier-ignore
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
  },
  removeOGPlaybackSpeed() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".ytp-settings-button")) {
        setTimeout(() => {
          const settingItems = document.querySelectorAll(".ytp-menuitem");
          settingItems.forEach((item) => {
            const label = item.querySelector(".ytp-menuitem-label");
            if (label && label.innerHTML === "Playback speed") {
              item.remove();
            }
          });
        }, 10);
      }
    });
  },
};

const PlayerButton = {
  async customButton() {
    //get storage data
    let { speeds, defaultPlayback } = await chrome.storage.local.get();

    //listeners
    chrome.storage.onChanged.addListener((changes) => {
      //CHANGE AFTER ADDITION OF DEFAULT TO ARRAY
      if (changes.defaultPlayback) {
        customButtonElement.innerHTML = `${changes.defaultPlayback.newValue}x`;
        console.log(
          "changed button value : ",
          changes.defaultPlayback.newValue
        );
      }
      if (changes.speeds) {
        speeds = changes.speeds.newValue;
        this.createMenu(speeds, defaultPlayback);
        console.log("changed speed values : ", speeds);
      }
    });

    //getting, checking & creation
    const rightControls = document.querySelector(".ytp-right-controls");
    if (!rightControls) return;
    let customButtonElement = document.querySelector(".custom-button");
    if (!customButtonElement) {
      customButtonElement = document.createElement("button");
      customButtonElement.className = "custom-button ytp-button";
      customButtonElement.title = "Playback speed";
      customButtonElement.innerHTML = `${defaultPlayback}x`;
    }
    //placement
    const captionElement = rightControls.querySelector(".ytp-subtitles-button");
    rightControls.insertBefore(customButtonElement, captionElement);
    this.createMenu(speeds, defaultPlayback);
    //menu toggle and position
    customButtonElement.addEventListener("click", () => {
      const divBox = document.querySelector(".menu-bar");
      if (divBox) {
        //positioning
        divBox.style.position = "relative";
        const getRect = customButtonElement.getBoundingClientRect();
        const divWidth = parseFloat(getComputedStyle(divBox).width);
        const divHeight = parseFloat(getComputedStyle(divBox).height);
        //actual calculation
        // divBox.style.top = `${getRect.top - divBox.offsetHeight - 13}px`; // prettier-ignore
        // divBox.style.left = `${getRect.left - divBox.offsetWidth / 2 - getRect.width / 2}px`; // prettier-ignore
        divBox.style.top = `${getRect.top - divHeight - 13}px`; // prettier-ignore
        divBox.style.left = `${getRect.left - (divWidth/2) + 17}px`; // prettier-ignore
        //toggle
        if (divBox.style.display === "none" || divBox.style.display === "") {
          divBox.style.display = "block";
        } else {
          divBox.style.display = "none";
        }
      }
    });
  },

  createMenu(speeds, defaultPlayback) {
    const menuItemsAll = document.querySelectorAll(".menu-item");
    if (menuItemsAll) {
      menuItemsAll.forEach((item) => item.remove());
    }
    const activeItem = document.querySelector(".active-item");
    if (activeItem) {
      activeItem.remove();
    }
    defaultPlayback = parseFloat(defaultPlayback);
    //creation
    let divBox = document.querySelector(".menu-bar");
    if (!divBox) {
      divBox = document.createElement("div");
      divBox.className = "menu-bar";
      document.body.appendChild(divBox);
    }
    //add data
    speeds.forEach((speed) => {
      const menuItem = document.createElement("div");
      menuItem.className =
        defaultPlayback === speed ? "active-item" : "menu-item";
      menuItem.innerHTML = `${speed.toFixed(2)}x`;
      divBox.appendChild(menuItem);
    });
  },
};