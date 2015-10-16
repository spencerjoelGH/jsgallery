
(function ( $ ) {
	var globalSelf;
	var methods = {
		
		show : function(self){
			globalSelf = self;
			setTimeout(function(){animateUI("in")}, 300);
			//globalSelf.css("display","block");
		},
		
		hide : function(self){
			$("*").removeClass("selected_slider_div");
			globalSelf = self;
			animateUI("out");
			//$(globalSelf).css("display","none");
			
		}
		
	}
	
	function createGallery(self){
		var html = '<div id="jsgall_prevButton" class="gallery-arrow arrow-left start_pos"><i class="fa fa-chevron-left"></i></div>';
			html += '<div id="jsgall_imageContainer" ><img id="jsgallery_displayed_image" class="start_size">';
			html += '<div id="jsgall_htmloverlay"><span id="customHTMLFooter"></span></div></div>';
			html += '<div id="jsgall_nextButton" class="gallery-arrow arrow-right start_pos"><i class="fa fa-chevron-right"></i></div>';
			html += '<div id="jsgall_close"><i class="fa fa-times"></i></div>'; 
			
			
			
			$(self).html(html);
		
			
			
			
	}
	
	function loadNextImage(){
		    	if(config.currentImage == images.length - 1) {
			    		config.currentImage = 0;
			    	} else {
				    	config.currentImage ++;
				    }
					showSelectedImage();
	    	}
	    	
	function loadPrevImage(){
    	if(config.currentImage == 0) { 
	    		config.currentImage = images.length - 1;
	    	} else {
				config.currentImage --;
    		}
			showSelectedImage();
	}
	
	function showSelectedImage(){
		if(images[config.currentImage]){
			$('#jsgall_imageContainer img').attr("src", images[config.currentImage].src);
			
			var strHTML = config.customHTMLFooter;
			strHTML = strHTML.replace("%FB%", images[config.currentImage].fb);
			strHTML = strHTML.replace("%TW%", images[config.currentImage].tw);
			strHTML = strHTML.replace("%PIN%", images[config.currentImage].pin);
			
			$('#customHTMLFooter').html(strHTML);
		} 
	}
	
	
	function animateUI(dir){
		
		//Animate arrows
		if(dir == "in"){
			//globalSelf.css("background","rgba(0,0,0,0)");
			globalSelf.css("display","block");
			
			//$(globalSelf).css("background","rgba(0,0,0,0.7)");

			
			setTimeout(function(){
					$( "img#jsgallery_displayed_image" ).width("auto");
					var imgWidth = $('img#jsgallery_displayed_image').width();
					$( "img#jsgallery_displayed_image" ).width("0");
					$( "img#jsgallery_displayed_image" ).animate({
						width: imgWidth +"px",
						opacity : 1
					  }, 200,  function() {
						   $( "img#jsgallery_displayed_image" ).width("auto");
						   $('img#jsgallery_displayed_image').removeClass("start_size");
					  });
									
					$('.gallery-arrow').removeClass("start_pos");
				
				}, 100); 
				
				$( "#jsgall_close" ).animate({
						opacity : 1
					  }, 100, function() {
					  
			});
			
		}
		if(dir == "out"){
			$('.gallery-arrow').addClass("start_pos");
			$( "img#jsgallery_displayed_image" ).animate({
						width: "0",
						opacity : 0
					  }, 200, function() {
					  $('img#jsgallery_displayed_image').addClass("start_size");
			});
			
			$( "#jsgall_close" ).animate({
						opacity : 0
					  }, 200, function() {
					  
			});
					
			setTimeout(function(){
				$(globalSelf).css("display","none");
				}, 300); 
		}
		
		
	}
	
	function createImagesArray(){
		$.each($(config.imgSelector), function(index, element){
		             if(element.src) {
			          var image = {};
			          image.src = element.src;
			          if(element.alt && element.alt != "") image.alt = element.alt;
			          if(element.width != 0) image.width = element.width;
					  if(element.height != 0) image.height = element.height;
					  if($(element).data('fb')) image.fb = $(element).data('fb');
					  if($(element).data('tw')) image.tw = $(element).data('tw');
					  if($(element).data('pin')) image.pin = $(element).data('pin');
			          images.push(image);
			          }
	            });
	}
	
	var images = [];
	var config = {};
	var originalSelector;
    
	
$.fn.jsgallery = function(optionsOrMethod) {
			
			
			
			var newDiv = $('<div></div>').addClass("jsgallery-container");
			$("body").append(newDiv);

			var self = newDiv;
			config = {
				imgSelector : "img",
				currentImage : 0,
				customHTMLFooter : "",
				bgClickClose : true
			};
					
			if(typeof optionsOrMethod === "object"){
				if(optionsOrMethod.imgSelector) config.imgSelector = optionsOrMethod.imgSelector;
				if(optionsOrMethod.startOffset) config.currentImage = optionsOrMethod.startOffset;	
				if(optionsOrMethod.customHTMLFooter) config.customHTMLFooter = optionsOrMethod.customHTMLFooter;
				if(optionsOrMethod.bgClickClose == false) config.bgClickClose = false;
					
			} else {
				if(methods[optionsOrMethod]) methods[optionsOrMethod](this);	
				
			}
			
			originalSelector = optionsOrMethod.imgSelector;
			
			createGallery(self);
			
			$('#jsgall_nextButton').click(function() {
	        	loadNextImage();
	    	});
	    	
	    	$('#jsgall_prevButton').click(function() {
	        	loadPrevImage();
	    	});
	    	
	    	$('#jsgall_close').click(function() {
	        	methods.hide(self);
	    	});
	    
	    	
	    	$('#jsgall_imageContainer').click(function(e){
		    	if(e.target.id == "jsgall_imageContainer" && config.bgClickClose) methods.hide(self);
	    	})
	    	
	    	
	    	$(config.imgSelector).click(function(){
		    	config.imgSelector = originalSelector;
		    	
		    	var parents = $(this).parents();
		    	
		    	for(var i = 0; i < parents.length; i++){
			    	if($(parents[i]).attr("media") == "slider"){
				    	$(parents[i]).addClass("selected_slider_div");
				    	config.imgSelector = ".selected_slider_div " + originalSelector;
				    	
			    	}
		    	}
		    	
		    	images = [];
	            createImagesArray();
		    	
		    	console.log(config.imgSelector);
		    	
		    	var src = this.src;
		    	
		    	var selectedIndex;	
		    	
		    	    	
/*
		    	var result = images.filter(function( obj , index) {
				  if( obj.src == src) selectedIndex = index;
				  return result;
				});
*/
				
				
				for(var i = 0; i < images.length; i++){
					if(images[i].src == src){
						selectedIndex = i;
						break;
					}
				}
				
				
				
				config.currentImage = selectedIndex;
				showSelectedImage();
				methods.show(self);
				
	    	})
	    	
	    	
	    	$(config.imgSelector).css("cursor","pointer");
	    	
	    	

	    	$("#jsgall_imageContainer").touchwipe({
			     wipeLeft: function() { loadNextImage(); },
			     wipeRight: function() { loadPrevImage(); },
			     min_move_x: 100,
			     min_move_y: 100
			});

	    		    	
	        return this.each( function() {
	            
	            images = [];
	            createImagesArray();
	            
	            $('.gallery-arrow').css('display',"block");
	            if(images.length < 2) $('.gallery-arrow').css('display',"none");
	            showSelectedImage();
	            
	        });

    
}
    

   
    
}( jQuery ));


(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
