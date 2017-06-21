// sagebrown.com
// 2017

// VARIABLES

      var currentImage = 0;
      //array of #title, images, and .next-up objects in gallery
      var pageImages = $(".row").children();

      // total number of objects
      var numImages = pageImages.length;

      //var containerLeft;

      // image margin in gallery, equal to CSS value
			var imgMargin = 50;

      // keeps track of browser window width
      var viewportWidth;

      // quasi arbitrary mobile breakpoint size
      var mobileBreak = 800;

// LISTENERS
$(document).ready(function() {
    $(window).on('resize scroll load', pageInit).trigger('scroll');
});

      // listen for keypress commands to advance images left / right
      $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
          if(currentImage > 0) {
            currentImage--;
            scrollTo(currentImage);
          }
        }
        else if(e.keyCode == 39) { // right
          if(currentImage < numImages-2) {
            currentImage++;
            scrollTo(currentImage);
          }
        }
      });


// FUNCTIONS

      // size, position, adjust page items
			function pageInit() {
        // hide the secondary-thumb elements
        $(".secondary-thumb").hide(); // hide secondary thumbnails for rotations

        // set viewportWidth variable to window outerWidth
        viewportWidth = window.outerWidth;

        // check to see if we're below the mobile breakpoint size
        if(viewportWidth < mobileBreak) {
          // if so, adjust the line height of homepage grid titles for mobile
          $(".title").each(function() {
            var lineHeight = $(this).parent().children("img:first-child").height()
            $(this).css("line-height", lineHeight + "px");
          });
        } else {
          // if we're not on mobile, set them to the height of the grid element
          $(".title").css("line-height", $(".title").height() + "px");
        }

        // adjust the .row width based on number of images in gallery
        // first check to see if .row exists
        if($(".row").length > 0) {
  				var totalWidth = 0;

          // loop through childre (images) in row and add width
          // this accounts for variable width of horizontal / vertical images
  				$(".row").children().each(function() {
  					totalWidth += $(this).width();
  				});

          // set .row width and add in extra space for the image margins
			  	$(".row").width(totalWidth + (numImages*imgMargin));

          // i think this is old, not sure what it's for
			  	// rowX = $(".row").position().left;

  			  	// set gallery title card size, based on image height
  			  	$("#title").width($(".row img").height()*.8);

          // set container left position, used for next / previous scrolling
          //containerLeft = $("#container").position().left;
          }
		  	}

        // handles rotating through images on homepage grid
        $.fn.rotate = function(){
          return this.each(function() {

            /* Cache element's children */
            var $children = $(this).children("img");

            /* Current element to display */
            var position = -1;

            /* IIFE */
            !function loop() {

                /* Get next element's position.
                 * Restarting from first children after the last one.
                 */
                position = (position + 1) % $children.length;

                /* Fade element */
                $children.eq(position).fadeIn(0).delay(300).fadeOut(0, loop);
            }();
          });

          // scrolls to a specific image
          function scrollTo(nextImg) {
            if(currentImage > 0) {
              // if we're past the beginning this sets the previous cursor to an arrow
              $("#previous").css("cursor", "w-resize")
            } else {
              // if we're at the start, #previous cursor is set to default
              $("#previous").css("cursor", "default")
            }

            if(currentImage == numImages-2) {
              // if we're at the end, #next cursor is set to default
              $("#next").css("cursor", "default")
            } else {
              // otherwise, it's an arrow
              $("#next").css("cursor", "e-resize")
            }

            // this is the main scroll action

            $("#container").animate({
              // gets the nextImg left position and scrolls the container to there
              scrollLeft: $(pageImages[nextImg]).position().left
            }, 500, function(){
              //do something after if needed
            });
          };

// CLICK EVENTS

      // next image object
      $("#next").click(function(){
        // checks to make sure we're not at the last image
        if(currentImage < numImages-2) {
          // adds to the currentImage variable
          currentImage++;
          // calls the function to scroll to the next image
          scrollTo(currentImage)
        }
      });

      $("#previous").click(function(){
        // checks to make sure we're beyond the start so we don't go backwards
        if(currentImage > 0) {
          // subtracts from the currentImage
          currentImage--;
          // calls the function to scroll to the variable
          scrollTo(currentImage)
        }
      });

// HOMEPAGE

      // grid element rollover on homepage
      $(".grid")
      .mouseover(function(){
        // if window size is above mobile breakpoint
        // should fix this to detect for touch moreso
        if(viewportWidth > mobileBreak) {
          // calls rotate function for .grid element
          $(this).rotate();
        }
      })
      .mouseout(function(){
        // if window size is above mobile breakpoint
        // should fix this to detect for touch moreso
        if(viewportWidth > mobileBreak) {
          // stops the fadeIn and fadeOut actions
         $( this ).find( "img" ).stop( true, true ).fadeOut();
         $( this ).find( "img" ).stop( true, true ).fadeIn();
         // hides the .secondary-thumb items
         $(this).children("img[class*='secondary']" ).hide();
       }
      });
    };
