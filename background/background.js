import { StorageManager } from "../utils/storage.js";

chrome.runtime.onInstalled.addListener(() => {
  StorageManager.initialize();
  console.log("StorageManager initialized!!");
  chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
    tabs.forEach((tab) => {
      // Inject the content script
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content/player.js", "content/scripts.js"],
      });

      // Sync the playback speed
      chrome.storage.local.get("playbackSpeed", (data) => {
        const speed = data.playbackSpeed;
        chrome.tabs.sendMessage(tab.id, {
          type: "PLAYBACK_SPEED_CHANGED",
          speed: speed,
        });
      });
    });
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PLAYBACK_SPEED_CHANGED") {
    chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          type: "PLAYBACK_SPEED_CHANGED",
          speed: message.speed,
        });
      });
    });
  }
});
