import browser from 'webextension-polyfill';

const getAllHistory = async () => {
  const data = await browser.storage.local.get('copierHistory');
  const { copierHistory } = data;
  return copierHistory;
};

export default { getAllHistory };
