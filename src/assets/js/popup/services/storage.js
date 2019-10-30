import browser from 'webextension-polyfill';

const getLocalStorage = async () => {
  const data = await browser.storage.local.get();
  return data;
};

const setLocalStorage = async (data) => {
  await browser.storage.local.set(data);
};

export default { getLocalStorage, setLocalStorage };
