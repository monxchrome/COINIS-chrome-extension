export {};

chrome.runtime.onInstalled.addListener(() => {
    console.log("App has been installed")
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log("bookmark has been created")
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openUrl') {
      chrome.tabs.create({ url: request.url });
    }
  });

//   chrome.storage.local.clear(function() {
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
//     // do something more
// });
// chrome.storage.sync.clear();