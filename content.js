function showAlert(){
    function displayNotification(){
        alert("そろそろつくよ");
    }
    console.log("test");
    const targetNode = document.getElementsByClassName("departingParty_location");

    const departureWindow = document.getElementById("id_master_menuWindow_departure");

    const callback =() => {
        console.log("observer");
    }

    const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
    }

    const observer = new MutationObserver(callback);
    observer.observe(departureWindow, observerOptions);

    const targetNodeArray = Array.prototype.slice.call(targetNode);

    targetNodeArray.forEach(element => {
        const text = element.innerText;
        const splitedText = text.split('：');
        if(splitedText.length === 3){
            const splitedTime = splitedText[2].split(/[時分]/);
            const hour = splitedTime[0];
            const minutes = splitedTime[1];
            console.log(hour);
            console.log(minutes);

            const arrivalTime = new Date()
            const nowTime = new Date()
            arrivalTime.setHours(hour);
            arrivalTime.setMinutes(minutes);
            // 日付が変わっているかどうか確認したい。
            // セットした時間が今の時間より早い場合は日付が変わってる
            if(arrivalTime.getTime() - nowTime.getTime() < 0){
                arrivalTime.setDate(arrivalTime.getDate() + 1);
            }
            const delayMiliSeconds = arrivalTime.getTime() - nowTime.getTime()

            console.log(delayMiliSeconds);
            setTimeout(displayNotification, delayMiliSeconds);
        }
    });

}


console.log("top");
let value;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.method === "ALERT"){
        showAlert();
    }
});


