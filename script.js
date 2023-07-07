var headPage = document.querySelector("header");
var sticky = document.querySelector("nav").offsetTop + document.querySelector("nav").offsetHeight;
var headPageHeight = headPage.offsetHeight;

window.onscroll = function(){
    if (window.pageYOffset > sticky){
        document.getElementById("anchor").style.height = "calc("+(headPageHeight).toString() + "px + 5vh)";
        headPage.classList.add("sticky-header");
    } else {
        document.getElementById("anchor").style.height = "0px";
        headPage.classList.remove("sticky-header");
        document.getElementById("open-dropdown").checked = false;
    }
}

window.addEventListener("resize", function(){
    sticky = document.querySelector("nav").offsetTop + document.querySelector("nav").offsetHeight;
    headPage = document.querySelector("header");
    headPageHeight = headPage.offsetHeight;
},false);