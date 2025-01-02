// popUpInitialize();

// function popUpInitialize() {

//   // defaultSpeedListener();
// }
document.addEventListener("DOMContentLoaded", () => {
  customSpeedListener();
});

function customSpeedListener() {
  const customSpeedElement = document.querySelector(".custom-speed");
  customSpeedElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("YOU PRESSED ENTER");
      chrome.runtime.sendMessage({ type: "CUSTOM_SPEED", customSpeed: e.target.value }, (response) => {
        console.log(response.ans);
      });
    }
  });
}

function defaultSpeedListener() {
  const customSpeedElement = document.querySelector(".default-speed");
  customSpeedElement.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("SENT DEFAULT SPEED TO BACKGROUND.JS");
    }
  });
}


