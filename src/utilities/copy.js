const copy = function() {
  const toCopy = document.getElementById('copy');
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(toCopy);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
};

export default copy;
