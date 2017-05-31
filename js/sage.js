var squares = [];
var count = 0;
//var current = squares[0]; //current image-frame .place- class
var direction;
var lastScrollTop = 0;
var scrollFactor = 0;

//create array of image squares
$(".square").each(function(){
	squares.push($(this));
});



//listen for arrow keypress
//down = 40
//right = 39
//up = 38
//left = 37

$('html').keydown(function(e){
	//make sure we're beyond the first frame 
	if(count !== squares.length-1) {
	    if(e.keyCode == 40 || e.keyCode == 39) {
	    	scrollContinue();
	    	return false;
	    }
	}

	if(count > 0) {
		//make sure we're not at frame 1
	    if(e.keyCode == 38 || e.keyCode == 37) {
	    	count = count-2;
	    	scrollContinue();
	    }
    }
});

$(window).scroll(function(e){
	 checkCurrent();
	// checkDirection();


	 //console.log( $(current+">h2").position() );
	 //console.log("."+current+">h2").css(top);
	 if(direction == "up") {
	 	$("."+current).css("top", "+="+scrollFactor/4);  
	 } 
	 if(direction == "down") {
	 	$("."+current).css("top", "-="+scrollFactor); 
	 }

});

function checkCurrent() {
	//loop through .image-frame and check position
	$(".square").each(function (index) {
	 	var distance = ($($(this)).offset().top - $(window).scrollTop());
		if(distance < 100) {
		 	current = $(this);
		 	count = index;
		}
    });         
}

function checkDirection () {
	var st = $(this).scrollTop();
	if (st > lastScrollTop){
       direction = "down";
   } else {
      direction ="up";
   }
   lastScrollTop = st;
   //console.log(direction);
}

function scrollContinue() {
	count++;
    $('html, body').animate({
        scrollTop: $("."+squares[count]).offset().top
    }, 500);
}
