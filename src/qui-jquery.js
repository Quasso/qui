
// Timelines for animations
var animate;
// Distances
var smallPx=50, bigPx= 500, nudge=30;
// Default parameters
var 
duration = defaultDuration = 0.5, 
delay = defaultDelay = 0,
easing = defaultEasing = "Linear.easeNone",
stagger = defaultStagger = 0.3,
repeat = defaultRepeat = 2,
vis = defaultVis = false,
count = defaultCount = 0, done=false, isArray = false, toHeight="100%";

var lastEl;
var gsui = function(method, element, options, callback) {
	// console.log($(element));
	// This simple class adding/removing system allows animations to be chained
	// on $(element)s/groups of $(element)s very easily without the need for manually
	// calculating a delay. It also means the delay parameter always functions as 
	// expected, if you chain ui animations on an $(element), it'll only start when the 
	// first finished if the second has a delay, it will honour that delay 
	// after the first $(element) has finished too
	// console.log('El length: ' + $(element).length);
	// console.log(typeof document.querySelector('.gsui-active')===null);
	if(element.toString().indexOf('$')!=-1) {
		console.log('innit');
		element = element[0];
	}
	if (typeof document.querySelector('.gsui-active')===null) {
		// console.log('queued');
		if ($(element) == '[object NodeList]' || Object.prototype.toString.call( $(element) ) === '[object Array]') {
			for(i=0; i<$(element).length;i++) {
				if ($(element[i]).hasClass('gsui-active')) {
					setTimeout(function() {gsui(method, $(element), options, callback)},100);
				}
			}
		}
		else if ($(element).hasClass('gsui-active'))
			setTimeout(function() {gsui(method, $(element), options, callback)},100);
	}

	else {
		lastEL = $(element);
		// console.log($(element).length===undefined);
		if ($(element) == '[object NodeList]' || Object.prototype.toString.call( $(element) ) === '[object Array]' && $(element).length!==undefined) {
			isArray = true;
			$(element) = Array.prototype.slice.call($(element));
			$(element).each(function(index){
				$(element).addClass('gsui-active');
			});
		}
		else {
			isArray = false;
			$(element).addClass('gsui-active');
		}
		
		var 
		method = (typeof arguments[0] !== "function")? arguments[0] : {},
		element = (typeof arguments[0] !== "function")? arguments[1] : {},
		// options = (typeof arguments[0] !== "function")? arguments[2] : {},
		callback = (typeof arguments[0] !== "function")? arguments[3] : arguments[0];
		animate = new TimelineLite();
		if(typeof(options) != "undefined")
			customParams(options);
		if(method.indexOf('In')>0) {
			if(!isArray) {
				$(element).css('visibility','visible');
				if(typeof options!=='undefined') {
					if(!options.inline)
						$(element).css('display','block');
					else
						$(element).css('display', 'inline-block');
					$(element).css('opacity', '0');
				}
				else {
					$(element).css('display','block');
					$(element).css('opacity', '0');
				}
				
			}
			else {

				$(element).each(function(index){
					$(element).css('visibility','visible');
					if(typeof options!=='undefined') {
						if(!options.inline)
							$(element).css('display','block');
						else
							$(element).css('display', 'inline-block');
						$(element).css('opacity', '0');
					}
					else {
						$(element).css('display','block');
						$(element).css('opacity', '0');
					}
				});
			}
			
		}
		
		switch (method) {

		/**************************
		UNIFIED - for arrays of 
		$(element)s to be animated 
		simultaneously 
		**************************/
		case 'shrink':
		console.log('Shrinking');
		animate.fromTo( 
			$(element), duration, {delay: 1, opacity: 1, height:toHeight, ease:easing}, {opacity: 1, height:0, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'grow':
		animate.fromTo( 
			$(element), duration, {delay: 1, height: 0, opacity: 1, ease:easing}, {opacity: 1, height:toHeight, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'fadeIn':
		animate.fromTo( 
			$(element), duration, {delay: delay, opacity: 0, ease:easing}, {opacity: 1, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'fadeOut':
		animate.fromTo( 
			$(element), duration, {delay: delay, opacity: 1, ease:easing}, {opacity: 0, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInLeft':
		animate.fromTo( 
			$(element), duration, {delay: delay, x: "-=" + smallPx + "px", opacity: 0, ease:easing}, {x:'0', opacity: 1, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInLeftBig':
		animate.from( 
			$(element), duration, {delay: delay, x: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutLeft':
		animate.fromTo( 
			$(element), duration, {delay: delay, x:'0', opacity: 1, ease:easing}, {x: "-=" + smallPx + "px", opacity: 0, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutLeftBig':
		animate.to( 
			$(element), duration, {delay: delay, left: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInRight':
		animate.fromTo( 
			$(element), duration, {delay: delay, x: "+=" + smallPx + "px", opacity: 0, ease:easing}, {x:'0', opacity: 1, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInRightBig':
		animate.from( 
			$(element), duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutRight':
		animate.fromTo( 
			$(element), duration, {delay: delay, x:'0', opacity: 1, ease:easing}, {x: "+=" + smallPx + "px", opacity: 0, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutRightBig':
		animate.to( 
			$(element), duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInUp':
		// console.log($(element));
		animate.fromTo( 
			$(element), duration, {delay: delay, y: "+=" + smallPx + "px", opacity: 0, ease:easing}, {y:0, opacity: 1, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInUpBig':
		animate.from( 
			$(element), duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutUp':
		animate.fromTo( 
			$(element), duration, {delay: delay, y: 0, opacity: 1, ease:easing}, {opacity: 0, y: "-=" + smallPx + "px", onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutUpBig':		
		animate.to( 
			$(element), duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideInDown':	

		animate.fromTo( 
			$(element), duration, {delay: delay, y: "-=" + smallPx + "px", opacity: 0, ease:easing}, {opacity: 1, y: 0 + "px", onComplete: function() { animationComplete($(element), method)}}
			);

		break;
		case 'slideInDownBig':
		animate.from( 
			$(element), duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'slideOutDown':
		animate.fromTo( 
			$(element), duration, {delay: delay, y: 0, opacity: 1, ease:easing}, {y: "+=" + smallPx + "px", opacity: 0, onComplete: function() { animationComplete($(element), method)}}
			);

		break;
		case 'slideOutDownBig':
		animate.to( 
			$(element), duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'zoomIn':
		animate.fromTo( 
			$(element), duration, {delay: delay, scale: 0, opacity: 0}, {scale: 1, opacity: 1, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'zoomOut':
		animate.fromTo( 
			$(element), duration, {delay: delay, scale: "1", opacity: 1, ease:easing}, {scale: "0", opacity: 0, onComplete: function() { animationComplete($(element), method)}}
			);
		break;
		case 'tada':
		animate.from($(element), duration/6, {scale: 0.6}).to( 
			$(element), duration/6, {rotation: "10%", scale: 1.1, ease:easing}
			).to( 
			$(element), duration/6, {rotation: "-10%", scale: 1.15, ease:easing}
			).to( 
			$(element), duration/6, {rotation: "10%", scale: 1.15, ease:easing}
			).to( 
			$(element), duration/6, {rotation: "-10%", scale: 1.1, ease:easing}
			).to( 
			$(element), duration/6, {rotation: "0%", scale: 1, ease:easing, onComplete: function() { animationComplete($(element), method)}}
			);
			break;
			case 'shake':
			animate.to( $(element), duration/6, {left: "+=" + (nudge/2), ease:easing})
			.to($(element), duration/6, {left: "-=" + nudge, ease:easing})
			.to($(element), duration/6, {left: "+=" + nudge, ease:easing})
			.to($(element), duration/6, {left: "-=" + nudge, ease:easing})
			.to($(element), duration/6, {left: "+=" + nudge, ease:easing})
			.to( $(element), duration/6, {left: "-=" + (nudge/2), ease:easing, onComplete: function() { animationComplete($(element), method)}});
			break;
		/**************************
		STAGGERED - for arrays of 
		$(element)s to be animated 
		sequentially
		**************************/
		case 'stagger.slideInLeft':
		animate.staggerFromTo( 
			$(element), duration, {delay: delay, x: "-=" + smallPx + "px", opacity: 0, ease:easing}, {opacity: 1, x: "0px"}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInLeftBig':
		animate.staggerFromTo( 
			$(element), duration, {delay: delay, x: "-=" + bigPx + "px", opacity: 0, ease:easing}, {opacity: 1, x: "0px"}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutLeft':
		animate.staggerTo( 
			$(element), duration, {delay: delay, left: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutLeftBig':
		animate.staggerTo( 
			$(element), duration, {delay: delay, left: "-=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInRight':
		animate.staggerFrom( 
			$(element), duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInRightBig':
		animate.staggerFrom( 
			$(element), duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutRight':
		animate.staggerTo( 
			$(element), duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutRightBig':
		animate.staggerTo( 
			$(element), duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInUp':
		animate.staggerFrom( 
			$(element), duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInUpBig':
		animate.staggerFrom( 
			$(element), duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutUp':
		animate.staggerTo( 
			$(element), duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutUpBig':		
		animate.staggerTo( 
			$(element), duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInDown':		
		animate.staggerFrom( 
			$(element), duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideInDownBig':
		animate.staggerFrom( 
			$(element), duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutDown':
		animate.staggerTo( 
			$(element), duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.slideOutDownBig':
		animate.staggerTo( 
			$(element), duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.zoomIn':
		animate.staggerFromTo( 
			$(element), duration, {delay: delay, scale: "0", opacity: 0, ease:easing}, {scale: "1", opacity: 1}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.zoomOut':
		animate.staggerTo( 
			$(element), duration, {delay: delay, scale: "0%", opacity: 0, ease:easing}, stagger
			);
		checkProgress($(element));
		break;
		case 'stagger.tada':
		// duration=duration*5;
		$(element).each(function(index){
			// This effectively allows the user to set a 
			// stagger time for sequences with multiple tweens
			setTimeout(function() {
				animate.to( $(element), duration/5, {scale: 0.6})
				.to( 
					$(element), duration/5, {rotation: "-10%", scale: 1, ease:easing}
					).to( 
					$(element), duration/5, {rotation: "10%", ease:easing}
					).to( 
					$(element), duration/5, {rotation: "-10%", scale: 1, ease:easing}
					).to( 
					$(element), duration/5, {rotation: "10%", ease:easing}
					).to( 
					$(element), duration/5, {rotation: "0%", ease:easing});
				}, index*stagger*1000);
		});
		checkProgress($(element));
		break;
		case 'stagger.shake':
		var count2;
		$(element).each(function(index){
			setTimeout(function() {
				animate.to( $(element), duration/6, {x: (nudge/2), ease:easing})
				.to($(element), duration/6, {x: "-=" + nudge, ease:easing})
				.to($(element), duration/6, {x: "+=" + nudge, ease:easing})
				.to($(element), duration/6, {x: "-=" + nudge, ease:easing})
				.to($(element), duration/6, {x: "+=" + nudge, ease:easing})
				.to( $(element), duration/6, {x: "0", ease:easing});
			}, index*stagger*1000);
		});
		checkProgress($(element));
		break;
		default:
		// console.log('The command ' + method + ' is not valid. Please refer to the documentation for accepted methods.');
		break;
	}
}
function customParams(options) {
	duration = defaultDuration, 
	delay = defaultDelay,
	easing = defaultEasing,
	stagger = defaultStagger,
	vis = defaultVis,
	done=false;
	// console.log(options.vis);
	if(typeof(options.delay) != "undefined") delay = options.delay;
	if(typeof(options.duration) != "undefined") duration = options.duration;
	if(typeof(options.easing) != "undefined") easing = options.easing;
	if(typeof(options.stagger) != "undefined") stagger = options.stagger;
	if(typeof(options.vis) != "undefined") vis = options.vis;
	if(typeof(options.toHeight) != "undefined") toHeight = options.toHeight;

}
function animationComplete(element, type) {
	// console.log(type + " " + vis);
	if(typeof options !== 'undefined') {
		if(typeof options.vis !== 'undefined') vis = options.vis;
	}
	
	if($(element).length>0) {
		$(element).each(function(index){
			$(element).removeClass('gsui-active');
			// console.log(vis);
			if(type.indexOf('Out')>0 && vis===false) {
				$(element).css.display='none';
			}
			
			if(type.indexOf('Out')>0 && vis===true) {
				$(element).css.visibility = 'hidden';
			}
		});
	}
	else {
		// console.log(vis);
		$(element).removeClass('gsui-active');
		if(type.indexOf('Out')>0 && vis===false) {
			$(element).css.display='none';
		}

		if(type.indexOf('Out')>0 && vis===true) {
			$(element).css.visibility = 'hidden';
		}
	}
	// console.log(callback);
	if(typeof callback === null || typeof callback ==='undefined')  {

	}
	else
		return callback();
}
function checkProgress(element) {
	if($(element).length>0) {
		$(element).each(function(index){
			setTimeout(function() {
				$(element).removeClass('gsui-active');
			}, $(element).length*(duration+stagger+delay*1000)+1);
		});
	}
	else {
		setTimeout(function() {
			$(element).removeClass('gsui-active');
		}, $(element).length*(duration+stagger+delay*1000)+1);
	}
	
	
}
}
