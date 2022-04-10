const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
let isOpen = false;
toggle.onclick = function(){
    if (!isOpen) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active')
        isOpen= true;
    }else {
        menu.classList.remove('active');
        toggle.classList.remove('active');  
        isOpen= false;
    }
}

window.onscroll = ()=> myFunction();

function myFunction() {
    if (document.documentElement.scrollTop > 100) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        isOpen= false;
    } 
}