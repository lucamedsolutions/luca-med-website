(function ($) {
    "use strict";

    // Header Type = Fixed
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var box = $('.header-text').height();
        var header = $('header').height();

        if (scroll >= box - header) {
            $("header").addClass("background-header");
        } else {
            $("header").removeClass("background-header");
        }
    });

    // Owl Carousel Configuration
    $('.loop').owlCarousel({
        center: true,
        items: 1,
        loop: true,
        autoplay: true,
        nav: true,
        margin: 0,
        responsive: {
            1200: {
                items: 5
            },
            992: {
                items: 3
            },
            760: {
                items: 2
            }
        }
    });

    // Menu Dropdown Toggle
    if($('.menu-trigger').length){
        $(".menu-trigger").on('click', function() { 
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    // Smooth Scroll and Active Link Handling
    $(document).ready(function() {

        // Handle external links separately
        $('.nav a[href^="http"]').on('click', function(e) {
            // Allow default behavior for external links
            return true;
        });

        // Handle navigation clicks
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            var target = $($(this).attr('href'));
            
            if (target.length) {
                // Close mobile menu if open
                if ($(window).width() < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);
                }

                // Smooth scroll
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800);

                // Update active state
                $('.scroll-to-section a').removeClass('active');
                $(this).addClass('active');
            }
        });
      

        // Update active menu item on scroll
        $(window).on('scroll', function() {
            var scrollPos = $(window).scrollTop();

            // Check each section
            $('.scroll-to-section a').each(function() {
                var currLink = $(this);
                var href = currLink.attr("href");      
                if (href.startsWith("#"))   
                  {      
                var refElement = $(href);
                if (refElement.length) {
                    var sectionTop = refElement.offset().top - 100;
                    var sectionBottom = sectionTop + refElement.outerHeight();

                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        $('.scroll-to-section a').removeClass('active');
                        currLink.addClass('active');
                    }
                }
              }
            });
        });
    });

    // Flip card handler
    $(document).on("click", ".naccs .menu > div", function(e) {
        var $menuItem = $(this);
        var $thumb = $menuItem.find('.thumb').first();
        if ($thumb.length === 0) return;

        var $back = $thumb.find('.card-back');
        if ($back.length) {
            $thumb.toggleClass('flipped');
            return;
        }

        // Original tab behavior fallback
        var numberIndex = $menuItem.index();
        if (!$menuItem.hasClass("active")) {
            $(".naccs .menu > div").removeClass("active");
            $(".naccs ul li").removeClass("active");

            $menuItem.addClass("active");
            $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

            var listItemHeight = $(".naccs ul")
                .find("li:eq(" + numberIndex + ")")
                .innerHeight();
            $(".naccs ul").height(listItemHeight + "px");
        }
    });

    // Page loading animation
    $(window).on('load', function() {
        $('#js-preloader').addClass('loaded');
    });

    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();
        $('.submenu').on('click', function() {
            if(width < 767) {
                $('.submenu ul').removeClass('active');
                $(this).find('ul').toggleClass('active');
            }
        });
    }

    // Initialize mobile nav
    $(window).on('resize', mobileNav);
    mobileNav();

})(window.jQuery);