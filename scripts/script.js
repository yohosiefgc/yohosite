const basicScroll = require('basicscroll')

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
        console.log("standard nav close");
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


// Parallax Scroll Code

// document.querySelectorAll('.portfolio-parallax').forEach((elem) => {
//     const modifier = elem.getAttribute('data-modifier')
//     const parallaxScroll = basicScroll.create({
//       elem: elem,
//       from: 0.1,
//       to: .99,
//       props: {
//         '--translateX': {
//           from: '0',
//           to: `${ 10 * modifier }px`,
//           direct: true
//         }
//       }
//     });
//     parallaxScroll.start();
// })

const parallaxScroll = basicScroll.create({
    elem: document.querySelector('.parallax'),
    from: 'bottom-bottom',
    to: 'top-middle',
    props: {
        '--o': {
            from: 0,
            to: 2000
        }
    }
})
console.log(parallaxScroll);
parallaxScroll.start();

