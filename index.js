const runBtn = document.getElementById('run-code');
const iframeContainer = document.getElementById('iframe-container');
const editorContainer = document.getElementById('editor-container');
const checkbox = document.getElementById('live');
const rotate = document.getElementById('rotate');
const wrapper = document.getElementById('editor-and-iframe-wrapper')
const debounceUpdateUI = debounce(updateFrame, 1000);

const blackListKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

const initialHtml = `
<html>
<body>
<h1>Hello</h1>
</body>
</html>
`
editorContainer.textContent = initialHtml;
updateFrame();

runBtn.addEventListener('click', updateFrame);
checkbox.addEventListener('change', () => {
  if(checkbox.checked) {
    editorContainer.addEventListener('keyup', hotReload);
  }else{
    editorContainer.removeEventListener('keyup', hotReload);
  }
})

function hotReload(event) {
  if(!blackListKeys.includes(event.code)){
    debounceUpdateUI();
  }
}

function debounce(callback, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(callback, delay)
  }
}

function updateFrame() {
  const code = editorContainer.textContent;
  iframeContainer.src = "data:text/html;charset=utf-8," + encodeURI(code);
}

rotate.addEventListener('click', () => {
  if(wrapper.classList.contains('flex-column')) {
    wrapper.classList.remove('flex-column');
  }else{
    wrapper.classList.add('flex-column');
  }
})