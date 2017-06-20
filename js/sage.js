// sagebrown.com
// 2017

      var currentImage = 0;
			var numImages = $(".row").children().length;
      var pageImages = $(".row").children();
      var containerLeft;
			var imgMargin = 50;
      var viewportWidth;
      var mobileBreak = 800;

			//$(document).ready(setWidth());
			$(window).on('load', function() {
        if(viewportWidth > mobileBreak) {
          setWidth();
          $(".title").css("line-height", $(".title").height() + "px");
        }
				//jQuery.easing.def = "easeOutQuad";
    if(viewportWidth < mobileBreak) {

        $(".title").each(function() {
          var lineHeight = $(this).parent().children("img:first-child").height()
          $(this).css("line-height", lineHeight + "px");
          console.log(lineHeight)
        });
        }
        $(".secondary-thumb").hide();
			});

			$(window).on('resize', function() {
        if(viewportWidth > mobileBreak) {
  				setWidth();
          $(".title").css("line-height", $(".title").height() + "px");
        }
        if(viewportWidth < mobileBreak) {

            $(".title").each(function() {
              var lineHeight = $(this).parent().children("img:first-child").height()
              $(this).css("line-height", lineHeight + "px");
              console.log(lineHeight)
            });
            }
			});

			function setWidth() {
        viewportWidth = window.outerWidth;

        if($(".row").length > 0) {
  				var totalWidth = 0;
  				$(".row").children().each(function() {
  					totalWidth += $(this).width();
  				});

  			  	$(".row").width(totalWidth + (numImages*imgMargin));
  			  	console.log($(".row").width());
  			  	rowX = $(".row").position().left;

  			  	//set title size
  			  	$("#title").width($(".row img").height()*.8);

          //set container left position
            containerLeft = $("#container").position().left;
            console.log("setWidth");
          }
		  	}

			$("#getPos").click(function() {
				navWidth = $("#nav").outerWidth();
				console.log(navWidth);

			});

/*
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

      $("#next").click(function(){
        if(currentImage < numImages-2) {
          currentImage++;
          scrollTo(currentImage)
        }
      });

      $("#previous").click(function(){
        if(currentImage > 0) {
          currentImage--;
          scrollTo(currentImage)
        }
      });

      function scrollTo(where) {
        if(currentImage > 0) {
          $("#previous").css("cursor", "w-resize")
        } else {
          $("#previous").css("cursor", "default")
        }

        if(currentImage == numImages-2) {
          $("#next").css("cursor", "default")
        } else {
          $("#next").css("cursor", "e-resize")
        }

        $("#container").animate({
					scrollLeft: $(pageImages[where]).position().left
				}, 500, function(){
					//do something
  			});
      }

      $("html").scroll(function(){
        console.log(true);
      });
*/
      $(".grid")
      .mouseover(function(){
        if(viewportWidth > mobileBreak) {
          $(this).rotate();
        }
      })
      .mouseout(function(){
        if(viewportWidth > mobileBreak) {
         $( this ).find( "img" ).stop( true, true ).fadeOut();
         $( this ).find( "img" ).stop( true, true ).fadeIn();
         $(this).children("img[class*='secondary']" ).hide();
       }
      });

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
      };


      //KEEP
      //click image to advance
      /*
			$(".row>img").click(function(){
				$("#container").animate({
					scrollLeft: $(this).position().left
				}, 500, function(){
					if($(this).position().left == containerLeft) {
            console.log($(this))
          }
			});
    });*/



			/*$("#title").click(function(){
				$("#container").animate({
					scrollLeft: $("#title").width()+ 50
				}, 500, function(){
					console.log("done");
			});
			}); */
