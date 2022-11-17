var videojs = require('video.js');

//BROWSERIFY: browserify scripts/script.js -o bundle.js
//Get Elements
const nav = document.getElementById('navigation');
const navToggle = document.getElementById('navtoggle');
const navMain = document.querySelector('.navigation-main-container');
const navAltToggle = document.querySelectorAll('.nav-alt-toggle'); 
const navLi = document.querySelectorAll('.navigation-li');

const navIconLineOne = document.querySelector('.sidebar-nav-icon-line-1');
const navIconLineTwo = document.querySelector('.sidebar-nav-icon-line-2');
const navIconLineBorder = document.querySelector('.sidebar-nav-icon-border');
const navDiagonals = document.querySelector('.navigation-svg-container');

const titleDefault = document.querySelector('.title-default');
const titleHover = document.querySelector('.title-hover');

const h5Original = document.querySelector('.original');
const h5Secondary = document.querySelector('.secondary');

let navToggleTracker = false; //TODO: I think this isn't right
let buttonDisable = false; //TODO: I think this isn't right
let leftNav = false;

window.onload = function () {
    fadeIn();
    setTimeout(() => {
        window.scrollTo(0, 0); //scroll to the beginning of the page on load
    }, 1);
}

//Throttle Code
let throttlePause;

const throttle = (callback, time) => {
    if (throttlePause) return;
    throttlePause = true;
    setTimeout(() => {
        callback && callback();
        throttlePause = false;
    }, time);
};

//title hover
titleDefault.addEventListener('mouseenter', function () {
    titleHover.classList.add('fade-in-anim');
});
titleDefault.addEventListener('mouseleave', function () {
    titleHover.classList.remove('fade-in-anim');
});

//main navigation listener
navToggle.addEventListener('mouseenter', function () {
    if (!navToggleTracker && !buttonDisable) {
        buttonDisable = true;
        showNav();
        setTimeout(function () {
            buttonDisable = false;
        }, 1000);
    }
    else {
        hideNavCheck();
    }
});

navToggle.addEventListener('mouseleave', function () { leftNav = true; });

// sidebar navigation listener
for (let i = 0; i < navAltToggle.length; i++){
    navAltToggle[i].addEventListener('mouseenter', function () { hideNavCheck(); });
    navAltToggle[i].addEventListener('mouseover', function () { hoverNavFallback(); });
}

let hoverNavFallback = () => {
    if (!buttonDisable && leftNav) {
        console.log("fallback navigation initiated");
        hideNavCheck();
    }
}

let hideNavCheck = () => {
    if (navToggleTracker && !buttonDisable) {
        hideNav()
    }
}

const showNav = () => {
    navToggleTracker = true;
    nav.classList.remove('navigation-hide');
    nav.classList.add('navigation-show');

    //bg fadein animation
    nav.classList.remove('navigation-animation-bg-fadeout');
    nav.classList.add('navigation-animation-bg-fadein');
    nav.style.backgroundColor = ('rgba(0,0,0,.95)'); // ??? WHY?

    navIconLineOne.classList.add('svg1animation');
    navIconLineTwo.classList.add('svg1animation');
    navIconLineBorder.classList.add('svg2animation');
    setTimeout(function () {
        navMain.classList.add('navigation-animation');
        navDiagonals.classList.add('diagonal-rectangle-navigation');
        for (let i = 0; i < navLi.length; i++){
            navLi[i].classList.add('navigation-li-animation');
        }
    }, 10);
}

const hideNav = () => {
    navToggleTracker = false;
    leftNav = false; //sets fallback to false

    //bg fadeout animation
    nav.classList.remove('navigation-animation-bg-fadein');
    nav.classList.add('navigation-animation-bg-fadeout');
    nav.style.backgroundColor = ('rgba(0, 0, 0, 0)'); // ??? WHY?

    navIconLineTwo.classList.remove('svg1animation');
    navIconLineOne.classList.remove('svg1animation');
    navIconLineBorder.classList.remove('svg2animation');
    navMain.classList.remove('navigation-animation');
    navDiagonals.classList.remove('diagonal-rectangle-navigation');

    for (let i = 0; i < navLi.length; i++){
        navLi[i].classList.remove('navigation-li-animation');
    }
    setTimeout(function () {
        nav.classList.add('navigation-hide');
        nav.classList.remove('navigation-show');
    }, 800);
}

