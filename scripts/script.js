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
    setTimeout(() => {
        fadeIn();
        window.scrollTo(0, 0); //scroll to the beginning of the page on load
        getScrollSnapValues(); //TODO: Only run this on pages where getScrollSnapValues exist
    }, 1); //delaying by 1 avoids any issues
}

//////////////////////////////////////////
//Reusable Functions
//////////////////////////////////////////

//Throttle Code. Only perform an action once every x frames (for 'time');
let throttlePause;
const throttle = (callback, time) => {
    if (throttlePause) return;
    throttlePause = true;
    setTimeout(() => {
        callback && callback();
        throttlePause = false;
    }, time);
};

//If the same action happens within 100ms, then don't trigger the action.

const getClosestNum = (num, arr) => {
    var curr = arr[0];
    var diff = Math.abs (num - curr)

    for (var i = 0; i < arr.length; i++) {
        var newdiff = Math.abs (num - arr[i]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = arr[i];
        }
    }
    return curr;
}

const getNextHighestIndex = (num, arr) => {
    let i = arr.length;
    while (arr[--i] > num);
    return ++i; 
}


//////////////////////////////////////////
//Navigation Scripts
//////////////////////////////////////////

//title hover
titleDefault.addEventListener('mouseenter', function () {
    titleHover.classList.add('fade-in-anim');
});
titleDefault.addEventListener('mouseleave', function () {
    titleHover.classList.remove('fade-in-anim');
});

//Main navigation Listener
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

navToggle.addEventListener('mouseleave', function () {
    leftNav = true;
});

