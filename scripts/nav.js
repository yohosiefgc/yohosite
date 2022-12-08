document.write(`<nav>
<div id="sidebar">
  <div class="sidebar-nav-border"></div>
  <div id="sidebar-nav-icon">
    <div class="rotation-wrapper-inner">
      <!--Navigation icon svg data stored 1:1 in navigation.svg-->
      <svg id="navtoggle" x="0px" y="0px"
      viewBox="0 0 43.69 43.8" style="enable-background:new 0 0 43.69 43.8;">
        <g>
          <path class="sidebar-nav-icon-border" d="M43.31,21.9c0,11.89-9.63,21.52-21.52,21.52c-28.55-1.13-28.54-41.91,0-43.04 C33.67,0.38,43.31,10.02,43.31,21.9L43.31,21.9z"/>
          <line class="sidebar-nav-icon-plus sidebar-nav-icon-line-1" x1="22" y1="14" x2="22" y2="30"/>
          <line class="sidebar-nav-icon-plus sidebar-nav-icon-line-2" x1="30" y1="22" x2="14" y2="22"/>
        </g>
      </svg>
    </div>
  </div>
  <div id="name" class="nav-alt-toggle">
    <div class="rotation-wrapper-inner">
      <h3 class="title-hover fade-in-start"><a href="index.html">Yohosie</a></h3><!--TODO: Kern font-->
      <h3 class="title-default"><a href="index.html">Yohosie</a></h3> <!--TODO: Kern font-->
    </div>
  </div>
  <div id="page-title" class="nav-alt-toggle">
    <div class="rotation-wrapper-inner">
      <button class="monotype" type="button" onclick="location.href='#';"><span>portfolio</span></button>
    </div>
  </div>
</div>

<!--PORTFOLIO START-->
<div id="navigation">
  <div id="navigation-container" class="container">
    <div class="row">
      <div class="one column">
        &nbsp; <!-- nav fill -->
      </div>
      <div class="four columns">
        <div class="navigation-main-container">
          &nbsp; <!-- used to stop animation snapping -->
          <ol class="navigation-main">
            <li class="navigation-li navigation-li-first">
              <a href="index.html"><span>Portfolio</span></a>
              <svg class="navigation-arrow">
                <use xlink:href="#arrow"></use>
              </svg>
              <svg class="bold-underline"><rect></svg>
            </li>
            <li class="navigation-li navigation-li-second">
              <a href="#"><span>About</span></a>
              <svg class="navigation-arrow">
                <use xlink:href="#arrow"></use>
              </svg>
              <svg class="bold-underline"><rect></svg>
            </li>
            <li class="navigation-li navigation-li-third">
              <a href="#"><span>Gaming</span></a>
              <svg class="navigation-arrow">
                <use xlink:href="#arrow"></use>
              </svg>
              <svg class="bold-underline"><rect></svg>
            </li>
            <li class="navigation-li navigation-li-fourth">
              <a href="#"><span>Blog</span></a>
              <svg class="navigation-arrow">
                <use xlink:href="#arrow"></use>
              </svg>
              <svg class="bold-underline"><rect></svg>
            </li>
            <li class="navigation-li navigation-li-fifth">
              <a href="#"><span>Contact</span></a>
              <svg class="navigation-arrow">
                <use xlink:href="#arrow"></use>
              </svg>
              <svg class="bold-underline"><rect></svg>
            </li>
          </ol>
          <ol class="navigation-contact">
            <li><a href="#"><span>dawn@dawnhosie.com</span></a></li>
            <li class="last"> <a href="#"><span>twitter</span></a></li>
          </ol>
          <ol class="navigation-rectangles">
            <li><svg><rect></svg></li>
            <li><svg><rect></svg></li>
            <li><svg><rect></svg></li>
            <li><svg><rect></svg></li>
            <li><svg><rect></svg></li>
          </ol>
        </div>
      </div>
      <div class="seven columns navigation-diagonal-lines">
          <svg class="navigation-svg-container">
            <polygon points="5,-100 5,1200 1200,1800 1800, -100">
            </polygon> <!-- TODO: Change to a rect -->
          </svg>
      </div>
    </div>
  </div>
</div>
</nav >
  `);