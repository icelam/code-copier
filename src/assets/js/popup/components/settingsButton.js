import browser from 'webextension-polyfill';

const settingButtons = {
  name: 'settingButtons',
  methods: {
    openSettings() {
      browser.runtime.openOptionsPage();
    }
  },
  template: `
    <button
      class="settings-button"
      @click="openSettings"
    >
      <img src="assets/images/icons/settings.svg" />
    </button>
  `
};

export default settingButtons;
