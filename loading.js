document.addEventListener("readystatechange", pageReadyState, false);

function pageReadyState(){
    var state = document.readyState;
    if(state == 'interactive') {
        document.removeEventListener('readystatechange', pageReadyState);
        document.getElementById("loading").style.animation = "erase-loading 1s";
        setTimeout(function(){
            document.getElementById('loading').style.visibility="hidden";
            document.getElementById("loading").remove();
        }, 1000);
    }
}