document.getElementById("alert").onclick = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>{
        chrome.tabs.sendMessage(tabs[0].id, {method:'ALERT'});
    });
    
}



function StartAlert(){
    chrome.runtime.sendMessage({method: 'ALERT'});
}
