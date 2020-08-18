// here background needs to send gpt2 generated response back to content.js

// receive message from content
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  // compute gpt2 reesponse using endpoint
  fetch('http://127.0.0.1:7000/', {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({text: request.text}),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);

    // send response back to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { generatedText: data.generatedText });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})