import { StorageManager } from "./storage.js";
import { speedValidation } from "./validation.js";
let speedToAdd = [];

chrome.runtime.onInstalled.addListener(() => {
  //initialize the values
  StorageManager.initialize();
  
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //types of messages
  if (message.type === "VERIFY_CUSTOM_SPEED") {
    console.log("inside background.js");
    speedValidation.validateCustomSpeed(message.customSpeed).then(async (isValid) => {
      if (isValid === true) {
        speedToAdd = await StorageManager.addCustomSpeed(message.customSpeed);
      }
      console.log("the isValid response is : ", isValid, speedToAdd);
      console.log("SPEED TO ADDDD:", speedToAdd);

      sendResponse({ isValid, speedToAdd });
    });
    return true;
  }
});
