(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicScroll=t()}}((function(){return function t(n,o,e){function r(i,c){if(!o[i]){if(!n[i]){var f="function"==typeof require&&require;if(!c&&f)return f(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var s=o[i]={exports:{}};n[i][0].call(s.exports,(function(t){return r(n[i][1][t]||t)}),s,s.exports,t,n,o,e)}return o[i].exports}for(var u="function"==typeof require&&require,i=0;i<e.length;i++)r(e[i]);return r}({1:[function(t,n,o){n.exports=function(t){var n=2.5949095;return(t*=2)<1?t*t*((n+1)*t-n)*.5:.5*((t-=2)*t*((n+1)*t+n)+2)}},{}],2:[function(t,n,o){n.exports=function(t){var n=1.70158;return t*t*((n+1)*t-n)}},{}],3:[function(t,n,o){n.exports=function(t){var n=1.70158;return--t*t*((n+1)*t+n)+1}},{}],4:[function(t,n,o){var e=t("./bounce-out");n.exports=function(t){return t<.5?.5*(1-e(1-2*t)):.5*e(2*t-1)+.5}},{"./bounce-out":6}],5:[function(t,n,o){var e=t("./bounce-out");n.exports=function(t){return 1-e(1-t)}},{"./bounce-out":6}],6:[function(t,n,o){n.exports=function(t){var n=t*t;return t<4/11?7.5625*n:t<8/11?9.075*n-9.9*t+3.4:t<.9?4356/361*n-35442/1805*t+16061/1805:10.8*t*t-20.52*t+10.72}},{}],7:[function(t,n,o){n.exports=function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},{}],8:[function(t,n,o){n.exports=function(t){return 1-Math.sqrt(1-t*t)}},{}],9:[function(t,n,o){n.exports=function(t){return Math.sqrt(1- --t*t)}},{}],10:[function(t,n,o){n.exports=function(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}},{}],11:[function(t,n,o){n.exports=function(t){return t*t*t}},{}],12:[function(t,n,o){n.exports=function(t){var n=t-1;return n*n*n+1}},{}],13:[function(t,n,o){n.exports=function(t){return t<.5?.5*Math.sin(13*Math.PI/2*2*t)*Math.pow(2,10*(2*t-1)):.5*Math.sin(-13*Math.PI/2*(2*t-1+1))*Math.pow(2,-10*(2*t-1))+1}},{}],14:[function(t,n,o){n.exports=function(t){return Math.sin(13*t*Math.PI/2)*Math.pow(2,10*(t-1))}},{}],15:[function(t,n,o){n.exports=function(t){return Math.sin(-13*(t+1)*Math.PI/2)*Math.pow(2,-10*t)+1}},{}],16:[function(t,n,o){n.exports=function(t){return 0===t||1===t?t:t<.5?.5*Math.pow(2,20*t-10):-.5*Math.pow(2,10-20*t)+1}},{}],17:[function(t,n,o){n.exports=function(t){return 0===t?t:Math.pow(2,10*(t-1))}},{}],18:[function(t,n,o){n.exports=function(t){return 1===t?t:1-Math.pow(2,-10*t)}},{}],19:[function(t,n,o){n.exports={backInOut:t("./back-in-out"),backIn:t("./back-in"),backOut:t("./back-out"),bounceInOut:t("./bounce-in-out"),bounceIn:t("./bounce-in"),bounceOut:t("./bounce-out"),circInOut:t("./circ-in-out"),circIn:t("./circ-in"),circOut:t("./circ-out"),cubicInOut:t("./cubic-in-out"),cubicIn:t("./cubic-in"),cubicOut:t("./cubic-out"),elasticInOut:t("./elastic-in-out"),elasticIn:t("./elastic-in"),elasticOut:t("./elastic-out"),expoInOut:t("./expo-in-out"),expoIn:t("./expo-in"),expoOut:t("./expo-out"),linear:t("./linear"),quadInOut:t("./quad-in-out"),quadIn:t("./quad-in"),quadOut:t("./quad-out"),quartInOut:t("./quart-in-out"),quartIn:t("./quart-in"),quartOut:t("./quart-out"),quintInOut:t("./quint-in-out"),quintIn:t("./quint-in"),quintOut:t("./quint-out"),sineInOut:t("./sine-in-out"),sineIn:t("./sine-in"),sineOut:t("./sine-out")}},{"./back-in":2,"./back-in-out":1,"./back-out":3,"./bounce-in":5,"./bounce-in-out":4,"./bounce-out":6,"./circ-in":8,"./circ-in-out":7,"./circ-out":9,"./cubic-in":11,"./cubic-in-out":10,"./cubic-out":12,"./elastic-in":14,"./elastic-in-out":13,"./elastic-out":15,"./expo-in":17,"./expo-in-out":16,"./expo-out":18,"./linear":20,"./quad-in":22,"./quad-in-out":21,"./quad-out":23,"./quart-in":25,"./quart-in-out":24,"./quart-out":26,"./quint-in":28,"./quint-in-out":27,"./quint-out":29,"./sine-in":31,"./sine-in-out":30,"./sine-out":32}],20:[function(t,n,o){n.exports=function(t){return t}},{}],21:[function(t,n,o){n.exports=function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)}},{}],22:[function(t,n,o){n.exports=function(t){return t*t}},{}],23:[function(t,n,o){n.exports=function(t){return-t*(t-2)}},{}],24:[function(t,n,o){n.exports=function(t){return t<.5?8*Math.pow(t,4):-8*Math.pow(t-1,4)+1}},{}],25:[function(t,n,o){n.exports=function(t){return Math.pow(t,4)}},{}],26:[function(t,n,o){n.exports=function(t){return Math.pow(t-1,3)*(1-t)+1}},{}],27:[function(t,n,o){n.exports=function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},{}],28:[function(t,n,o){n.exports=function(t){return t*t*t*t*t}},{}],29:[function(t,n,o){n.exports=function(t){return--t*t*t*t*t+1}},{}],30:[function(t,n,o){n.exports=function(t){return-.5*(Math.cos(Math.PI*t)-1)}},{}],31:[function(t,n,o){n.exports=function(t){var n=Math.cos(t*Math.PI*.5);return Math.abs(n)<1e-14?1:1-n}},{}],32:[function(t,n,o){n.exports=function(t){return Math.sin(t*Math.PI/2)}},{}],33:[function(t,n,o){n.exports=function(t,n){n||(n=[0,""]),t=String(t);var o=parseFloat(t,10);return n[0]=o,n[1]=t.match(/[\d.\-\+]*\s*(.*)/)[1]||"",n}},{}],34:[function(t,n,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.create=void 0;var e=u(t("parse-unit")),r=u(t("eases"));function u(t){return t&&t.__esModule?t:{default:t}}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var c,f,a,s=[],p="undefined"!=typeof window,l=function(){return(document.scrollingElement||document.documentElement).scrollTop},d=function(){return window.innerHeight||window.outerHeight},m=function(t){return!1===isNaN((0,e.default)(t)[0])},b=function(t){var n=(0,e.default)(t);return{value:n[0],unit:n[1]}},h=function(t){return null!==String(t).match(/^[a-z]+-[a-z]+$/)},w=function(t,n){return!0===t?n.elem:t instanceof HTMLElement==!0?n.direct:n.global},y=function(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l(),e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:d(),r=n.getBoundingClientRect(),u=t.match(/^[a-z]+/)[0],i=t.match(/[a-z]+$/)[0],c=0;return"top"===i&&(c-=0),"middle"===i&&(c-=e/2),"bottom"===i&&(c-=e),"top"===u&&(c+=r.top+o),"middle"===u&&(c+=r.top+o+r.height/2),"bottom"===u&&(c+=r.top+o+r.height),"".concat(c,"px")},v=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l(),o=t.getData(),e=o.to.value-o.from.value,r=n-o.from.value,u=r/(e/100),i=Math.min(Math.max(u,0),100),c=w(o.direct,{global:document.documentElement,elem:o.elem,direct:o.direct}),f=Object.keys(o.props).reduce((function(t,n){var e=o.props[n],r=e.from.unit||e.to.unit,u=e.from.value-e.to.value,c=e.timing(i/100),f=e.from.value-u*c,a=Math.round(1e4*f)/1e4;return t[n]=a+r,t}),{}),a=u>=0&&u<=100,s=u<0||u>100;return!0===a&&o.inside(t,u,f),!0===s&&o.outside(t,u,f),{elem:c,props:f}},x=function(t,n){Object.keys(n).forEach((function(o){return function(t,n){t.style.setProperty(n.key,n.value)}(t,{key:o,value:n[o]})}))};o.create=function(t){var n=null,o=!1,e={isActive:function(){return o},getData:function(){return n},calculate:function(){n=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(t=Object.assign({},t)).inside&&(t.inside=function(){}),null==t.outside&&(t.outside=function(){}),null==t.direct&&(t.direct=!1),null==t.track&&(t.track=!0),null==t.props&&(t.props={}),null==t.from)throw new Error("Missing property `from`");if(null==t.to)throw new Error("Missing property `to`");if("function"!=typeof t.inside)throw new Error("Property `inside` must be undefined or a function");if("function"!=typeof t.outside)throw new Error("Property `outside` must be undefined or a function");if("boolean"!=typeof t.direct&&t.direct instanceof HTMLElement==0)throw new Error("Property `direct` must be undefined, a boolean or a DOM element/node");if(!0===t.direct&&null==t.elem)throw new Error("Property `elem` is required when `direct` is true");if("boolean"!=typeof t.track)throw new Error("Property `track` must be undefined or a boolean");if("object"!==i(t.props))throw new Error("Property `props` must be undefined or an object");if(null==t.elem){if(!1===m(t.from))throw new Error("Property `from` must be a absolute value when no `elem` has been provided");if(!1===m(t.to))throw new Error("Property `to` must be a absolute value when no `elem` has been provided")}else!0===h(t.from)&&(t.from=y(t.from,t.elem)),!0===h(t.to)&&(t.to=y(t.to,t.elem));return t.from=b(t.from),t.to=b(t.to),t.props=Object.keys(t.props).reduce((function(n,o){var e=Object.assign({},t.props[o]);if(!1===m(e.from))throw new Error("Property `from` of prop must be a absolute value");if(!1===m(e.to))throw new Error("Property `from` of prop must be a absolute value");if(e.from=b(e.from),e.to=b(e.to),null==e.timing&&(e.timing=r.default.linear),"string"!=typeof e.timing&&"function"!=typeof e.timing)throw new Error("Property `timing` of prop must be undefined, a string or a function");if("string"==typeof e.timing&&null==r.default[e.timing])throw new Error("Unknown timing for property `timing` of prop");return"string"==typeof e.timing&&(e.timing=r.default[e.timing]),n[o]=e,n}),{}),t}(t)},update:function(){var t=v(e),n=t.elem,o=t.props;return x(n,o),o},start:function(){o=!0},stop:function(){o=!1},destroy:function(){s[u]=void 0}},u=s.push(e)-1;return e.calculate(),e},!0===p?(!function t(n,o){var e=function(){requestAnimationFrame((function(){return t(n,o)}))},r=function(t){return t.filter((function(t){return null!=t&&t.isActive()}))}(s);if(0===r.length)return e();var u=l();if(o===u)return e();o=u,r.map((function(t){return v(t,u)})).forEach((function(t){var n=t.elem,o=t.props;return x(n,o)})),e()}(),window.addEventListener("resize",(c=function(){(function(t){return t.filter((function(t){return null!=t&&t.getData().track}))})(s).forEach((function(t){t.calculate(),t.update()}))},f=50,a=null,function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];clearTimeout(a),a=setTimeout((function(){return c.apply(void 0,n)}),f)}))):console.warn("basicScroll is not executing because you are using it in an environment without a `window` object")},{eases:19,"parse-unit":33}]},{},[34])(34)}));
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
const basicScroll = require('basicscroll');

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
}

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
    nav.style.backgroundColor = ('rgba(35,31,32,.95)'); // ??? WHY?

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

