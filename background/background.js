chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    speeds: [1.00, 1.25, 1.50, 2.00], // prettier-ignore
    defaultSpeed: 5.00, // prettier-ignore
  });
  console.log("Initial storage set");
});
