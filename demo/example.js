/* global skrollr, console */
var hA = document.querySelectorAll('.h-animate');
var pA = document.querySelectorAll('.p-animate');
var icons = document.querySelectorAll('.col-md-4');
window.onload = function() {
    var i;
    // Initialise Skrollr.js
    skrollr.init({
        forceHeight: false,
        smoothScrolling: true,
        keyframe: function(element, name, direction) {
            switch (name) {
                case "data350Top":
                    i = parseInt(element.getAttribute('data-index'));
                    switch (i) {
                        case 0:
                            if (direction === "down") {
                                qui('slideInDown', hA[i]);
                                qui('slideInUp', pA[i]);
                            } else {
                                qui('slideOutUp', hA[i], {
                                    vis: true
                                });
                                qui('slideOutDown', pA[i], {
                                    vis: true
                                });
                            }
                            break;
                        case 1:
                            if (direction === "down") {
                                qui('slideInLeft', hA[i]);
                                qui('slideInRight', pA[i]);
                            } else {
                                qui('slideOutLeft', hA[i], {
                                    vis: true
                                });
                                qui('slideOutRight', pA[i], {
                                    vis: true
                                });
                            }
                            break;
                        case 2:
                        if (direction === "down") {
                                qui('stagger.zoomIn', icons);
                            } else {
                                qui('stagger.zoomOut', icons, {
                                    vis: true
                                });
                               
                            }
                            break;
                    }
                    break;
            }
        }
    });
};
