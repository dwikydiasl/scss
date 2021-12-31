


// Section
var sections = $('section')
, nav = $('nav')
, nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
    bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');

      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
  var $el = $(this)
  , id = $el.attr('href');

  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 700);

  return false;
});

// =========== Header scroll ===========
$(function() {
  var header = $(".front_page");
  
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      header.addClass("scrolled");
    } 
    else {
      header.removeClass("scrolled");
    }
  });
  
 });

//========== Snow =============
var Snow = {
  el: "#snow", 
  density: 800000, // higher = fewer bits
  maxHSpeed: 2, // How much do you want them to move horizontally
  minFallSpeed: 2,
	canvas: null,
	ctx: null, 
  particles: [],
  colors: [],
  mp: 1,
  quit: false,
  init(){
    this.canvas = document.querySelector(this.el);
    this.ctx = this.canvas.getContext("2d");
    this.reset();
    requestAnimationFrame(this.render.bind(this));
    window.addEventListener("resize", this.reset.bind(this));
  },
  reset(){
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.particles = [];
    this.mp = Math.ceil(this.w * this.h / this.density);
		for(var i = 0; i < this.mp; i++)
		{
			var size = Math.random()*4+5;
			this.particles.push({
				x: Math.random()*this.w, //x-coordinate
				y: Math.random()*this.h, //y-coordinate
				w: size,
				h: size,
				vy: this.minFallSpeed + Math.random(), //density
				vx:(Math.random()*this.maxHSpeed) - this.maxHSpeed/2,
				fill: "#ffffff",
				s: (Math.random() * 0.2) - 0.1
			});
		}
  },
  
  render(){
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.particles.forEach((p,i) => {
      p.y += p.vy;
			p.x += p.vx;
			this.ctx.fillStyle = p.fill;
			this.ctx.fillRect(p.x, p.y, p.w, p.h);
      if(p.x > this.w+5 || p.x < -5 || p.y > this.h){
        p.x = Math.random()*this.w;
        p.y = -10;
			}
    });
    if(this.quit){
      return;
    }
		requestAnimationFrame(this.render.bind(this));
  },
  destroy(){
    this.quit = true;
  }
	
};

var confetti = Snow.init();


var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

// ========= Filter ============
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("actived");
    current[0].className = current[0].className.replace(" actived", "");
    this.className += " actived";
  });
}