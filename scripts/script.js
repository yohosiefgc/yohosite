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

let navToggleTracker = false; //TODO: I think this isn't right
let buttonDisable = false; //TODO: I think this isn't right
let leftNav = false;

window.onload = function () {
    setTimeout(() => {
        fadeIn();
        window.scrollTo(0, 0); //scroll to the beginning of the page on load
        scrollSnapHandler();
        contentColumnsHandler();
    }, 1); //delaying by 1 avoids any issues
}

const scrollSnapHandler = () => {
    //Only run this code if you're on a page labeled snapScroll. Requires snapScroll class in body.
    if (document.body.classList.contains('snapScroll')){
        getScrollSnapValues();
    }
}

const contentColumnsHandler = () => {
    //Only run this code if you're on a page labeled contentPage. Requires contentPage class in body.
    if (document.body.classList.contains('contentPage')) {
        handleContentColumns();
    }
}

addEventListener("resize", (e) => {
    scrollCheck = true;
    throttle(() => {
        console.log(`test123`);
        scrollSnapHandler();
        catchSnapDeadZone();
        ontentColumnsHandler();
    }, 1000);
});

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
const getNextHighestIndex = (num, arr) => {
    let i = arr.length;
    while (arr[--i] > num);
    return ++i; 
}

const getNextLowestIndex = (num, arr) => {
    let i = arr.length;
    while (arr[--i] > num);
    return ++i - 1; 
}

function removeBlanks(value) {
    return value !== '';
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

//////////////////////////////////////////
//Scroll Code
//////////////////////////////////////////

let isScrolling;
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

const scrollHandler = (i) => {
    scrollSnapPage() ? scrollSnap(i) : window.scrollBy(i, 'auto'); //if on a scrollSnap page, go to next module. If not, the scrollby a certain amount.
}

const linearScrollUp = () => {
    scrollHandler(linearMoveValue);
}
const linearScrollDown = () => {
    scrollHandler(-linearMoveValue);
}

window.addEventListener('wheel', (evt) => {
    scrollHandler(evt.deltaY);
});

//Determine if the page has stopped scrolling
const stopScrollCheck = () => {
    isScrolling = true; //you're definitely scrolling here, dude, cause you're callin this function

    let tempPos = Math.ceil(window.visualViewport.pageLeft); //get the current page position, start a loop
    let posTick;

    const checkPos = setInterval(function () { 
        posTick = Math.ceil(window.visualViewport.pageLeft); //get the current page position, save it to a new var
        if (posTick === tempPos) {
            isScrolling = false;
            window.scrollX = window.visualViewport.pageLeft; //set window.scrollX to the window.visualViewport.pageLeft, realigning them
            if (scrollSnapPage()) {
                catchSnapDeadZone();
            }
            clearInterval(checkPos);
        }
        tempPos = Math.ceil(window.visualViewport.pageLeft); //update tempPos, start the loop in 50 seconds
    }, 100)

    scrollCheck = true;
}

//////////////////////////////////////////
//Parallax Scroll Code
//////////////////////////////////////////

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
});

const whileScrolling = () => {
    if (document.readyState === "complete") { 
        parallaxScroll(directionScroll());
        slideIn();
    };
}

