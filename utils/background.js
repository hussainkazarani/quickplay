import { StorageManager } from "./storage_manager.js";

chrome.runtime.onInstalled.addListener(() => {
  //initialize the values on install
  StorageManager.initializeOnInstall();
  syncYoutubeTabs();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "changeSpeed") {
    syncYoutubeTabs();
    console.log("IM INSIDEE YOUUUU");
    sendResponse({ success: true });
  }
});

// chrome.storage.onChanged.addListener((changes) => {
//   if (changes.defaultPlayback) {
//     syncYoutubeTabs();
//     console.log("key");
//   }
// });
//synchronize
function syncYoutubeTabs() {
  chrome.tabs.query({}, async (tabs) => {
    const youtubeTabs = tabs.filter((tab) => tab.url.includes("www.youtube.com/watch"));
    console.log("the yt tabs open are : ", youtubeTabs);
    const { defaultPlayback } = await chrome.storage.local.get();
    if (defaultPlayback === undefined) {
      console.error("No defaultPlayback value set in storage.");
      return;
    }

    youtubeTabs.forEach((tab) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (defaultSpeed) => {
          console.log(document.querySelector("video").playbackRate);
          console.log("CHANGED!!");
          const video = document.querySelector("video");
          if (video) {
            video.playbackRate = defaultSpeed;
          }
        },
        args: [defaultPlayback],
      });
    });
  });
}
