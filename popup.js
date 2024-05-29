document.getElementById('changePictures').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: replaceProfilePictures
      }).catch((error) => {
          console.error('Error executing script:', error);
      });
  });
});

function replaceProfilePictures() {
  console.log('Replacing profile pictures...');

  const profileImageSelectors = [
      '.feed-shared-actor__avatar img',
      '.ivm-view-attr__img--centered',
      '.comments-comment-item__image-container img',
      '.presence-entity__image',
      '.profile-photo img',
      '.EntityPhoto-circle-3 evi-image ember-view',
      '.avatar member EntityPhoto-circle-1 evi-image ember-view',
      '.avatar member EntityPhoto-circle-2 evi-image ember-view',
      '.feed-identity-module_member-photo EntityPhoto-circle-5 evi-image lazy-image ember-view',
      '.da-card-creative__profile-image',
      '.da-card-creative__entity-image'
  ];

  profileImageSelectors.forEach(selector => {
      const profileImages = document.querySelectorAll(selector);
      console.log(`Found images for selector ${selector}: ${profileImages.length}`);

      profileImages.forEach(image => {
          const newSrc = chrome.runtime.getURL('replace_image.jpg');
          console.log(`Changing image ${image.src} to ${newSrc}`);
          image.src = newSrc;
          image.srcset = newSrc;

          image.onerror = () => {
              console.error('Failed to load image:', newSrc);
          };
      });
  });
}
