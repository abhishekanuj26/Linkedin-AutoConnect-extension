document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("click-this").addEventListener("click", async()=>{
        let [tab] = await chrome.tabs.query({active:true,currentWindow:true});

        chrome.scripting.executeScript({
            target: {tabId:tab.id},
            function: doSomething
        });
    });
  });


function doSomething(){

    var buttonCount =0;
    var buttonList = document.querySelectorAll( "li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted)");
    for(var i = 0;i<buttonList.length;i++){
        (function(index) {
            setTimeout(()=>{
                console.log("sending request");
                if(buttonList[index].innerText == "Connect"){
                // buttonList[index].click();
                setTimeout(()=>{
                    console.log("sending request again with popup");
                    var sendButton = document.querySelector("div.send-invite button.artdeco-button--primary");
                    // sendButton?.click();
                    buttonCount++;
                    chrome.runtime.sendMessage({message:buttonCount});
                },1000);
            }
            },index*2000)
        })(i);
   }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    document.getElementById("countSent").innerText = message.message;
   console.log(message.message);
  });
  




  