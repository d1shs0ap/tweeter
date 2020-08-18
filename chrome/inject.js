var textbar = (document.getElementsByClassName('DraftEditor-editorContainer')[0]).firstChild.firstChild.lastChild.firstChild.firstChild;
let textbarRect = textbar.getBoundingClientRect();

var span=document.createElement("span");
document.body.appendChild(span);
span.textContent='';
span.style.left=`${textbarRect.right}px`;
span.style.top=`${textbarRect.bottom}px`;
span.style.fontSize='19px';
span.style.fontFamily="Helvetica, sans-serif";
span.style.position='absolute';
span.style.backgroundColor='#E6E6FA';

let timer = setTimeout(()=>{}, 0);

let withoutSpaceSpan;


// updates whenever textbox changes
textbar.addEventListener('DOMSubtreeModified', () => {
    textbarRect = textbar.getBoundingClientRect();
    span.style.left=`${textbarRect.right}px`;
    span.style.top=`${textbarRect.bottom}px`;
    span.textContent='';
    clearTimeout(timer);
    timer = setTimeout(() => {
        // sends typed text to content script
        if(textbar.textContent){
            window.dispatchEvent(new CustomEvent('getTypedText', {detail: textbar.textContent}));
        }
    }, 1000);
});

// receive generated text (by gpt2) from content script
window.addEventListener('getGeneratedText', (event) => {
    // displays it
    const curLen = textbar.textContent.length;

    if (textbar.textContent == event.detail.substr(0, curLen)){
        if(event.detail[curLen]==' ') {
            span.textContent = '\xa0' + event.detail.substr(curLen);
        } else {
            span.textContent = event.detail.substr(curLen);
        }
        withoutSpaceSpan = event.detail.substr(curLen);
    }
    
}, false);

window.addEventListener("keyup", event => {
    if(event.key=='Tab'){
        event.preventDefault();
        if(span.textContent){
            textbar.textContent += withoutSpaceSpan;
        }
    }
})

