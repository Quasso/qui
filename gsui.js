/*global $el:true */
/*global TimelineLite */
/*global console */
/*jshint -W079 */
/*jslint latedef:false*/
var $ = jQuery.noConflict();
// Timelines for animations
var animate;
// Distanceshahaha
var smallPx=50, bigPx= 500, nudge=10;
// Timing variables & defaults
var 
duration, delay, easing, stagger, calc, cb, count=0;
var 
defaultDuration = 0.5, defaultDelay = 0, defaultEasing = "Linear.easeNone", defaultStagger = 0.3;
// Element/s that is/are being animated
$el="";
function resetParams() {
	duration = defaultDuration; 
	delay = defaultDelay;
	easing = defaultEasing;
	stagger = defaultStagger;
}
function animationComplete($el) {
	$el.removeClass('gsui-active');
	$el.css('transform','none');
	if(typeof(cb)!=="undefined") {
		cb();
	}
}
function checkProgress($el, element) {
	calc = (duration * element.length) * 1000 + (delay*1000);
	console.log(calc);
	setTimeout(function() {
		animationComplete($el);
	}, calc+50);
}
var gsui = function(method, element, options, callback) {
	$el = $(element);
	// This simple class adding/removing system allows animations to be chained
	// on elements/groups of elements very easily without the need for manually
	// calculating a delay. It also means the delay parameter always functions as 
	// expected, if you chain ui animations on an element, it'll only start when the 
	// first finished if the second has a delay, it will honour that delay 
	// after the first element has finished too
	if($el.hasClass('gsui-active')) {
		setTimeout(function() {gsui(method, element, options, callback);},100);
	}
	else {
		$el.addClass('gsui-active');
		cb = callback;
		animate = new TimelineLite();
		resetParams();
		if(typeof(options) !== "undefined")
		{
			if(count<options.repeat-1) {
				gsui(method, element, options, callback);
				count++;
			}
				
				customParams(options);
		}
		console.log(duration);
		switch (method) {
		/**************************
		UNIFIED - for arrays of 
		elements to be animated 
		simultaneously 
		**************************/
		case 'slideInLeft':
		animate.fromTo( 
			element, duration, {delay: delay, left: "-=" + smallPx + "px", opacity: 0}, {delay: delay, left: "0px", opacity: 1, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInLeftBig':
		animate.from( 
			element, duration, {delay: delay, left: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutLeft':
		animate.to( 
			element, duration, {delay: delay, left: "-=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutLeftBig':
		animate.to( 
			element, duration, {delay: delay, left: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInRight':
		animate.from( 
			element, duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInRightBig':
		animate.from( 
			element, duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutRight':
		animate.to( 
			element, duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutRightBig':
		animate.to( 
			element, duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInUp':
		animate.from( 
			element, duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInUpBig':
		animate.from( 
			element, duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutUp':
		animate.to( 
			element, duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing}
			);
		break;
		case 'slideOutUpBig':		
		animate.to( 
			element, duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInDown':		
		animate.from( 
			element, duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideInDownBig':
		animate.from( 
			element, duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutDown':
		animate.to( 
			element, duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'slideOutDownBig':
		animate.to( 
			element, duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'zoomIn':
		animate.fromTo( 
			element, duration, {scale: "0", opacity: 0}, {scale: "1", opacity: 1,delay: delay, ease:easing, onComplete: function() { animationComplete($el);}}, stagger
			);
		break;
		case 'zoomOut':
		animate.to( 
			element, duration, {delay: delay, scale: "0%", opacity: 0, ease:easing, onComplete: function() { animationComplete($el);}}
			);
		break;
		case 'tada':
		animate.from(element, duration/6, {scale: 0.6,opacity:0}).to( 
			element, duration/6, {rotation: "10%", scale: 1.1, ease:easing, opacity: 1}
			).to( 
			element, duration/6, {rotation: "-10%", scale: 1.15, ease:easing}
			).to( 
			element, duration/6, {rotation: "10%", scale: 1.15, ease:easing}
			).to( 
			element, duration/6, {rotation: "-10%", scale: 1.1, ease:easing}
			).to( 
			element, duration/6, {rotation: "0%", scale: 1, ease:easing, onComplete: function() { animationComplete($el);}}
			);
			break;
			case 'shake':
			duration=duration/2;
			animate.to( element, duration/2, {x: (nudge/2), ease:easing})
			.to(element, duration/2, {x: "-=" + nudge, ease:easing, repeat:1})
			.to(element, duration/2, {x: "+=" + nudge, ease:easing, repeat:1})
			.to( element, duration/2, {x: "0", ease:easing, onComplete: function() { animationComplete($el);}});
			break;
		/**************************
		STAGGERED - for arrays of 
		elements to be animated 
		sequentially
		**************************/
		case 'stagger.slideInLeft':
		animate.staggerFrom( 
			element, duration, {delay: delay, left: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInLeftBig':
		animate.staggerFromTo( 
			element, duration, {left: "-=" + bigPx + "px", opacity: 0}, {delay: delay, left: "0px", opacity: 1, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutLeft':
		animate.staggerTo( 
			element, duration, {delay: delay, left: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutLeftBig':
		animate.staggerTo( 
			element, duration, {delay: delay, left: "-" + bigPx + "px", opacity: 0, ease:easing}, {left: "0", opacity: 1}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInRight':
		animate.staggerFrom( 
			element, duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInRightBig':
		animate.staggerFrom( 
			element, duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutRight':
		animate.staggerTo( 
			element, duration, {delay: delay, left: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutRightBig':
		animate.staggerTo( 
			element, duration, {delay: delay, left: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInUp':
		animate.staggerFrom( 
			element, duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInUpBig':
		animate.staggerFrom( 
			element, duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutUp':
		animate.staggerTo( 
			element, duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutUpBig':		
		animate.staggerTo( 
			element, duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInDown':		
		animate.staggerFrom( 
			element, duration, {delay: delay, top: "-=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideInDownBig':
		animate.staggerFrom( 
			element, duration, {delay: delay, top: "-=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutDown':
		animate.staggerTo( 
			element, duration, {delay: delay, top: "+=" + smallPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.slideOutDownBig':
		animate.staggerTo( 
			element, duration, {delay: delay, top: "+=" + bigPx + "px", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.zoomIn':
		console.log(delay);
		animate.staggerFromTo( 
			element, duration, {delay: delay, scale: "0", opacity: 0, ease:easing}, {scale: "1", opacity: 1}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.zoomOut':
		animate.staggerTo( 
			element, duration, {delay: delay, scale: "0%", opacity: 0, ease:easing}, stagger
			);
		checkProgress($el, element);
		break;
		case 'stagger.tada':
		element.each(function(index,element){
			// This effectively allows the user to set a 
			// stagger time for sequences with multiple tweens
			setTimeout(function() {
				animate.to( element, duration/5, {scale: 0.6})
				.to( 
					element, duration/5, {rotation: "-10%", scale: 1, ease:easing}
					).to( 
					element, duration/5, {rotation: "10%", ease:easing}
					).to( 
					element, duration/5, {rotation: "-10%", scale: 1, ease:easing}
					).to( 
					element, duration/5, {rotation: "10%", ease:easing}
					).to( 
					element, duration/5, {rotation: "0%", ease:easing});
				}, (index*stagger*1000)+delay*1000);
		});
		checkProgress($el, element);
		break;
		case 'stagger.shake':
		element.each(function(index,element){
			setTimeout(function() {
				animate.to( element, duration/6, {left: (nudge/2), opacity: 1, ease:easing})
				.to(element, duration/6, {left: "-=" + nudge, ease:easing})
				.to(element, duration/6, {left: "+=" + nudge, ease:easing})
				.to(element, duration/6, {left: "-=" + nudge, ease:easing})
				.to(element, duration/6, {left: "+=" + nudge, ease:easing})
				.to( element, duration/6, {left: "0", ease:easing});
			}, (index*stagger*1000)+delay*1000);
		});
		checkProgress($el, element);
		break;
		default:
		console.log('The command ' + method + ' is not valid. Please refer to the documentation for accepted methods.');
		break;
	}
}
function customParams(options) {
	duration = defaultDuration; 
	delay = defaultDelay;
	easing = defaultEasing;
	stagger = defaultStagger;
	if(typeof(options.delay) !== "undefined") { delay = options.delay; console.log(delay); }
	if(typeof(options.duration) !== "undefined") { duration = options.duration; }
	if(typeof(options.easing) !== "undefined") { easing = options.easing; }
	if(typeof(options.stagger) !== "undefined") { stagger = options.stagger; }
}
};
