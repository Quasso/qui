var animate,smallPx=50,bigPx=500,nudge=10,duration=defaultDuration=.5,delay=defaultDelay=0,easing=defaultEasing="Linear.easeNone",stagger=defaultStagger=.3,repeat=defaultRepeat=2,count=defaultCount=0,done=!1,calc,gsui=function(e,a,t,i){function n(e){duration=defaultDuration,delay=defaultDelay,easing=defaultEasing,stagger=defaultStagger,done=!1,"undefined"!=typeof e.delay&&(delay=e.delay),"undefined"!=typeof e.duration&&(duration=e.duration),"undefined"!=typeof e.easing&&(easing=e.easing),"undefined"!=typeof e.stagger&&(stagger=e.stagger)}function o(){duration=defaultDuration,delay=defaultDelay,easing=defaultEasing,stagger=defaultStagger,done=!1}function s(e){e.removeClass("gsui-active"),e.css("transform","none")}function l(e,a){calc=duration*a.length*1e3+1e3*delay,console.log(calc),setTimeout(function(){s(e)},calc+50)}if($el=$(a),$el.hasClass("gsui-active"))setTimeout(function(){gsui(e,a,t,i)},100);else{console.log("doasodoasdo"),$el.addClass("gsui-active");var e="function"!=typeof arguments[0]?arguments[0]:{},a="function"!=typeof arguments[0]?arguments[1]:{},t="function"!=typeof arguments[0]?arguments[2]:{},i="function"!=typeof arguments[0]?arguments[3]:arguments[0];switch(animate=new TimelineLite,o(),"undefined"!=typeof t&&n(t),e){case"slideInLeft":animate.from(a,duration,{delay:delay,left:"-="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInLeftBig":animate.from(a,duration,{delay:delay,left:"-="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutLeft":animate.to(a,duration,{delay:delay,left:"-="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutLeftBig":animate.to(a,duration,{delay:delay,left:"-="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInRight":animate.from(a,duration,{delay:delay,left:"+="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInRightBig":animate.from(a,duration,{delay:delay,left:"+="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutRight":animate.to(a,duration,{delay:delay,left:"+="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutRightBig":animate.to(a,duration,{delay:delay,left:"+="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInUp":animate.from(a,duration,{delay:delay,top:"+="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInUpBig":animate.from(a,duration,{delay:delay,top:"+="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutUp":animate.to(a,duration,{delay:delay,top:"-="+smallPx+"px",opacity:0,ease:easing});break;case"slideOutUpBig":animate.to(a,duration,{delay:delay,top:"-="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInDown":animate.from(a,duration,{delay:delay,top:"-="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideInDownBig":animate.from(a,duration,{delay:delay,top:"-="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutDown":animate.to(a,duration,{delay:delay,top:"+="+smallPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"slideOutDownBig":animate.to(a,duration,{delay:delay,top:"+="+bigPx+"px",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"zoomIn":animate.fromTo(a,duration,{delay:delay,scale:"0",opacity:0,ease:easing},{scale:"1",opacity:1,onComplete:function(){s($el)}},stagger);break;case"zoomOut":animate.to(a,duration,{delay:delay,scale:"0%",opacity:0,ease:easing,onComplete:function(){s($el)}});break;case"tada":animate.from(a,duration/6,{scale:.6,opacity:0}).to(a,duration/6,{rotation:"10%",scale:1.1,ease:easing,opacity:1}).to(a,duration/6,{rotation:"-10%",scale:1.15,ease:easing}).to(a,duration/6,{rotation:"10%",scale:1.15,ease:easing}).to(a,duration/6,{rotation:"-10%",scale:1.1,ease:easing}).to(a,duration/6,{rotation:"0%",scale:1,ease:easing,onComplete:function(){s($el)}});break;case"shake":duration/=2,animate.to(a,duration/2,{x:nudge/2,ease:easing}).to(a,duration/2,{x:"-="+nudge,ease:easing,repeat:1}).to(a,duration/2,{x:"+="+nudge,ease:easing,repeat:1}).to(a,duration/2,{x:"0",ease:easing,onComplete:function(){s($el)}});break;case"stagger.slideInLeft":animate.staggerFrom(a,duration,{delay:delay,left:"-="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInLeftBig":animate.staggerFromTo(a,duration,{left:"-="+bigPx+"px",opacity:0},{delay:delay,left:"0px",opacity:1,ease:easing},stagger),l($el,a);break;case"stagger.slideOutLeft":animate.staggerTo(a,duration,{delay:delay,left:"-="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutLeftBig":animate.staggerTo(a,duration,{delay:delay,left:"-"+bigPx+"px",opacity:0,ease:easing},{left:"0",opacity:1},stagger),l($el,a);break;case"stagger.slideInRight":animate.staggerFrom(a,duration,{delay:delay,left:"+="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInRightBig":animate.staggerFrom(a,duration,{delay:delay,left:"+="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutRight":animate.staggerTo(a,duration,{delay:delay,left:"+="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutRightBig":animate.staggerTo(a,duration,{delay:delay,left:"+="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInUp":animate.staggerFrom(a,duration,{delay:delay,top:"+="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInUpBig":animate.staggerFrom(a,duration,{delay:delay,top:"+="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutUp":animate.staggerTo(a,duration,{delay:delay,top:"-="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutUpBig":animate.staggerTo(a,duration,{delay:delay,top:"-="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInDown":animate.staggerFrom(a,duration,{delay:delay,top:"-="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideInDownBig":animate.staggerFrom(a,duration,{delay:delay,top:"-="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutDown":animate.staggerTo(a,duration,{delay:delay,top:"+="+smallPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.slideOutDownBig":animate.staggerTo(a,duration,{delay:delay,top:"+="+bigPx+"px",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.zoomIn":animate.staggerFromTo(a,duration,{delay:delay,scale:"0",opacity:0,ease:easing},{scale:"1",opacity:1},stagger),l($el,a);break;case"stagger.zoomOut":animate.staggerTo(a,duration,{delay:delay,scale:"0%",opacity:0,ease:easing},stagger),l($el,a);break;case"stagger.tada":a.each(function(e,a){setTimeout(function(){animate.to(a,duration/5,{scale:.6}).to(a,duration/5,{rotation:"-10%",scale:1,ease:easing}).to(a,duration/5,{rotation:"10%",ease:easing}).to(a,duration/5,{rotation:"-10%",scale:1,ease:easing}).to(a,duration/5,{rotation:"10%",ease:easing}).to(a,duration/5,{rotation:"0%",ease:easing})},e*stagger*1e3)}),l($el,a);break;case"stagger.shake":a.each(function(e,a){setTimeout(function(){animate.to(a,duration/6,{x:nudge/2,ease:easing}).to(a,duration/6,{x:"-="+nudge,ease:easing}).to(a,duration/6,{x:"+="+nudge,ease:easing}).to(a,duration/6,{x:"-="+nudge,ease:easing}).to(a,duration/6,{x:"+="+nudge,ease:easing}).to(a,duration/6,{x:"0",ease:easing})},e*stagger*1e3)}),l($el,a);break;default:console.log("The command "+e+" is not valid. Please refer to the documentation for accepted methods.")}}setInterval(function(){$(".timer").text(animate.totalDuration())},99)};