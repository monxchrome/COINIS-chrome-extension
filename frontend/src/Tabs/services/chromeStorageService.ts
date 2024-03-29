const chromeStorageService = {
  getNotes: () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
        const pages = Object.keys(items)
          .filter((key) => key.startsWith("storageObjectKey"))
          .map((key) => items[key])

        resolve(pages);
      });
    });
  },

  deleteNote: (pageName: any) => {
    return new Promise((resolve, reject) => {
        const key = `pageContent_${pageName}`;
        chrome.storage.sync.get('storageObjectKey', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                let storageObject = result['storageObjectKey'];
                if (storageObject && storageObject[key]) {
                    delete storageObject[key];
                    chrome.storage.sync.set({ 'storageObjectKey': storageObject }, () => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(`Content for page ${pageName} deleted successfully.`);
                        }
                    });
                } else {
                    resolve(`No content found for page ${pageName}.`);
                }
            }
        });
    });
  },

  createNote: (pageName: any, content: any, onSaveToStorage: any) => {
    const timestamp = Date.now();
    const storageKey = `pageContent_${pageName}`;

    chrome.storage.sync.get({ storageObjectKey: {} }, (result) => {
      const currentData = result.storageObjectKey;

      const newData = {
        id: timestamp,
        pageName: pageName,
        content: content
      };

      const updatedData = { ...currentData, [storageKey]: newData };

      chrome.storage.sync.set({ storageObjectKey: updatedData }, () => {
        console.log('Content saved to Chrome Storage as an object with Key:', storageKey);
        onSaveToStorage(storageKey);
      });
    });
  },
   
  getShorts: () => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
        console.log(items)
        const pages = Object.keys(items)
          .filter((key) => key.startsWith("storageObjectShortKey"))
          .map((key) => items[key])

        resolve(pages);
      });
    });
  },


  createShort: (pageName: any, content: any, onSaveToStorage: any) => {
    const timestamp = Date.now();
    const storageKey = `shortContent_${pageName}`;

    chrome.storage.sync.get({ storageObjectShortKey: {} }, (result) => {
      const currentData = result.storageObjectShortKey;

      const newData = {
        id: timestamp,
        pageName: pageName,
        content: content
      };

      const updatedData = { ...currentData, [storageKey]: newData };

      chrome.storage.sync.set({ storageObjectShortKey: updatedData }, () => {
        console.log('Short Content saved to Chrome Storage as an object with Key:', storageKey);
        onSaveToStorage(storageKey);
      });
    });
  },

  deleteShort: (pageName: any) => {
    return new Promise((resolve, reject) => {
        const key = `shortContent_${pageName}`;
        chrome.storage.sync.get('storageObjectShortKey', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                let storageObject = result['storageObjectShortKey'];
                if (storageObject && storageObject[key]) {
                    delete storageObject[key];
                    chrome.storage.sync.set({ 'storageObjectShortKey': storageObject }, () => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(`Content for short ${pageName} deleted successfully.`);
                        }
                    });
                } else {
                    resolve(`No content found for short ${pageName}.`);
                }
            }
        });
    });
  },
};

export default chromeStorageService;