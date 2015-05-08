# **QUI - a little GSAP UI pack** #

The aim of this project is to provide front-end devs with a painless, decluttered way of handling common UI transitions in projects--I've found myself using it mainly with Skrollr.js, or things like notifications in web apps.

This is an alpha release. I first started making this project several months ago and have incrementally improved it while using it in production projects, though it definitely needs refining. 

Small demo here (inspect the source of example.js for an idea of what's happening): http://quasso.github.io/qui

### Why should I use GSAP, and importantly why should I use this too? ###

* GSAP is a wonderful library, with class A support and an unwieldy appetite for performance. It's backwards compatible to IE6, it vastly outperforms CSS animations and outperforms all other JS animation libraries. If you're using a lot of resources and scripting on your web projects and require animation, GSAP is the best way to add as little as possible to that stress and get fluid, responsive animations.
* QUI is designed to let front-end devs like me perform common UI transitions with little effort and minimal code. It should work as a catalyst in your projects. 

### How do I get set up? ###

## Bower ##

`bower install qui (--save-dev)`

* Include the script after you've included GSAP
* Call qui in your code (see below)
* For more details on the available transitions, option & to see working examples (see below)

### Documentation ###

#### Syntax ####

The syntax is like this:

`qui('transition', element, {options});`

##### transition #####

This can have any of the following values (hopefully self-explanatory, but this will be expanded on): 

shrink
grow
fadeIn
fadeOut
slideInLeft
slideInLeftBig
slideOutLeft
slideOutLeftBig
slideInRight
slideInRightBig
slideOutRight
slideOutRightBig
slideInUp
slideInUpBig
slideOutUp
slideOutUpBig
slideInDown
slideInDownBig
slideOutDown
slideOutDownBig
zoomIn
zoomOut
tada
shake

##### element #####

This is the javascript element or array you'd like to animate.

##### options #####
 
This is an object which contains key-value pairs, with the options being:

`delay` (decimal)

This can be applied to any call, and it's the delay that'll be used until the transition begins.

`duration` (decimal)

This can be applied to any call, and it's the duration that the transition will occur over.

`easing` (string)

Supports all the easing values that GSAP does, and can be used with CubicBezier in the same way.

`stagger` (decimal)

If you prepend `stagger.` to the above transitions, it allows you to use the staggering feature of GSAP, which is useful with arrays of items. The stagger option is then available, and is the amount of time in seconds (or frames if the timeline is frames-based) to stagger the start time of each tween.

`vis` (boolean)

This can be applied to any call. When set to `true`, qui will tweak the `visibility` property of the element, instead of the `display` property like it normally does. It's useful if you want to set `visibility: hidden` on an element so as to keep the structure of the page the same size, for big block elements.

`toHeight`

This is a special property that is used with `grow` and `shrink` to determine the final height after either is called. 

I touched on it just then, but depending on the type of transition you're doing (in/out), qui will automatically adjust the display property of the element(s), and if you apply `vis: true` in the options, it'll adjust the visibility property.

### Contribution guidelines ###

* Any ideas for presets
* Any ideas for features
* Ideas for improving performance, or reducing size

If you have any suggestions, issues or anything else feel free to file something. I can't dedicate buckets of time to this--I'm just creating it to speed my workflow and thought I'd share the love in case anyone else can make good use of it. I will periodically update it though as I enhance the script and discover bugs. I hope it helps somebody else!
