import { StorageManager } from "./storage.js";
import { SpeedValidator } from "./validation.js";

chrome.runtime.onInstalled.addListener(async () => {
  // SET THE INITIAL SPEEDS
  StorageManager.initialize();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("INSIDE BACKGROUND.JS");
  console.log(message);
  const isValid = SpeedValidator.validateSpeed(message.customSpeed);
  console.log(isValid);
  sendResponse({ ans: isValid ? "SUCCESSFULL ANSWER" : "NOT SUCCESSFULL" });
});
