function replaceProfilePictures() {
  console.log('Replacing profile pictures...');

  const profileImageSelectors = [
      'img[src*="profile"]',
      'img[alt="Profile photo"]',
      '.feed-shared-actor__avatar img',
      '.ivm-view-attr__img--centered',
      '.comments-comment-item__image-container img',
      '.presence-entity__image',
      '.profile-photo img',
      '.feed-identity-module__member-photo  EntityPhoto-circle-5 evi-image lazy-image ember-view',
      '.global-nav_me-photo evi-image ember-view',
      '.EntityPhoto-circle-3-ghost-person ivm-view-attr__ghost-entity update-components-actor_avatar-image',
      '.EntityPhoto-circle-3.evi-image.ember-view',
      '.avatar.member.EntityPhoto-circle-1.evi-image.ember-view',
      '.avatar.member.EntityPhoto-circle-2.evi-image.ember-view',
      '.da-card-creative__profile-image',
      
  ];

  let totalImagesFound = 0;

  profileImageSelectors.forEach(selector => {
      const profileImages = document.querySelectorAll(selector);
      console.log(`Found images for selector ${selector}: ${profileImages.length}`);
      totalImagesFound += profileImages.length;

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

  console.log(`Total images found: ${totalImagesFound}`);
}

// Observe for dynamically loaded profile pictures
const observer = new MutationObserver(mutations => {
  console.log('Mutations observed:', mutations.length);
  replaceProfilePictures();
});

observer.observe(document.body, { childList: true, subtree: true });

replaceProfilePictures();
