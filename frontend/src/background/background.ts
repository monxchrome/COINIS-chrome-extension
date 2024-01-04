export {};

chrome.runtime.onInstalled.addListener(() => {
    console.log("App has been installed")
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log("bookmark has been created")
})