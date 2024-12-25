// // content.js

// // Function to apply the default speed to all video elements on the page
// function applyDefaultSpeed() {
//   chrome.storage.local.get(["defaultSpeed"], (data) => {
//     const defaultSpeed = data.defaultSpeed || 1.0; // Default to 1.0 if no speed is stored

//     // Apply the default speed to all video elements on the page
//     const videos = document.querySelectorAll("video");
//     videos.forEach((video) => {
//       video.playbackRate = defaultSpeed;
//     });

//     // Update the speed in the YouTube UI player (this typically shows in the speed button)
//     const speedButton = document.querySelector(
//       '.ytp-menuitem[data-tooltip-target-id="ytp-speed-button"]'
//     );
//     if (speedButton) {
//       speedButton.textContent = `${defaultSpeed}x`; // Update the speed in the YouTube menu
//     }

//     // Update the speed label (optional)
//     const speedLabel = document.querySelector(".ytp-time-speed");
//     if (speedLabel) {
//       speedLabel.textContent = `${defaultSpeed}x`;
//     }
//   });
// }

// // Function to synchronize the default speed across all YouTube tabs
// function syncSpeedAcrossTabs() {
//   chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
//     tabs.forEach((tab) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: applyDefaultSpeed,
//       });
//     });
//   });
// }

// // Listen for changes in the default speed and apply them
// chrome.storage.onChanged.addListener((changes, areaName) => {
//   if (areaName === "local" && changes.defaultSpeed) {
//     syncSpeedAcrossTabs();
//   }
// });

// // Wait for the page to load completely before applying the default speed
// window.addEventListener("load", applyDefaultSpeed);

// // In case videos load dynamically, observe for new video elements
// const observer = new MutationObserver(applyDefaultSpeed);
// observer.observe(document.body, { childList: true, subtree: true });
