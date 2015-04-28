 $(document).ready(function getDribbbleShots() {

    	/* HIDES UNTIL LOADED*/
    	$('.dribbble-feed').hide();
    	jQuery(window).load(function(){
    	$('.dribbble-feed').fadeIn();
    	});

    	/*Calls in shots */
      $.jribbble.getShotsByPlayerId('paulstanfield', function (playerShots) {
          var html = [];
          $.each(playerShots.shots, function (i, shot) {
              html.push('<div class="col-md-4 shot"><a href="' + shot.url + '" target="_blank">');
              html.push('<figure><img class="shot-image" src="' + shot.image_url + '" alt="' + shot.title + '">');
              html.push('<figcaption><h3>' + shot.title + ' </h3>');
              html.push('<h4>View On Dribbble</h4>');
              html.push('</figure></a></div>');


          });
          $('.dribbble-feed').html(html.join(''));
      }, {page: 1, per_page: 3});

});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

