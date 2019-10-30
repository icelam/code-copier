import browser from 'webextension-polyfill';

const settingsKey = 'disabledSites';
const settingsForm = document.querySelector('form');
const hostnameListInput = document.getElementById('hostnameList');

const saveOptions = async (e) => {
  e.preventDefault();

  // Remove whitespace and line breaks
  const hostnameListStr = hostnameListInput.value.replace(/(\r\n|\n|\r)/gm, ',').replace(/\s/g, '');

  // Remove empty
  const hostnameList = hostnameListStr.split(',').filter(h => !!h);

  const newDisableSetting = {};
  newDisableSetting[settingsKey] = hostnameList;
  await browser.storage.local.set(newDisableSetting);

  window.close();
};

const restoreOptions = async () => {
  const { disabledSites } = await browser.storage.local.get(settingsKey);

  if (disabledSites && disabledSites.length) {
    hostnameListInput.value = disabledSites.join(',');
  }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
settingsForm.addEventListener('submit', saveOptions);