const showNav = () => {
    navToggleTracker = true;
    nav.style.opacity = `1`;
    nav.style.visibility = `visible`; //disable click

    navIconLineOne.classList.add('svg1animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)
    navIconLineTwo.classList.add('svg1animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)
    navIconLineBorder.classList.add('svg2animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)
 
    //slideIn. Behind timer so that code runs properly, if no timer, it doesn't animate.
    setTimeout(function () {
        navMain.classList.add('navigation-animation'); //slideIn all navigation elements
        navDiagonals.classList.add('diagonal-rectangle-navigation');
        for (let i = 0; i < navLi.length; i++){
            navLi[i].classList.add('navigation-li-animation'); //animate all li's seperately
        }
    }, 10);
}

const hideNav = () => {
    navToggleTracker = false;
    leftNav = false; //sets fallback to false

    nav.style.opacity = `0`;
    nav.style.visibility = `hidden`;

    navIconLineTwo.classList.remove('svg1animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)
    navIconLineOne.classList.remove('svg1animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)
    navIconLineBorder.classList.remove('svg2animation'); //animate SVG Icon //TODO: Change to CSS animations, silly Dawn :)

    navDiagonals.classList.remove('diagonal-rectangle-navigation');

    navMain.classList.remove('navigation-animation') //slideOut;
    for (let i = 0; i < navLi.length; i++){
        navLi[i].classList.remove('navigation-li-animation');
    }
}

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


//////////////////////////////////////////
//Scroll Code
//////////////////////////////////////////

const windowScrollTo = (position, behavior) => {
    window.scrollTo({
        left: position,
        behavior: behavior
    })
}

const windowScrollBy = (position, behavior) => {
    window.scrollBy({
        left: position,
        behavior: behavior
    })
}

let totalScroll = 0;
let isScrolling;
let multScrollTicks = false;
let linearMoveValue = 70;

window.addEventListener('keydown', (evt) => {
    const key = evt.key;
    switch (key) {
        case "ArrowUp": evt.preventDefault(); linearScrollUp(); break;
        case "ArrowDown": evt.preventDefault(); linearScrollDown(); break;
        case "w": evt.preventDefault(); linearScrollUp(); break;
        case "a": evt.preventDefault(); linearScrollDown(); break;
        case "s": evt.preventDefault(); linearScrollDown(); break;
        case "d": evt.preventDefault(); linearScrollUp(); break;
    }
});

const linearScrollUp = () => {
    scrollSnapPage() ? scrollSnap(linearMoveValue) : windowScrollBy(linearMoveValue, 'auto');
}
const linearScrollDown = () => {
    scrollSnapPage() ? scrollSnap(-linearMoveValue) : windowScrollBy(-linearMoveValue, 'auto');
}

window.addEventListener('wheel', (evt) => {
    totalScroll += evt.deltaY; //Get the value of your mousewheel scroll, and add it to the totalScroll totalScroll is how much we will be scrolling
    totalScroll += evt.deltaX; //TODO: Fix snap on x axis mouse
    console.log(`${scrollSnapPage()} is the scrollSnapPage`);
    scrollSnapPage() ? scrollSnap(totalScroll) : regulateScroll(totalScroll); //if you're on a scrolling page, snap scroll, otherwise regulate the scroll
});

function regulateScroll(totalScroll) {
    if (multScrollTicks) { //if the user is scrolling multiple times
        const clockTick = setInterval(function () { //...then start looking for...
            if (!multScrollTicks) { //... when multScrollTicks is false..
                scrollAction(totalScroll); //... thenscrollAction with the new total totalScroll, instead of updating totalScroll all thje time.
                clearInterval(clockTick);
            }
        }, 20)
        return;
    } else if (!multScrollTicks) { //...Or if the user is only scrolling one tick at a time (weirdo)
        scrollAction(totalScroll); //... just bring totalScroll to the scrolling function
    }

    multScrollTicks = true;
    setTimeout(function () { //start counting down 100ms before setting wait to false.
        multScrollTicks = false;
    }, 100);
}

//Start the scrollWheelProcess, which is to scroll horizontally
function scrollAction(num) {
    stopScrollCheck();
    
    
    let scrollTo = Math.floor(window.scrollX += num); //Scroll to the position of the scrollX (scrollbar), plus the totalScroll.
    scrollTo < 0 ? scrollTo = 0 : scrollTo; //if scrollTo is below 0, set to 0.
    scrollTo > document.body.scrollWidth ? scrollTo = document.body.scrollWidth : scrollTo; //If you're scrolling beyond the end of the document, set the scrollTo to the end of the document. //TODO: this doesn't seem like the actual end of the page, for some reason.

    windowScrollTo(scrollTo, 'smooth')

    scrollTo = 0; //reset where you are scrolling to, as you are no longer scrolling
    totalScroll = 0; //reset the totalScroll, as you are no longer scrolling
}

//Determine if the page has stopped scrolling
const stopScrollCheck = () => { 
    isScrolling = true; //you're definitely scrolling here, dude, cause you're callin this function

    let tempPos = Math.ceil(window.visualViewport.pageLeft); //get the current page position, start a loop
    let posTick;

    const checkPos = setInterval(function () { 
        posTick = Math.ceil(window.visualViewport.pageLeft); //get the current page position, save it to a new var
        if (posTick === tempPos) { //check and see if tempPos and posTick are the same. If they are the same, then the window hasn't moved in 100ms, and the page has stopped scrolling
            isScrolling = false;
            window.scrollX = window.visualViewport.pageLeft; //set window.scrollX to the window.visualViewport.pageLeft, realigning them
            clearInterval(checkPos);
        }
        tempPos = Math.ceil(window.visualViewport.pageLeft); //update tempPos, start the loop in 50 seconds
    }, 100)
}

//start parallax scroll
let lastScroll = 0; //Used to determine which was the user is scrolling
let scrollDirection = ``; //Used to store which way the user is scrolling
let parallaxObj = document.querySelectorAll('.parallax-obj'); //Collect all objects to parallax scroll
let totalMove = []; //used to gather how far the parallax object has moved as you scroll

parallaxObj.forEach(() => {
    totalMove.push(0);
})

window.addEventListener("scroll", function () {
    throttle(() => {
        stopScrollCheck();
        whileScrolling();
    }, 200);
})

const whileScrolling = () => {
    //This checks to confirm if the scrollbar is the actual visualViewport Position, but only when the window is not moving
    // if (scrollSnapTo.length !== 0){
    //     const stopScrollCheck = setInterval(function () { //...then start looking for...
    //         if (!isScrolling && !scrollSnapBuffer) { //... when multScrollTicks is false..
    //             console.log(`${scrollSnapBuffer} is scrollSnapBuffer`)
    //             clearInterval(stopScrollCheck);
    //             scrollSnap();
    //         }
    //     }, 200)
    // }
    //start parallaxScroll sequence
    //TODO: Only if able to on the page
    if (document.readyState === "complete") { 
        let currentScroll = window.scrollX; //get current position
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

        //IS IN VIEW CODE -- turn into function?
        let objPos = parallaxObject.getBoundingClientRect().x + window.pageXOffset; //get Object Position
        let viewLeftBound = Math.floor(window.visualViewport.pageLeft); //get Left-side of Screen
        let viewRightBound = Math.floor(window.visualViewport.pageLeft + window.visualViewport.width); //get Right-side of Screen

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


let scrollSnapTo = document.querySelectorAll(`.portfolio-main-section`);
let scrollSnapLocations = [];
let curPos;
let nextPos;
let prevPos;

//get all Scroll Snap Values on the page.
//TODO: Does not work on resize... make it work on resize.
const getScrollSnapValues = () => {
    let snapAdjust = 185; //adjusts for the margin-left
    for (let i = 0; i < scrollSnapTo.length; i++){
        scrollSnapObj = scrollSnapTo[i];
        scrollSnapLocations.push(scrollSnapObj.getBoundingClientRect().x - snapAdjust)
    }
    console.log(scrollSnapLocations);
    curPos = scrollSnapLocations[0];
}

const scrollSnapPage = () => {
    return (Array.isArray(scrollSnapLocations) && scrollSnapLocations.length > 0);
}
  
const scrollSnap = (num) => {
    console.log(num);
    index = scrollSnapLocations.indexOf(curPos)
    if (index >= 0 && index < scrollSnapLocations.length - 1) {
        nextPos = scrollSnapLocations[index + 1];
        prevPos = scrollSnapLocations[index - 1];
    }
    
    (num > 0) ? goToNextSnap() : goToPreviousSnap();
    totalScroll = 0;
}

const goToNextSnap = () => {
    windowScrollTo(nextPos, 'smooth')
    curPos = scrollSnapLocations[index + 1];
    index = scrollSnapLocations.indexOf(curPos)
    if (index === -1) {
        index = 0;
        curPos = scrollSnapLocations[0];
    }
    console.log(`${curPos} is the curPos`);
    console.log(`${index} is the index`);
}

const goToPreviousSnap = () => {
    windowScrollTo(prevPos, 'smooth')
    curPos = scrollSnapLocations[index - 1];
}