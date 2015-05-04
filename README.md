# **GSAP UI pack** #

The aim of this project is to provide front-end devs with a painless, decluttered way of handling common UI transitions in projects--I've found myself using it mainly with Skrollr.js, or things like notifications in web apps.

This is an alpha release. I first started making this project several months ago and have incrementally improved it while using it in production projects, though it definitely needs refining. 

### Why should I use GSAP, and importantly why should I use this too? ###

* GSAP is a wonderful library, with class A support and an unwieldy appetite for performance. It's backwards compatible to IE6, it vastly outperforms CSS animations and outperforms all other JS animation libraries. If you're using a lot of resources and scripting on your web projects and require animation, GSAP is the best way to add as little as possible to that stress and get fluid, responsive animations.

### How do I get set up? ###

## Bower ##

`bower install gsui (--save-dev)`

* Include the script after you've included GSAP
* Call `gsui('transition.transitionName', element, {options [optional]});`, for example `gsui('slideInUp', modal, {delay: 2});`
* For more details on the available transitions, option & to see working examples, see below.

### Documentation ###

Coming very soon!

### Contribution guidelines ###

* Any ideas for presets
* Any ideas for features
* Ideas for improving performance, or reducing size

If you have any suggestions, issues or anything else feel free to file something. I can't dedicate buckets of time to this--I'm just creating it to speed my workflow and thought I'd share the love in case anyone else can make good use of it. I will periodically update it though as I enhance the script and discover bugs. I hope it helps somebody else!
