/** jBanner version 0.2
 *
 * Powered By JaeHo Song thruthesky@gmail.com
 * Open source code under GPL.
 */
(function($)
{
	$.fn.begin = function(options)
	{
		var $this = $(this);
		var count=0;
		var zIndex=0;
		var timer_interval = null;
		var no_of_image_shown = 0;
		var defaults = {
			'height': 120,
			'interval': 5000,
			'speed': 300,
			'button': true,
			'pause': true,
			'direction' : 'right-to-left',
			'callback_init' : null,
			'callback_banner_change' : null
		};
		var max_length = $(this).find('a').length;
		var o = $.extend(defaults,options);
		if ( o.button ) show_button();
		$(this).find('a')
			.css('display', 'block')
			.css('position', 'absolute')
			.css('width', '100%')
		;
		
		$(this).find('img')
			.css('width', '100%')
			.css('height', o.height + 'px')
			// .css('border', '0'); // problem with IE7
		;
		$(this).find('a').hide();
		
		$(this).find('a:eq(0)').show();
		timer_interval = setInterval( function () {
			rotate_banner();
			},
			o.interval );
			
		$(this)
			.css('position', 'relative')
			.css('overflow', 'hidden')
			.css('height', o.height + 'px')
			;
		$(this).mouseenter(function(){
			if ( o.pause ) clearInterval(timer_interval);
		});
		$(this).mouseleave(function(){
			if ( o.pause ) {
				timer_interval = setInterval( function () {
					rotate_banner();
				},
				o.interval );
			}
		});
		function rotate_banner()
		{
			count ++;
			if ( count >= max_length ) count = 0;
			show_banner(count);
		}
		
		function show_banner(count)
		{
			no_of_image_shown = count;
			zIndex++;
			
			if ( o.direction == 'bottom-to-top' ) {
				var width = $this.width();
				var height = $this.height();
				$this
					.find('a:eq(' + count + ')')
					.css('z-index', zIndex)
					.css('margin-top', height+'px')
					.show()
					.animate({
						'margin-top': '0'
						},
						o.speed,
						function(){
							if ( o.callback_banner_change ) o.callback_banner_change($this, no_of_image_shown);
						}
					)
				;
			}
			else {
				var width = $this.width();
				$this
					.find('a:eq(' + count + ')')
					.css('z-index', zIndex)
					.css('width', width+'px')			// fix width to transform nicely.
					.css('margin-left', width+'px')
					.show()
					.animate({
						'margin-left': '0'
						},
						o.speed,
						function(){
							if ( o.callback_banner_change ) o.callback_banner_change($this, no_of_image_shown);
							$this.find('a:eq(' + count + ')').css('width', '100%'); // % width to responsive.
						}
					)
				;
			}
		}
		
		function show_button()
		{
			var buttons = "<div class='jbanner-buttons'>";
			for ( var i=0; i < max_length; i ++ ) {
				buttons = buttons + "<span>" + (i+1) + "</span>";
			}
			buttons += "</div>";
			$this.append(buttons);
			$('.jbanner-buttons')
				.css('position', 'absolute')
				.css('top', '10px')
				.css('right', '10px')
				.css('z-index', 999999)
				;
			$this.find('.jbanner-buttons span')
				.css("display", 'inline-block')
				.css('border', '1px solid #cdcdcd')
				.css('padding', '2px 6px')
				.css('margin', '0 2px')
				.css('border-radius', '2px')
				.css('background-color', 'white')
				.css('opacity', '0.6')
				.css('filter', 'alpha(opacity=60)')
				.css('cursor', 'default')
			;
			$this.find('.jbanner-buttons span').mouseenter(function(){
				var no = $(this).text() - 1;
				if ( no_of_image_shown == no ) return;
				show_banner( no );
			});
		}
		
		if ( o.callback_init ) o.callback_init($(this));
	};
})(jQuery);
