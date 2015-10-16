
(function ( $ ) {
	
	var methods = {
		
		show : function(self){
			self.css("display","block");
		},
		
		hide : function(self){
			$(self).css("display","none");
		}
		
	}
	
	function createGallery(self){
		var html = '<div id="jsgall_prevButton" class="gallery-arrow arrow-left"><i class="fa fa-chevron-left"></i></div>';
			html += '<div id="jsgall_imageContainer"><img id="jsgallery_displayed_image">';
			html += '<div id="jsgall_htmloverlay"><span id="customHTMLFooter"></span></div></div>';
			html += '<div id="jsgall_nextButton" class="gallery-arrow arrow-right"><i class="fa fa-chevron-right"></i></div>';
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
	
	
	var images = [];
	var config = {};
    
	
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
		    	var src = this.src;
		    	
		    	var selectedIndex;	    	
		    	var result = images.filter(function( obj , index) {
				  if( obj.src == src) selectedIndex = index;
				  return result;
				});
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
	            
	            
	            $('.gallery-arrow').css('display',"block");
	            if(images.length < 2) $('.gallery-arrow').css('display',"none");
	            showSelectedImage();
	            
	        });

    
}
    

   
    
}( jQuery ));


(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);