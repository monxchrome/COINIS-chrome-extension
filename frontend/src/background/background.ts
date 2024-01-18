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