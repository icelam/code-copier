import browser from 'webextension-polyfill';
import codeCopier from './lib/code-copier';

import uuid from './utils/uuid';

const getDisabledSites = async () => {
  const { disabledSites } = await browser.storage.local.get('disabledSites');
  return disabledSites || [];
};

const saveToStorage = async (content) => {
  const key = 'copierHistory';
  const result = await browser.storage.local.get(key);
  let newHistory = JSON.parse(JSON.stringify(result));

  if (!(typeof result === 'object'
    && Object.prototype.hasOwnProperty.call(result, key)
    && Array.isArray(result[key]))) {
    newHistory = {};
    newHistory[key] = [];
  }

  if (newHistory[key].length >= 10) {
    newHistory[key].pop();
  }

  newHistory[key].unshift({
    id: uuid(),
    content,
    from: window.location.href,
    timestamp: Date.now()
  });

  await browser.storage.local.set(newHistory);
};

// Main Function - Right Click to copy code
const initCopier = () => {
  const preTags = Array.from(document.getElementsByTagName('pre'));
  const codeTags = Array.from(document.getElementsByTagName('code'));
  const codeSnippets = [...preTags, ...codeTags];

  const copier = codeCopier(codeSnippets, saveToStorage);
  copier.init();
};

// Observe Single Page Application - debounce for 1 second
let debounceTimer;
const target = document.getElementsByTagName('body')[0];
const config = {
  childList: true,
  subtree: true
};

const mutationCallback = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log('DOM changed detected: Re-initialize code copier');
    initCopier();
  }, 1000);
};


// Init extension if hostname does not mathc disabled settings
getDisabledSites().then((disabledSites) => {
  const currentHostname = window.location.hostname.match(/^www\.(.*)$/);
  const hostname = (currentHostname != null ? currentHostname[1] : window.location.hostname);

  if (!disabledSites.includes(hostname)) {
    initCopier();

    const observer = new MutationObserver(mutationCallback);
    observer.observe(target, config);
  } else {
    console.log('Code Copier has been disabled for current hostname');
  }
}).catch((err) => {
  console.log(new Error(err));
});
