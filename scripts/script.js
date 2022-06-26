//Get Elements
const nav = document.getElementById('navigation');
const navToggle = document.getElementById('navtoggle');
const navMain = document.querySelector('.navigation-main-container');
const navAltToggle = document.querySelectorAll('.nav-alt-toggle'); 
const navLi = document.querySelectorAll('.navigation-li');
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
    nav.classList.remove('navigation-animation-bg-fade');
    navIconLineOne.classList.add('svg1animation');
    navIconLineTwo.classList.add('svg1animation');
    navIconLineBorder.classList.add('svg2animation');
    setTimeout(function () {
        navMain.classList.add('navigation-animation');
        for (let i = 0; i < navLi.length; i++){
            navLi[i].classList.add('navigation-li-animation');
        }
    }, 10);
    // navIconLineOne.classList.add('active');
    // navIconLineTwo.classList.add('active'); //TODO: I can remove this I think
}

const hideNav = () => {
    navToggleTracker = false;
    nav.classList.add('navigation-animation-bg-fade');
    navIconLineTwo.classList.remove('svg1animation');
    navIconLineOne.classList.remove('svg1animation');
    navIconLineBorder.classList.remove('svg2animation');
    navMain.classList.remove('navigation-animation');
    for (let i = 0; i < navLi.length; i++){
        navLi[i].classList.remove('navigation-li-animation');
    }
    setTimeout(function () {
        nav.classList.add('navigation-hide');
        nav.classList.remove('navigation-show');
    }, 800);
}