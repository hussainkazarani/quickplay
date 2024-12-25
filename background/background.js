import { StorageManager } from "../utils/storage.js";

chrome.runtime.onInstalled.addListener(() => {
  StorageManager.initialize();
  console.log("StorageManager initialized!!");
});
