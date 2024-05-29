chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
  chrome.action.disable(); // Disable action button by default
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url && tab.url.includes('linkedin.com/feed')) {
          chrome.action.enable(tabId); // Enable action button on LinkedIn feed page
      }
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
  }).catch((error) => {
      console.error('Error executing script:', error);
  });
});
