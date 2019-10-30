import browser from 'webextension-polyfill';

import contents from '../contents';

import messageBlock from '../components/messageBlock';
import howTo from '../components/howTo';
import historyBlock from '../components/historyBlock';

import historyService from '../services/history';
import storageService from '../services/storage';

const landing = {
  name: 'landing',
  components: {
    messageBlock,
    howTo,
    historyBlock
  },
  data() {
    return {
      contents,
      pageReady: false,
      pageError: false,
      copyHistory: []
    };
  },
  methods: {
    async getHistory() {
      try {
        this.copyHistory = await historyService.getAllHistory();
      } catch (err) {
        this.pageError = true;
        console.log(new Error(err));
      }

      this.pageReady = true;
    },
    async deleteHistory(id) {
      // Get latest local storage
      const latestHistory = await historyService.getAllHistory();

      // Filter out item with same uuid
      const newHistory = latestHistory.filter(r => Object.prototype.hasOwnProperty.call(r, 'id') && r.id !== id);

      // Set local storage and update screen
      const newLocalStorage = {
        copierHistory: [...newHistory]
      };

      try {
        await storageService.setLocalStorage(newLocalStorage);
      } catch (err) {
        console.log(new Error(err));

        this.pageError = true;
      }

      this.copyHistory = [...newHistory];
    },
    listenStorage() {
      // Listen to storage change and refresh list
      browser.storage.onChanged.addListener(this.getHistory);
    }
  },
  mounted() {
    this.getHistory();
    this.listenStorage();
  },
  template: `
    <div>
      <message-block
        v-if="!pageReady"
        :message="contents.loading"
      />

      <message-block
        v-else-if="pageError"
        :message="contents.pageError"
      />

      <how-to
        v-else-if="copyHistory === undefined || !copyHistory.length"
        :image="contents.howToImagePath"
        :message="contents.noHistoryFound"
      />

      <div v-else>
        <history-block v-for="(record, index) in copyHistory" :key="record.id"
          :id="record.id"
          :content="record.content"
          :from="record.from"
          :timestamp="record.timestamp"
          :index="index"
          :deleteHandler="deleteHistory"
        />
      </div>
    </div>
  `
};

export default landing;