const calcImgRightEdge = () => {
    portfolioImg[1].offsetWidth
}

const generatePortfolioImgSquare = (topRand, leftRand) => {    
    let runCount = 0
    for (let i = 0; i < portfolioImgSquare.length; i++) {   
        const result = randomGenerationSquare(topRand, leftRand, runCount);
        console.log(result);
        runCount++
        let plusOrMinus = Math.round(Math.random()) * 2 - 1; //TODO: repeat var

        portfolioImgSquare[i].style.top = `${result.top}px`;

        plusOrMinus === 1 ? portfolioImgSquare[i].style.left = `${result.leftOrRight}px` : portfolioImgSquare[i].style.right = `${result.leftOrRight}px`;
        portfolioImgSquare[i].style.width = `${result.width}px`;
        portfolioImgSquare[i].style.height = `${result.height}px`;
        portfolioImgSquare[i].style.backgroundColor = ('rgba(255, 255, 255, 0.04)');

        // if (portfolioImgSquare[i].getBoundingClientRect().right < portfolioImg[i].getBoundingClientRect().right + 50) {
        //     console.log(`portfolioImgSquare is too far to the right!`);
        // }
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
        console.log(`Adjusting leftOrRight... from min value`);
        leftOrRight === -20;
        console.log(`${leftOrRight} is the value of leftOrRight`)
    }
    else if (leftOrRight > 0 && leftOrRight < 20) {
        console.log(`Adjusting leftOrRight...`);
        leftOrRight === 20;
        console.log(`${leftOrRight} is the value of leftOrRight`)
    }

    const height = portfolioImg[runCount].getBoundingClientRect().height + 50 - (Math.floor(Math.min(Math.random() * 200), min));
    const width = portfolioImg[runCount].getBoundingClientRect().width - (Math.floor(Math.min(Math.random() * 200), min));
    coords.top = top;
    coords.leftOrRight = leftOrRight;
    coords.height = height;
    coords.width = width;
    console.log(`this ran ${runCount} times`);
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
    switch (event.key) {
        case "ArrowUp":
            input.onkeydown("ArrowLeft");
            
            break;
        case "ArrowDown":
            break;
    }
});

window.addEventListener('wheel', (evt) => {
    scroll = true;
    startScrollWheelEvent(evt);
});

function startScrollWheelEvent(evt){
    //get the total scroll from the mousescroll event
    totalScroll += evt.deltaY;
    totalScroll += evt.deltaX; //TODO: Fix snap on x axis mouse
    console.log(`scrolling`);
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
    console.log(window.scrollX);
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
            console.log(isScrolling);
            console.log(window.visualViewport.pageLeft);
            clearInterval(checkEqual);
        }
        //if it is OUTSIDE the bounds, set the visualViewport to the actual value of window.scrollX and try again
        else {
            window.visualViewport.pageLeft = window.scrollX;
        }
    }, 50)
}

window.addEventListener("scroll", function () {
    
    if (!isScrolling){
        window.scrollX = window.visualViewport.pageLeft;
    }
    const distance = window.scrollX;

    //bucket everything with a specific class as a portfolio-bg scroll
    portfolioImgSquare[1].style.transform = `translateX(${distance * 0.3}px)`
})
},{"basicscroll":1}]},{},[2]);
