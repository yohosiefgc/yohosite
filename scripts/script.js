//Get Elements
const nav = document.getElementById('navigation');
const navToggle = document.getElementById('navtoggle');
const navAltToggle = document.querySelectorAll('.nav-alt-toggle'); 
const navLi = document.querySelector('.navigation-li');
const navIconLineOne = document.querySelector('.sidebar-nav-icon-line-1');
const navIconLineTwo = document.querySelector('.sidebar-nav-icon-line-2');
const navIconLineBorder = document.querySelector('.sidebar-nav-icon-border');

let navToggleTracker = false; //TODO: I think this isn't right

navToggle.addEventListener('mouseenter', function(){
    if(navToggleTracker === true){ 
        hideNav()
    }
    else{
        showNav(); 
    } //todo reduce to 1 line
})

navAltToggle[0].addEventListener('mouseenter', function(){ hideNav(); });
navAltToggle[1].addEventListener('mouseenter', function(){ hideNav(); }); //TODO: Make simpler, combine

const showNav = () => {
    navToggleTracker = true;
    nav.classList.add('navigation-show');
    navIconLineOne.classList.add('active');
    navIconLineTwo.classList.add('active');
    navIconLineBorder.classList.add('active');
}

const hideNav = () => {
    navToggleTracker = false;
    nav.classList.remove('navigation-show');
    navToggle.classList.remove('navigation-pause');
}