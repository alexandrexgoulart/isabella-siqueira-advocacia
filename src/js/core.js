// Core site functionality
export function initSite() {
  // Initialize core site features
  console.log('Core site initialization');
}

export function initAdmin() {
  // Initialize admin features
  console.log('Admin features initialization');
}

// Site features module
export function initSiteFeatures() {
  console.log('Site features initialization');
  return {
    init: initSite,
    initAdmin: initAdmin
  };
}