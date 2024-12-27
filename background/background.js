import { StorageManager } from "../utils/storage.js";

chrome.runtime.onInstalled.addListener(() => {
  StorageManager.initialize();
  console.log("StorageManager initialized!!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SPEEDS") {
    StorageManager.getStorageData()
      .then((data) => sendResponse(data))
      .catch((error) => console.log("Error getting speeds : ", error));
    return true;
  }
});
