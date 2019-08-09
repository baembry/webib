export const copyAll = function() {
  const toCopy = document.getElementById('copy');
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(toCopy);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
};

export const copySelected = function(ids) {
  const selection = window.getSelection();
  const range = document.createRange();
  selection.removeAllRanges();
  const clipboard = document.getElementById('clipboard');
  for (let id of ids) {
    const container = document.createElement('div');
    const selected = document.getElementById(id).cloneNode(true);
    container.appendChild(selected);
    clipboard.appendChild(container);
  }
  range.selectNodeContents(clipboard);
  console.log(range);
  selection.addRange(range);
  document.execCommand('copy');
  clipboard.innerHTML = '';
  selection.removeAllRanges();
};
