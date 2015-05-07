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
                                gsui('slideInDown', hA[i]);
                                gsui('slideInUp', pA[i]);
                            } else {
                                gsui('slideOutUp', hA[i], {
                                    vis: true
                                });
                                gsui('slideOutDown', pA[i], {
                                    vis: true
                                });
                            }
                            break;
                        case 1:
                            if (direction === "down") {
                                gsui('slideInLeft', hA[i]);
                                gsui('slideInRight', pA[i]);
                            } else {
                                gsui('slideOutLeft', hA[i], {
                                    vis: true
                                });
                                gsui('slideOutRight', pA[i], {
                                    vis: true
                                });
                            }
                            break;
                        case 2:
                        if (direction === "down") {
                                gsui('stagger.zoomIn', icons);
                            } else {
                                gsui('stagger.zoomOut', icons, {
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
