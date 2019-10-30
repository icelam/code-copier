const codeCopier = function (elements, callback) {
  const initIdentifier = 'data-copier-init';
  const copiedCallback = callback;
  const codeSnippets = elements;

  const init = function () {
    const newCodeSnippets = codeSnippets.filter(c => !c.hasAttribute(initIdentifier));

    newCodeSnippets.forEach((snippet) => {
      // Listen to non-primary click
      snippet.addEventListener('auxclick', function codeClick(e) {
        const el = this;
        e.stopPropagation();
        e.preventDefault();

        // Add element to range for select
        const range = document.createRange();
        range.selectNode(el);

        // Select text of current clicking element
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');

        // Run custom callback, e.g. save to storage
        if (typeof copiedCallback === 'function') {
          const copiedContent = window.getSelection().toString();
          copiedCallback(copiedContent);
        }

        // Copied indicator
        el.classList.add('code-copier--blink');
        setTimeout(() => {
          el.classList.remove('code-copier--blink');
        }, 1200);

        // Clear all selection
        window.getSelection().removeAllRanges();
      });

      // Prevent context menu on right click
      snippet.addEventListener('contextmenu', function preventContentMenu(e) {
        e.preventDefault();
      });

      // Add attribute to prevent duplicate event binding
      snippet.setAttribute(initIdentifier, 'true');
    });
  };

  return {
    init
  };
};

export default codeCopier;
