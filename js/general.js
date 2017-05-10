'use strict';

$(document).ready(function() {

    /*-----------------------------------------------------------------
     * Parallax
     *-----------------------------------------------------------------*/

    $.stellar({
        responsive: true,
        horizontalOffset: 0,
        verticalOffset: 0,
        horizontalScrolling: false,
        hideDistantElements: false
    });


    /*-----------------------------------------------------------------
     * ScrollSpy
     *-----------------------------------------------------------------*/

    $('body').scrollspy({
        offset:  51
    });

    /*-----------------------------------------------------------------
     * Affixed Navbar
     *-----------------------------------------------------------------*/

    $('#navigation').affix({
        offset: {
            top: $(window).height() * .7
        }
    });

    /*-----------------------------------------------------------------
     * Smooth Pulse Scrolling
     *-----------------------------------------------------------------*/

    $('a[href^="#"]').click(function(event) {

        event.preventDefault();

        var target = $(this).attr('href'),
            $preloader = $('#preloader');
        if (target == '#') return;

        $preloader.fadeIn();

        $('body, html').animate({
            scrollTop: $(target).offset().top + 20
        }, 1200);

        $preloader.delay(300).fadeOut();

    });


    /*-----------------------------------------------------------------
     * Portfolio isotope
     *-----------------------------------------------------------------*/

    var $portfolio = $('.portfolio');

    $portfolio.isotope({

        itemSelector: '.portfolio-item',
        layoutMode  : 'masonry',

        masonry     : {
            columnWidth: '.portfolio-item'
        }

    });

    $('.portfolio-filter-button').click(function() {

        var $this = $(this),
            filter = $this.attr('data-filter');

        $('.portfolio-filter-button-active').removeClass('portfolio-filter-button-active');
        $this.addClass('portfolio-filter-button-active');

        $portfolio.isotope({

            filter: filter,

            animationOptions: {
                duration: 750,
                queue: false
            }

        });
    });

    /*-----------------------------------------------------------------
     * Magnific
     *-----------------------------------------------------------------*/

    $('.portfolio-item').unbind('click').magnificPopup({
        fixedContentPos: false,
        closeBtnInside : true,
        mainClass: 'mfp-fade'
    });

    $('.iframe-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade'
    });

    /*-----------------------------------------------------------------
     * Carousel
     *-----------------------------------------------------------------*/

    $(".owl-carousel").owlCarousel({
        pagination      : false,
        navigation      : true,
        singleItem      : true,
        responsive      : true,

        paginationSpeed : 400,
        slideSpeed      : 300,
        autoPlay        : 5000,

        items           : 1,
        navigationText  : [

            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ]
    });

    /*-----------------------------------------------------------------
     * Ajax forms
     *-----------------------------------------------------------------*/

    $('.form-ajax').each(function(){

        $(this).validate({
            submitHandler: function(form) {

                var $submit_button = $(form).find('[type=submit]'),
                    submit_button_text = $submit_button.html();

                $submit_button.attr('disabled', true);
                $submit_button.html('Wait...');

                $.ajax({

                    type   : 'post',
                    url    : 'sendmail.php',
                    data   : $(form).serialize(),

                    success: function() {
                        $('.modal-result').html('Thank you for contacting us! Message sent successfully. We will get back to you shortly.');
                        $('.modal.in').modal('hide');
                        $('#result').modal('show');

                        $submit_button.attr('disabled', false);
                        $submit_button.html(submit_button_text);
                    },

                    error: function(){
                        $('.modal-result').html('Error sending message. Make sure you checked &#39;I am not a robot&#39; checkbox. <br />You can also send you message directly to <b>vitabachman@me.com</b>.');
                        $('.modal.in').modal('hide');
                        $('#result').modal('show');

                        $submit_button.attr('disabled', false);
                        $submit_button.html(submit_button_text);
                    }
                });
            }
        });

    });

    $('.modal').on('hide.bs.modal', function (e) {
        var $body = $('body');
        if (parseInt($body.css('padding-right')) > 0) {
            $body.css('padding-right', '');
        }
    });

    /*-----------------------------------------------------------------
     * Preloader
     *-----------------------------------------------------------------*/

    var $preloader = $('#preloader'),
        $loader = $preloader.find('.loader');

    $loader.fadeOut();
    $preloader.delay(500).fadeOut('slow');

});