//TODO: Restore this functionality for To Portfolio Home to transition
// const scrollContainer = document.querySelector('.portfolio');
// const horizontalScroll = () => {
//     let h5 = document.getElementsByTagName("h5")[0];
//     if (window.pageXOffset >= 500) {
//         console.log("scroll successful");
//         h5Secondary.classList.add('fade-in-anim');
//     }
//     if (window.pageXOffset < 500) {
//         h5.textContent = "To Portfolio Home";
//     }
// }; 
// window.addEventListener("scroll", horizontalScroll);

//SCROLL
var wait = false;
let totalScroll = 0;
let count = 0;
let isScrolling;
let arrow;
let scroll;

window.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (key) {
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
    }
});

window.addEventListener('wheel', (evt) => {
    scroll = true;
    startScrollWheelEvent(evt)
});

function startScrollWheelEvent(evt) {
    //get the total scroll from the mousescroll event
    totalScroll += evt.deltaY;
    totalScroll += evt.deltaX; //TODO: Fix snap on x axis mouse
    count++;

    //if wait is set to true, then don't proceed (see clockTick)
    if (wait) {
        clockTick(totalScroll);
        return;
    }

    //if wait is set to false, then proceed and take the total value accumulated while scrolling
    if (!wait) startScrollProcess(totalScroll);

    startClock();
}

//CLOCK FUNCTION
function startClock() {
    wait = true;
    setTimeout(function () {
        wait = false;
    }, 100);
}

function clockTick(val) {  //TODO: Make generic so this function can be reused!
    const clockTick = setInterval(function () {
        if (wait === false) {
            count = 0;
            startScrollProcess(val);
            clearInterval(clockTick);
        }
    }, 20)
}

function startScrollProcess(num) {
    isScrolling = true
    detectEquality();
    
    //todo: leftValue seems bigger than it should be
    let leftValue = Math.floor(window.scrollX += num); // calc where we need to go

    if (leftValue < 0) { leftValue = 0 };
    if (leftValue > document.body.scrollWidth) { leftValue = document.body.scrollWidth }; //TODO: why is this always like 300 pixels bigger

    window.scrollTo({
        left: leftValue,
        behavior: 'smooth'
    });
    window.scrollX = leftValue;
    leftValue = 0;
    totalScroll = 0;
}

const detectEquality = () => {
    let rangeMax = window.scrollX + 10;
    let rangeMin = window.scrollX - 10;
    let curPageLeft = Math.round(window.visualViewport.pageLeft);

    if (curPageLeft < rangeMax && curPageLeft > rangeMin){
        //if they're not equal, they should be equal, but only if the scrolling is finished
        let tempPos = Math.ceil(window.visualViewport.pageLeft);
        const checkPos = setInterval(function () {
            let posTick = Math.ceil(window.visualViewport.pageLeft);
            if (posTick === tempPos) {
                detectScrollEqualsView();
                window.scrollX = posTick;
                clearInterval(checkPos);
            }
            else {
            }
            tempPos = Math.ceil(window.visualViewport.pageLeft);
        },50)
    }
}

const detectScrollEqualsView = () => {
    //TODO: Pull in curPageLeft
    let checkEqual = setInterval(function () {
        rangeMax = window.scrollX + 10;
        rangeMin = window.scrollX - 10;
        //if it is INSIDE the bounds, stop the process
        if ((window.visualViewport.pageLeft < rangeMax) && (window.visualViewport.pageLeft > rangeMin)) {
            isScrolling = false;
            clearInterval(checkEqual);
        }
        //if it is OUTSIDE the bounds, set the visualViewport to the actual value of window.scrollX and try again
        else {
            window.visualViewport.pageLeft = window.scrollX;
        }
    }, 50)
}

