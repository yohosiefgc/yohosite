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
    generatePortfolioImgSquare(-100, 40); //TODO: why negative?
    // parallaxScroll();
    setTimeout(() => {fadeIn();},350)
}


//Throttle Code
let throttlePause;

const throttle = (callback, time) => {
  if (throttlePause) return;
  throttlePause = true;
  setTimeout(() => {
    callback();
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

// REMOVED
// edgecase nav, if you hover back while the button is disabled, it will close after x seconds
// navToggle.addEventListener('mousemove', function () {
//     console.log('mousemove');
//     hoverNavFallback();
// });

//makes it so that if you hover over the button while reading the main text, you must hover out to hoverNavFallback

navToggle.addEventListener('mouseleave', function () {
    leftNav = true;
});

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

const portfolioImgSquare = document.querySelectorAll('.portfolio-img-square');
const portfolioImg = document.querySelectorAll('.portfolio-img');

const generatePortfolioImgSquare = (topRand, leftRand) => {    
    let runCount = 0
    for (let i = 0; i < portfolioImgSquare.length; i++) {   
        const result = randomGenerationSquare(topRand, leftRand, runCount);
        runCount++
        let plusOrMinus = Math.round(Math.random()) * 2 - 1; //TODO: repeat var

        portfolioImgSquare[i].style.top = `${result.top}px`;

        plusOrMinus === 1 ? portfolioImgSquare[i].style.left = `${result.leftOrRight}px` : portfolioImgSquare[i].style.right = `${result.leftOrRight}px`;
        portfolioImgSquare[i].style.width = `${result.width}px`;
        portfolioImgSquare[i].style.height = `${result.height}px`;
        portfolioImgSquare[i].style.background = ('linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 22%, rgba(255,255,255,0.03) 100%');
    }
}

const randomGenerationSquare = (topRand, leftRand, runCount) => {
    let coords = {
        top: '',
        leftOrRight: '',
        width: '',
        height: ''
    }

    const min = 20;
    let plusOrMinus = Math.round(Math.random()) * 2 - 1;

    const top = Math.floor(Math.min(Math.random() * topRand), min) * plusOrMinus;
    let leftOrRight = Math.floor(Math.random() * leftRand) * plusOrMinus;
    
    //normalize LeftOrRight
    //TODO: Can probably do this with a clamp
    if (leftOrRight < 0 && leftOrRight > -20) {
        leftOrRight === -20;
    }
    else if (leftOrRight > 0 && leftOrRight < 20) {
        leftOrRight === 20;
    }

    const height = portfolioImg[runCount].getBoundingClientRect().height + 50 - (Math.floor(Math.min(Math.random() * 200), min));
    const width = portfolioImg[runCount].getBoundingClientRect().width - (Math.floor(Math.min(Math.random() * 200), min));
    coords.top = top;
    coords.leftOrRight = leftOrRight;
    coords.height = height;
    coords.width = width;
    // console.log(`${leftOrRight} is the value of leftOrRight`)
    return coords;
}

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
    throttle(startScrollWheelEvent(evt),250);
});

function startScrollWheelEvent(evt) {
    console.log(`scroll event`);
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
    // startScrollProcess();
}

function startClock() {
    wait = true;
    setTimeout(function () {
        wait = false;
    }, 100);
}

function clockTick(val) {
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
    let rangeMax = window.scrollX + 10; //todo: function this
    let rangeMin = window.scrollX - 10;
    let curPageLeft = Math.round(window.visualViewport.pageLeft);
    if (curPageLeft < rangeMax && curPageLeft > rangeMin){
        //if they're not equal, they should be equal, but only if the scrolling is finished
        let tempPos = Math.ceil(window.visualViewport.pageLeft);
        const checkPos = setInterval(function () {
            let posTick = Math.ceil(window.visualViewport.pageLeft);
            if (posTick === tempPos) {
                //window.scrollX != window.visualViewport.pageLeft check. Sometimes they get misaligned if you spam the mousewheel.
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
    //This checks to confirm if the scrollbar is the actual visualViewport Position
    if (!isScrolling) {
        window.scrollX = window.visualViewport.pageLeft;
    }

    if (document.readyState === "complete") {
        //Detect scroll Direction
        //TODO: Move to function
        let currentScroll = window.scrollX;
        if (currentScroll > lastScroll) {
            lastScroll = currentScroll
            scrollDirection = `right`;
        }
        if (currentScroll < lastScroll) {
            lastScroll = currentScroll
            scrollDirection = `left`;
        }
        parallaxScroll(scrollDirection);
    };
})

const parallaxScroll = () => {
    for (let i = 0; i < parallaxObj.length; i++) {
        let parallaxObject = parallaxObj[i]; //get all objects
        let speed = parallaxObject.dataset.speed * 10;
        let objDirection = parallaxObject.dataset.direction;

        if (scrollDirection === `left`){ speed = -speed }
        if (objDirection === `right`) { speed = -speed }

        totalMove[i] = totalMove[i] + speed;
        let pixelsToMove = totalMove[i] + 'px';
        parallaxObject.style.transform = `translateX(${pixelsToMove})`;
    }
}

const fadeIn = () => {
    console.log('fading in sir yes sir');
    //TODO: Refactor so parallaxObj is only query selector all'd once
    let parallaxObj = document.querySelectorAll('.parallax-obj');
    for (let i = 0; i < parallaxObj.length; i++) {
        let parallaxObject = parallaxObj[i]; //get all objects 
        parallaxObject.style.opacity = ('1');
    }
}