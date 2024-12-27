// window.onload = () => {
//   initializeVideo();
// };

// document.addEventListener("DOMContentLoaded", () => {});
// window.onload = () => {};

// document.addEventListener("DOMContentLoaded", () => {
//   PlayerOptions.removeOGPlaybackSpeed();
// });

// function initializeVideo() {
//   PlayerOptions.setDefaultYTSpeed();
//   PlayerButton.customButton();
//   setInterval(() => {
//     PlayerOptions.spedUpDurationUI();
//   }, 1000);
// }

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutations, obs) => {
    const rightControls = document.querySelector(".ytp-right-controls");
    if (rightControls) {
      obs.disconnect();
      console.log("Right controls found"); // Debug log
      PlayerOptions.removeOGPlaybackSpeed();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
