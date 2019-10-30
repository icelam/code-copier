const messageBlock = {
  name: 'messageBlock',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  template: `
    <p class="message-block">
      {{message}}
    </p>
  `
};

export default messageBlock;
