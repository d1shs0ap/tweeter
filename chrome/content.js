//needs to update the div.innerText of the injected script to the text that background.js delivers here
//here is the view generating inject.js
window.onload = () => {

  var inject = document.createElement('script');
  // TODO: add "script.js" to web_accessible_resources in manifest.json
  inject.src = chrome.runtime.getURL('inject.js');
  inject.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(inject);
}

// receive typed text from injected script
window.addEventListener('getTypedText', (event) => {
  // send text to background script
  chrome.runtime.sendMessage({
    text: event.detail
  });
}, false);

// receive generated text (by gpt2) from background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request.generatedText, '\n\n\n\n\n');

  // send generated text (by gpt2) to inject script
  window.dispatchEvent(new CustomEvent('getGeneratedText', {detail: request.generatedText}));
})