//start parallax scroll
let lastScroll = 0;
let scrollDirection = ``;
let parallaxObj = document.querySelectorAll('.parallax-obj');
let totalMove = [];

parallaxObj.forEach((parallaxObj) => {
    totalMove.push(0);
})

window.addEventListener("scroll", function () {
    throttle(() => {
        handleScrolling()
    }, 200);
})

const handleScrolling = () => {
    //This checks to confirm if the scrollbar is the actual visualViewport Position
    if (!isScrolling) {
        window.scrollX = window.visualViewport.pageLeft;
    }

    //start parallaxScroll sequence
    if (document.readyState === "complete") {
        //Detect scroll Direction
        //TODO: Move to function
        let currentScroll = window.scrollX; //get current position... i
        if (currentScroll > lastScroll) {
            lastScroll = currentScroll
            scrollDirection = `right`;
        }
        if (currentScroll < lastScroll) {
            lastScroll = currentScroll
            scrollDirection = `left`;
        }
        parallaxScroll(scrollDirection);
        slideIn();
    };
}

const parallaxScroll = () => {
    for (let i = 0; i < parallaxObj.length; i++) {
        let parallaxObject = parallaxObj[i]; //label each parallaxObj as parallaxObject
        let speed = parallaxObject.dataset.speed * 100; //get speed, multiply by 100. 100 because of scroll gating.
        let objDirection = parallaxObject.dataset.direction; //get object direction

        let objPos = parallaxObject.getBoundingClientRect().x + window.pageXOffset; //get Object Position
        let viewRightBound = Math.floor(window.visualViewport.pageLeft + window.visualViewport.width); //get Right-side of Screen
        let viewLeftBound = Math.floor(window.visualViewport.pageLeft); //get Left-side of Screen

        if (scrollDirection === `left`){ speed = -speed } //flip if direction the user is scrolling scroll direction is left
        if (objDirection === `right`) { speed = -speed } // flip if obj direction is right

        if (!(objPos > viewRightBound) && !(objPos < viewLeftBound)) {
            totalMove[i] = totalMove[i] + speed; //tally totalMove[i]
            let pixelsToMove = totalMove[i] + 'px';
            parallaxObject.style.transform = `translateX(${pixelsToMove})`; //update translateX
        }
    }
}

//fades in parallax objects on page load
//TODO: Could be used for all fadeIns?
const fadeIn = () => {
    let parallaxObj = document.querySelectorAll('.parallax-obj');
    let portfolioImgContainer = document.querySelectorAll('.img-container');
    console.log(portfolioImgContainer);

    setTimeout(function timer() {
        for (let i = 0; i < parallaxObj.length; i++) {
            let parallaxObject = parallaxObj[i]; //get all objects 
            parallaxObject.style.opacity = ('.8');
        }
    }, 500);
    
    let incrementalCount = 800
    for (let i = 0; i < portfolioImgContainer.length; i++) {
        portfolioImgContainer[0].style.opacity = (`1`);
        setTimeout(function timer() {
            incrementalCount = incrementalCount - 100
            if (incrementalCount < 0) {
                incrementalCount = 0;
            }
            portfolioImgContainer[i].style.opacity = (`1`);
          }, incrementalCount);
    }
}

//slideIn
const slideIn = () => {
    let slideIn = document.querySelectorAll('.slideIn');
    for (let i = 0; i < slideIn.length; i++) {
        let slideInObj = slideIn[i]; //label each slideIn to be the current slideIn
        let objPos = slideInObj.getBoundingClientRect().x + window.pageXOffset; //get Object Position
        let viewRightBound = Math.floor(window.visualViewport.pageLeft + window.visualViewport.width); //get Right-side of Screen
        let viewLeftBound = Math.floor(window.visualViewport.pageLeft); //get Left-side of Screen

        let adjustedPos = objPos - 100

        if ((!(adjustedPos > viewRightBound) && !(adjustedPos < viewLeftBound)) || adjustedPos < viewRightBound ) {
                slideInObj.style.transform = `translateX(${0})`;
        }
    }
}