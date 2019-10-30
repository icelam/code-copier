const howTo = {
  name: 'howTo',
  props: {
    image: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="how-to">
      <div class="how-to__image">
        <img :src="image" :alt="message">
      </div>
      <p v-html="message"></p>
    </div>
  `
};

export default howTo;
