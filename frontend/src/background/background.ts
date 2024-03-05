export {};

chrome.runtime.onInstalled.addListener(() => {
  console.log("App has been installed");
});

chrome.bookmarks.onCreated.addListener(() => {
  console.log("bookmark has been created");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openUrl") {
    chrome.tabs.create({ url: request.url });
  }
});

// chrome.runtime.onInstalled.addListener(function () {
//   var request = indexedDB.open("VoiceMemosDB", 2 + 1);

//   request.onupgradeneeded = function (event) {
//     //@ts-ignore
//     var db = event.target.result;

//     // Получаем список имен объектных хранилищ
//     var objectStoreNames = db.objectStoreNames;

//     // Проходимся по каждому объектному хранилищу и удаляем его
//     for (var i = 0; i < objectStoreNames.length; i++) {
//       db.deleteObjectStore(objectStoreNames[i]);
//     }
//   };
//   request.onsuccess = function (event) {
//     //@ts-ignore
//     var db = event.target.result;

//     // Закрываем соединение с базой данных
//     db.close();
//   };
// });

// chrome.storage.sync.clear(function () {
//   var error = chrome.runtime.lastError;
//   if (error) {
//     console.error(error);
//   }
//   // do something more
// });
// chrome.storage.sync.clear();
