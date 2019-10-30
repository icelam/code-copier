import simplebar from 'simplebar-vue';
import formatUtils from '../../utils/format';
import codeCopier from '../../lib/code-copier';

const historyBlock = {
  name: 'historyBlock',
  components: {
    simplebar
  },
  props: {
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    deleteHandler: {
      type: Function,
      required: true
    }
  },
  methods: {
    initCodeCopy(snippets) {
      const copier = codeCopier(snippets);
      copier.init();
    },
    deleteRecord() {
      this.deleteHandler(this.id);
    }
  },
  mounted() {
    this.initCodeCopy([this.$refs.codeBlock]);
  },
  computed: {
    formattedTime() {
      return formatUtils.formatDate(this.timestamp);
    }
  },
  template: `
    <div class="history-block">
      <div class="history-block__title">
        <p class="history-block__info">History #{{index + 1}} - {{formattedTime}}</p>
        <div class="history-block__actions">
          <a
            :href="from"
            target="_blank"
            rel="noopener noreferrer"
            class="history-block__actions__button"
          >
            <img src="assets/images/icons/external-link.svg" />
          </a>
          <button
            class="history-block__actions__button"
            @click="deleteRecord"
          >
            <img src="assets/images/icons/delete.svg" />
          </button>
        </div>
      </div>
      <simplebar
        data-simplebar-auto-hide="true"
        class="history-block__content"
      >
        <pre  ref="codeBlock"><code>{{content}}</code></pre>
      </simplebar>
    </div>
  `
};

export default historyBlock;
