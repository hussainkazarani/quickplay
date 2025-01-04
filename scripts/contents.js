// contents.js
let isObserving = false;

// Function to handle speed setting
async function setDefaultSpeed() {
  chrome.runtime.sendMessage({ type: "changeSpeed" }, (response) => {
    console.log("Background response IN CONTENT:", response);
  });
}

// Function to remove original playback speed option
function removeOGPlaybackSpeed() {
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
}

// Function to initialize mutation observer
function initializeObserver() {
  if (isObserving) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        // Check if video element exists
        const video = document.querySelector("video");
        if (video) {
          setDefaultSpeed();
        }
      }
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  isObserving = true;
}

// Initial setup
window.addEventListener("load", () => {
  removeOGPlaybackSpeed();
  setDefaultSpeed();
  initializeObserver();
});

// Listen for URL changes (for navigation within YouTube)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (url.includes("youtube.com/watch")) {
      setDefaultSpeed();
    }
  }
}).observe(document, { subtree: true, childList: true });

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "changeSpeed") {
    setDefaultSpeed();
    sendResponse({ success: true });
  }
});

// window.addEventListener("load", () => {
//   removeOGPlaybackSpeed();
//   setDefaultSpeed();
// });

// function removeOGPlaybackSpeed() {
//   document.addEventListener("click", (e) => {
//     if (e.target.closest(".ytp-settings-button")) {
//       setTimeout(() => {
//         const settingItems = document.querySelectorAll(".ytp-menuitem");
//         settingItems.forEach((item) => {
//           const label = item.querySelector(".ytp-menuitem-label");
//           if (label && label.innerHTML === "Playback speed") {
//             item.remove();
//           }
//         });
//       }, 10);
//     }
//   });
// }
// async function setDefaultSpeed() {
//   chrome.runtime.sendMessage({ type: "changeSpeed" }, (response) => {
//     console.log("Background response IN CONTENT:", response);
//   });
// }