const directionScroll = () => {
    let currentScroll = window.scrollX;
    if (currentScroll > lastScroll) {
        lastScroll = currentScroll
        return scrollDirection = `right`;
    }
    if (currentScroll < lastScroll) {
        lastScroll = currentScroll
        return scrollDirection = `left`;
    }
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
            parallaxObject.style.opacity = (parallaxObject.dataset.opacity);
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

//Snap Scroll Page
//TODO: combine scrollSnapTo and scrollSnapLocations
let scrollSnapTo = document.querySelectorAll(`.portfolio-main-section`); //get snap locations
let scrollSnapLocations = []; //index of those locations
let index; //current index of scrollSnapLocations array
let curPos; //current pixel location on screen
let carouselNavBtn = document.querySelectorAll(`.carousel-nav-btn`); //Carousel Nav square in bottom-left
let carouselNextBtn = document.querySelector(`.carousel-next-btn`); //Carousel Nav Next button
let nextProjectText = document.querySelector('.next-project-change'); //Carousel text in top-right
let carouselTitle = document.querySelectorAll('.carousel-title'); //Title of the page, to update the nextProjectText as you scroll
const portfolioMainNextProject = document.querySelector('.portfolio-main-next-project'); // the entirety of the nextProject Text section, to make clickable
let scrollCheck = true;

const getScrollSnapValues = () => {
    if (scrollSnapTo.length != 0) {
        scrollSnapLocations.length = 0; //resets scrollSnapLocations on resize. Does nothing first time through
        let snapAdjust = 161; //adjusts for the margin-left
    
        for (let i = 0; i < scrollSnapTo.length; i++) {
            scrollSnapObj = scrollSnapTo[i];
            scrollSnapLocations.push(Math.round(scrollSnapObj.getBoundingClientRect().x + window.scrollX) - snapAdjust) //add left edge of object + window.scrollX to get the position it is from the left on the page. window.scrollX is necessary if you resize half-way through the document.
        }

        curPos = scrollSnapLocations[0]; //sets the current position
        index = scrollSnapLocations.indexOf(curPos); //sets the current index to 0
        snapGetCurrentPos();
        loadCarouselNav();
        nextProjectButton();
    }
}

const scrollSnapPage = () => {
    return (Array.isArray(scrollSnapLocations) && scrollSnapLocations.length > 0); //if it's a scrollSnapPage, return true
}

const snapGetCurrentPos = () => {
    curPos = scrollSnapLocations[0]; //sets the current position
    index = scrollSnapLocations.indexOf(curPos); //sets the current index to 0
}
  
const scrollSnap = (num) => {
    if (num > 0) {
        goToSnap(index + 1); //go forwards
    } else if (num <= 0 && index !== 0) {
        goToSnap(index - 1); //go backwards
    }
}

const goToSnap = (i) => {
    if (scrollCheck) { //scrollCheck prevents trackpads from spamming goToSnap
        scrollCheck = false
        if (scrollSnapLocations[i] === undefined) {
            i = 0; //if you're trying to scroll to an undefined location, you're at the end. Go to start.
        }
        window.scrollTo({
            left: scrollSnapLocations[i],
            behavior: 'smooth'
        }); //scroll to designated area
        curPos = scrollSnapLocations[i]; //update the current position to the new position

        index = scrollSnapLocations.indexOf(curPos); //update index
        
        if (index === -1) {
            index = 0; //if you scroll backwards from 0, don't update the index
        }

        updateNavSquareOpacity(index); //update the bottom-left nav to match
        updateNextProjectText(index); //update next project text to match
    }
}

const nextProjectButton = () => {
    portfolioMainNextProject.addEventListener('click', function handleClick() {
        goToSnap(index + 1);
    });
}

const loadCarouselNav = () => {
    carouselNextBtn.addEventListener('click', function handleClick() {
        goToSnap(index + 1);
    }); //go to the carouselNextBtn

    for (let i = 0; i < carouselNavBtn.length; i++) {
        carouselNavBtn[i].addEventListener('click', function handleClick() {
            //programmatically update "Next" carousel to the next position on the page
            goToSnap(i);
        })
    }
}

const updateNavSquareOpacity = (index) => {
    for (let i = 0; i < carouselNavBtn.length; i++) {
        (i === index) ? carouselNavBtn[i].style.opacity = 1 : carouselNavBtn[i].style.opacity = .7
    }
}

const updateNextProjectText = (index) => {
    (carouselTitle[index + 1] === undefined) ? nextProjectText.innerText = carouselTitle[0].innerText : nextProjectText.innerText = carouselTitle[index + 1].innerText; //if there is no carousel title next, you're at the end, so loop. Otherwise, go to the next project title;
}

const catchSnapDeadZone = () => {
    //detect if window.scrollX is within 10 pixels of the includes
    console.log(scrollSnapLocations);
    let position = Math.round(window.scrollX)

    if (!scrollSnapLocations.includes(position) ) {
        let snapScrollDirection = directionScroll();
        
        if (snapScrollDirection === `left`) {
            index = getNextLowestIndex(window.scrollX, scrollSnapLocations)
            goToSnap(index);
        } else if (snapScrollDirection === `right`) {
            index = getNextHighestIndex(window.scrollX, scrollSnapLocations)
            goToSnap(index);
        }
    }
}

//Start Blog Code
let bodyParagraphContainers;
let bodyParagraphs;
let initialContentUnfiltered; //used to store the initial content in the first paragraph
let initialContentFiltered; //used to store the filtered content
let paragraphHeight = []; //height of the paragraph
let containerHeight = []; //height of the container

const getColumns = () => {
    bodyParagraphContainers = document.querySelectorAll('.body-copy-container');
    bodyParagraphs = document.querySelectorAll('.body-copy');
}

const handleContentColumns = () => {
    getColumns();
    if (bodyParagraphContainers) { 
        calcContentColumnHeight();
        applyNewContentHeight();
        // removeUnusedColumns();
    }
}

const calcContentColumnHeight = () => {
    for (let i = 0; i < bodyParagraphContainers.length; i++){
        const bottomMargin = 100;
        
        let positionFromTop = bodyParagraphContainers[i].getBoundingClientRect().y;
        let windowHeight = window.innerHeight;
        let heightMinusMargin = windowHeight - bottomMargin;

        let finalColumnHeight = heightMinusMargin - positionFromTop;
        
        bodyParagraphContainers[i].style.height = finalColumnHeight + 'px';
        containerHeight[i] = bodyParagraphContainers[i].getBoundingClientRect().height;
    };
}

const applyNewContentHeight = () => {
    if (!initialContentUnfiltered) {
        initialContentUnfiltered = (bodyParagraphs[0].innerHTML).split(' '); //store unfiltered content
        initialContentFiltered = initialContentUnfiltered.filter(removeBlanks); //store the base content, do not alter this content.
    }
    
    let content = [...initialContentFiltered];
    let excludedContent = [];
    bodyParagraphs[0].innerHTML = content.join(' '); //always set the first body paragraph to be the content, for resizing purposes.

    for (let i = 0; i < bodyParagraphs.length; i++){
        paragraphHeight[i] = bodyParagraphs[i].getBoundingClientRect().height;
    } //get the paragraph height of each body paragraph
    
    for (let i = 0; i < bodyParagraphs.length; i++){
        while (paragraphHeight[i] > containerHeight[i]) {
            lastWord = content.pop(); //remove the last word from the content
            console.log(lastWord);
            excludedContent.unshift(lastWord); //temporarily store the excludedContent to be joined into the column
            bodyParagraphs[i].innerHTML = content.join(' '); //input the content back
            paragraphHeight[i] = bodyParagraphs[i].getBoundingClientRect().height; //set paragraph height to the current height of the pargraph
        }

        if (bodyParagraphs[i + 1] === undefined && lastWord !== '') {
            // console.log(`generating new column`);
            generateNewColumn(); //make a new column
            getColumns(); //update bodyParagraphs
        }
        
        if (bodyParagraphs[i + 1] !== undefined) {
            // console.log(`inserting excludedContent into next Body Paragraph`);
            bodyParagraphs[i + 1].innerHTML = excludedContent.join(' '); //add the excludedContent to the next column once finished
            paragraphHeight[i + 1] = bodyParagraphs[i + 1].getBoundingClientRect().height;
            calcContentColumnHeight();
        }
        
        lastWord = ''; //set lastWord to blank
        content = excludedContent; // set the content to the new content placed into the column afterwards
        excludedContent = []; //there is no more excludedContent
    }
}

const generateNewColumn = () => {
    let overFlowColumn = document.querySelectorAll(`.overflow-column`);
    overFlowColumn[overFlowColumn.length - 1].insertAdjacentHTML('afterEnd', `
        <section class="portfolio-column content-container content-six-column overflow-column">
            <div class="content-full-height">
                <div class="body-copy-container">
                <p class="body-copy">
                </p>
                </div>
            </div>
        </section>
    `);
}

// const removeUnusedColumns = () => {
//     for (let i = 0; i < bodyParagraphs.length; i++) {
//         if (bodyParagraphs[i].innerHTML === undefined){
//             console.log(`nope`);
//         }
//     }
// }